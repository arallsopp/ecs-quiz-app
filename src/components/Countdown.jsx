import { useEffect, useState } from "react";

function Countdown({ initialSeconds, onComplete }) {  // Destructure props!
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        if (initialSeconds <= 0) return;

        const interval = setInterval(() => {
            setSeconds(prev => {
                if (prev <= 1) {
                    onComplete();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [initialSeconds, onComplete]);  // Only recreate if these change

    // Format as MM:SS
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const formatted = `${minutes}:${secs.toString().padStart(2, '0')}`;

    return <div className="timer">Time: {formatted}</div>;
}

export default Countdown;