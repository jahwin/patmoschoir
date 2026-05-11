import { useEffect, useState } from 'react';
import styles from "./CountdownTimer.module.scss";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface CountdownTimerProps {
    eventDate: Date;
    title?: string;
    className?: string;
}

export default function CountdownTimer({
    eventDate,
    title = "Event Starts In",
    className = ""
}: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const eventTime = eventDate.getTime();
            const difference = eventTime - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        // Calculate immediately
        calculateTimeLeft();

        // Update every second
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [eventDate]);

    return (
        <div className={`${styles.countdownContainer} ${className}`}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.countdownGrid}>
                <div className={styles.timeUnit}>
                    <div className={styles.timeUnitBox}>
                        <div className={styles.timeValue}>{timeLeft.days}</div>
                        <div className={styles.timeLabel}>Days</div>
                    </div>
                </div>
                <div className={styles.timeUnit}>
                    <div className={styles.timeUnitBox}>
                        <div className={styles.timeValue}>{timeLeft.hours}</div>
                        <div className={styles.timeLabel}>Hours</div>
                    </div>
                </div>
                <div className={styles.timeUnit}>
                    <div className={styles.timeUnitBox}>
                        <div className={styles.timeValue}>{timeLeft.minutes}</div>
                        <div className={styles.timeLabel}>Min</div>
                    </div>
                </div>
                <div className={styles.timeUnit}>
                    <div className={styles.timeUnitBox}>
                        <div className={styles.timeValue}>{timeLeft.seconds}</div>
                        <div className={styles.timeLabel}>Sec</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
