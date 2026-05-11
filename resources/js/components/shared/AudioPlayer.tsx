import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
// import sampleAudio from "~/assets/music/sample.mp3";
import Button from "./Button";
import styles from "./AudioPlayer.module.scss";

interface AudioPlayerProps {
    className?: string;
}

export default function AudioPlayer({ className = "" }: AudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const playButtonRef = useRef<HTMLButtonElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [showPlayPrompt, setShowPlayPrompt] = useState(false);
    const [hasUserInteracted, setHasUserInteracted] = useState(false);

    // Auto-play audio when component mounts
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            // Set volume to a reasonable level (50%)
            audio.volume = 0.5;

            // Add event listeners to track audio state
            const handlePlay = () => {
                setIsPlaying(true);
            };

            const handlePause = () => {
                setIsPlaying(false);
            };

            const handleEnded = () => {
                // Restart the audio to create a loop effect
                audio.currentTime = 0;
                audio.play().then(() => {
                }).catch((error) => {
                    setIsPlaying(false);
                });
            };

            audio.addEventListener('play', handlePlay);
            audio.addEventListener('pause', handlePause);
            audio.addEventListener('ended', handleEnded);

            // Attempt to play audio immediately
            const attemptAutoPlay = async () => {
                try {
                    await audio.play();
                } catch (error) {
                    setShowPlayPrompt(true);
                }
            };

            // Try immediately
            attemptAutoPlay();

            // Also try after a short delay in case the audio needs time to load
            const timeoutId = setTimeout(() => {
                attemptAutoPlay();
            }, 2000);

            // Show prompt after 3 seconds if still not playing
            const promptTimeoutId = setTimeout(() => {
                setShowPlayPrompt(true);
            }, 3000);

            // Auto-click the play button after 4 seconds if still not playing
            const autoClickTimeoutId = setTimeout(() => {
                if (playButtonRef.current) {
                    playButtonRef.current.click();
                }
            }, 4000);

            // Cleanup
            return () => {
                audio.removeEventListener('play', handlePlay);
                audio.removeEventListener('pause', handlePause);
                audio.removeEventListener('ended', handleEnded);
                clearTimeout(timeoutId);
                clearTimeout(promptTimeoutId);
                clearTimeout(autoClickTimeoutId);
            };
        }
    }, []);

    // Check if the user has ever interacted with the page
    useEffect(() => {
        const checkInteracted = localStorage.getItem('hasUserEverInteracted');
        if (checkInteracted === 'true') {
            setHasUserInteracted(true);
        }
    }, []);

    // Try to enable auto-play on first user interaction
    useEffect(() => {
        const handleFirstInteraction = async () => {
            setHasUserInteracted(true);
            localStorage.setItem('hasUserEverInteracted', 'true');
            const audio = audioRef.current;
            if (audio) {
                try {
                    await audio.play();
                } catch (error) {
                }
            }
        };

        // Listen for any user interaction
        document.addEventListener('click', handleFirstInteraction, { once: true });
        document.addEventListener('touchstart', handleFirstInteraction, { once: true });
        document.addEventListener('keydown', handleFirstInteraction, { once: true });

        return () => {
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
            document.removeEventListener('keydown', handleFirstInteraction);
        };
    }, []);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (audio) {
            if (isPlaying) {
                audio.pause();
                setIsPlaying(false);
            } else {
                audio.play().then(() => {
                    setShowPlayPrompt(false);
                    setIsPlaying(true);
                }).catch((error) => {
                });
            }
        } else {
        }
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        if (audio) {
            audio.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <>
            {/* Audio Element */}
            {/* <audio
                ref={audioRef}
                src={sampleAudio}
                loop={true}
                preload="auto"
                className="hidden"
                onLoadedData={() => {}}
                onError={(e) => {}}
                onCanPlay={() => {}}
            /> */}

            {/* Audio Controls */}
            <div className={`${styles.audioControls} ${className}`}>
                <Button
                    ref={playButtonRef}
                    onClick={togglePlayPause}
                    variant="audio"
                    size="md"
                    shape="circle"
                    prompting={showPlayPrompt}
                    title={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? (
                        <Pause />
                    ) : (
                        <Play />
                    )}
                </Button>
                <Button
                    onClick={toggleMute}
                    variant="audio"
                    size="md"
                    shape="circle"
                    title={isMuted ? "Unmute" : "Mute"}
                >
                    {isMuted ? (
                        <VolumeX />
                    ) : (
                        <Volume2 />
                    )}
                </Button>
            </div>

            {/* Play Prompt */}
            {showPlayPrompt && !hasUserInteracted && (
                <div className={styles.playPrompt}>
                    <p className={styles.promptText}>
                        Tap to play music
                    </p>
                </div>
            )}
        </>
    );
}
