# syntax=docker/dockerfile:1

# -----------------------------------------------------------------------------
# Stage 1: Frontend Build (Vite)
# -----------------------------------------------------------------------------
FROM node:20-alpine AS frontend

WORKDIR /app

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

RUN corepack enable && corepack prepare pnpm@9 --activate

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

COPY vite.config.ts tsconfig.json ./
COPY resources ./resources
COPY public ./public

RUN pnpm run build

# -----------------------------------------------------------------------------
# Stage 2: PHP + Apache
# -----------------------------------------------------------------------------
FROM php:8.3-apache-bookworm

ENV COMPOSER_ALLOW_SUPERUSER=1 \
    COMPOSER_NO_INTERACTION=1 \
    APACHE_DOCUMENT_ROOT=/var/www/html/public \
    LOG_CHANNEL=stderr \
    LOG_STACK=stderr

WORKDIR /var/www/html

# -----------------------------------------------------------------------------
# Install system packages + PHP extensions
# -----------------------------------------------------------------------------
RUN apt-get update && apt-get install -y --no-install-recommends \
    libicu-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libzip-dev \
    libonig-dev \
    unzip \
    git \
    curl \
    wget \
    zip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j"$(nproc)" \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip \
    intl \
    opcache \
    && a2enmod rewrite headers \
    && sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/*.conf \
    /etc/apache2/apache2.conf \
    && echo "ServerName localhost" >> /etc/apache2/apache2.conf \
    && rm -rf /var/lib/apt/lists/*

# -----------------------------------------------------------------------------
# Install Composer
# -----------------------------------------------------------------------------
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# -----------------------------------------------------------------------------
# Copy application
# -----------------------------------------------------------------------------
COPY . .

# -----------------------------------------------------------------------------
# Install PHP dependencies
# -----------------------------------------------------------------------------
RUN --mount=type=cache,id=composer-cache,target=/root/.composer/cache \
    composer install \
    --no-dev \
    --prefer-dist \
    --optimize-autoloader \
    --no-interaction

# -----------------------------------------------------------------------------
# Copy frontend assets from frontend stage
# -----------------------------------------------------------------------------
COPY --from=frontend /app/public/build ./public/build

# -----------------------------------------------------------------------------
# Laravel setup
# -----------------------------------------------------------------------------
RUN mkdir -p \
    storage/app/public \
    storage/framework/cache/data \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    bootstrap/cache \
    && php artisan optimize:clear || true \
    && php artisan storage:link || true \
    && php artisan package:discover --ansi || true \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R ug+rwX storage bootstrap/cache

COPY docker/entrypoint.sh docker/artisan.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh /usr/local/bin/artisan.sh

# -----------------------------------------------------------------------------
# Expose port
# -----------------------------------------------------------------------------
EXPOSE 80

# -----------------------------------------------------------------------------
# Start Apache
# -----------------------------------------------------------------------------
ENTRYPOINT ["entrypoint.sh"]
CMD ["apache2-foreground"]