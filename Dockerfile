# syntax=docker/dockerfile:1

# -----------------------------------------------------------------------------
# Stage 1: Frontend build (Vite)
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
        APACHE_DOCUMENT_ROOT=/var/www/html/public
    
    WORKDIR /var/www/html
    
    # -----------------------------------------------------------------------------
    # Install system dependencies
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
        && rm -rf /var/lib/apt/lists/*
    
    # -----------------------------------------------------------------------------
    # Install Composer
    # -----------------------------------------------------------------------------
    COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
    
    # -----------------------------------------------------------------------------
    # Copy entire application FIRST
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
    # Copy frontend assets
    # -----------------------------------------------------------------------------
    COPY --from=frontend /app/public/build ./public/build
    
    # -----------------------------------------------------------------------------
    # Laravel permissions
    # -----------------------------------------------------------------------------
    RUN mkdir -p \
        storage/framework/cache \
        storage/framework/sessions \
        storage/framework/views \
        storage/logs \
        bootstrap/cache \
        && chown -R www-data:www-data storage bootstrap/cache \
        && chmod -R 775 storage bootstrap/cache
    
    # -----------------------------------------------------------------------------
    # Laravel optimization
    # -----------------------------------------------------------------------------
    RUN php artisan config:clear || true \
        && php artisan route:clear || true \
        && php artisan view:clear || true \
        && php artisan cache:clear || true \
        && php artisan package:discover --ansi || true
    
    # -----------------------------------------------------------------------------
    # Healthcheck
    # -----------------------------------------------------------------------------
    HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
        CMD curl -f http://localhost/health || exit 1
    
    # -----------------------------------------------------------------------------
    # Expose port
    # -----------------------------------------------------------------------------
    EXPOSE 80
    
    # -----------------------------------------------------------------------------
    # Start Apache
    # -----------------------------------------------------------------------------
    CMD ["apache2-foreground"]