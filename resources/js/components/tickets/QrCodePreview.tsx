import styles from "./QrCodePreview.module.scss";

interface QrCodePreviewProps {
    value: string;
    size?: number;
    className?: string;
}

export default function QrCodePreview({ value, size = 160, className = "" }: QrCodePreviewProps) {
    if (!value) {
        return <div className={`${styles.widget} ${styles.placeholder} ${className}`} aria-hidden />;
    }

    const src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}`;

    return (
        <div className={`${styles.widget} ${className}`}>
            <img src={src} alt="" draggable={false} width={size} height={size} />
        </div>
    );
}
