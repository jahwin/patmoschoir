import styles from "./ContactInfo.module.scss";

interface ContactInfoProps {
    email?: string;
    className?: string;
    textClassName?: string;
}

export default function ContactInfo({
    email = "info@icyambu.com",
    className = "",
    textClassName = ""
}: ContactInfoProps) {
    return (
        <div className={`${styles.contactInfo} ${className}`}>
            <p className={`${styles.contactText} ${textClassName}`}>
                Questions? Contact us at{" "}
                <a
                    href={`mailto:${email}`}
                    className={styles.emailLink}
                >
                    {email}
                </a>
            </p>
        </div>
    );
}
