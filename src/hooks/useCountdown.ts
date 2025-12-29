import { useState, useEffect } from 'react';

/**
 * Custom hook that provides a live countdown timer.
 * @param endTimestamp - Unix timestamp (seconds) when the countdown ends
 * @returns Formatted string like "01:23:45" or "ROTATING..." when expired
 */
export function useCountdown(endTimestamp: number): string {
    const [timeLeft, setTimeLeft] = useState<string>(() => calculateTimeLeft(endTimestamp));

    useEffect(() => {
        // Recalculate immediately when endTimestamp changes
        setTimeLeft(calculateTimeLeft(endTimestamp));

        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft(endTimestamp));
        }, 1000);

        return () => clearInterval(interval);
    }, [endTimestamp]);

    return timeLeft;
}

function calculateTimeLeft(endTimestamp: number): string {
    const now = Math.floor(Date.now() / 1000);
    const diff = endTimestamp - now;

    if (diff <= 0) {
        return 'ROTATING...';
    }

    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export default useCountdown;
