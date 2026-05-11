import { Calendar, Clock, MapPin, PhoneCall } from "lucide-react";
import styles from "./EventDetails.module.scss";

interface EventDetail {
    name: string;
    value: string;
    icon: React.ReactNode;
}

interface EventDetailsProps {
    details?: EventDetail[];
    className?: string;
}

const DEFAULT_DETAILS: EventDetail[] = [
    {
        name: "Date",
        value: "Sunday, October 5th",
        icon: <Calendar className="w-6 h-6 text-theme-clr mt-1 flex-shrink-0" />
    },
    {
        name: "Time",
        value: "5:00 PM - 10:00 PM",
        icon: <Clock className="w-6 h-6 text-theme-clr mt-1 flex-shrink-0" />
    },
    {
        name: "Call for info",
        value: "+250 789 283 415",
        icon: <PhoneCall className="w-6 h-6 text-theme-clr mt-1 flex-shrink-0" />
    },
    {
        name: "Venue",
        value: "Intare Arena",
        icon: <MapPin className="w-6 h-6 text-theme-clr mt-1 flex-shrink-0" />
    },
];

export default function EventDetails({
    details = DEFAULT_DETAILS,
    className = ""
}: EventDetailsProps) {
    return (
        <div className={`${styles.eventDetails} ${className}`}>
            {details.map((detail, index) => (
                <div className={styles.detailItem} key={index}>
                    <div className={styles.detailHeader}>
                        <div className={styles.detailIcon}>
                            {detail.icon}
                        </div>
                        <h3 className={styles.detailName}>
                            {detail.name}
                        </h3>
                    </div>
                    <p className={styles.detailValue}>
                        {detail.value}
                    </p>
                </div>
            ))}
        </div>
    );
}
