import React, { forwardRef } from 'react';
import styles from './Button.module.scss';

export interface BaseButtonProps {
    /** Button variant - determines the primary styling */
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'social' | 'audio' | 'navigation';
    /** Button size */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /** Button shape */
    shape?: 'square' | 'rounded' | 'circle' | 'pill';
    /** Whether the button is in a loading state */
    loading?: boolean;
    /** Whether the button is in a prompting/pulse state */
    prompting?: boolean;
    /** Whether the button has full width */
    fullWidth?: boolean;
    /** Left icon */
    leftIcon?: React.ReactNode;
    /** Right icon */
    rightIcon?: React.ReactNode;
    /** Custom className */
    className?: string;
    /** Button children */
    children: React.ReactNode;
}

export interface ButtonProps extends BaseButtonProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> {
    /** Link href for anchor-style buttons */
    href?: string;
    /** Link target */
    target?: string;
    /** Link rel */
    rel?: string;
}

export interface AnchorButtonProps extends BaseButtonProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> {
    /** Link href for anchor-style buttons */
    href: string;
    /** Link target */
    target?: string;
    /** Link rel */
    rel?: string;
}

export const Button = forwardRef<
    HTMLButtonElement,
    ButtonProps
>(({
    variant = 'primary',
    size = 'md',
    shape = 'rounded',
    loading = false,
    prompting = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    className = '',
    children,
    href,
    target,
    rel,
    disabled,
    ...props
}, ref) => {
    // Combine all class names
    const buttonClasses = [
        styles.button,
        styles[variant],
        styles[size],
        styles[shape],
        fullWidth && styles.fullWidth,
        loading && styles.loading,
        prompting && styles.prompting,
        disabled && styles.disabled,
        className
    ].filter(Boolean).join(' ');

    // Common props for both button and anchor
    const commonProps = {
        className: buttonClasses,
        'aria-disabled': disabled || loading,
    };

    // If href is provided, render as anchor tag
    if (href) {
        const anchorProps = props as Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps>;
        return (
            <a
                ref={ref as React.Ref<HTMLAnchorElement>}
                href={href}
                target={target}
                rel={rel}
                {...commonProps}
                {...anchorProps}
            >
                {leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
                <span className={styles.content}>{children}</span>
                {rightIcon && <span className={styles.iconRight}>{rightIcon}</span>}
            </a>
        );
    }

    // Otherwise render as button
    const buttonProps = props as Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps>;
    return (
        <button
            ref={ref}
            disabled={disabled || loading}
            {...commonProps}
            {...buttonProps}
        >
            {leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
            <span className={styles.content}>
                {loading && <span className={styles.spinner}></span>}
                {children}
            </span>
            {rightIcon && <span className={styles.iconRight}>{rightIcon}</span>}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
