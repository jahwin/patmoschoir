// import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { Twitter } from "lucide-react";
import Button from "./Button";
import styles from "./SocialLinks.module.scss";

interface SocialLink {
    name: string;
    link: string;
    icon: React.ReactNode;
}

interface SocialLinksProps {
    socials?: SocialLink[];
    className?: string;
}

const DEFAULT_SOCIALS: SocialLink[] = [
    {
        name: "Facebook",
        link: "https://www.facebook.com/imbonyi/",
        icon: ''
    },
    {
        name: "Instagram",
        link: "https://www.instagram.com/israelmbonyi/",
        icon: ''
    },
    {
        name: "Twitter",
        link: "https://x.com/IsraeMbonyi",
        icon: ''
    },
    {
        name: "TikTok",
        link: "https://www.tiktok.com/@israelmbonyi",
        icon: ''
    },
    {
        name: "Youtube",
        link: "https://www.youtube.com/@Mbonyi",
        icon: ''
    },
];

export default function SocialLinks({
    socials = DEFAULT_SOCIALS,
    className = ""
}: SocialLinksProps) {
    return (
        <div className={`${styles.socialLinks} ${className}`}>
            {socials.map((social, index) => (
                <Button
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="social"
                    size="sm"
                    shape="circle"
                    className={styles.socialLink}
                >
                    {social.icon}
                </Button>
            ))}
        </div>
    );
}
