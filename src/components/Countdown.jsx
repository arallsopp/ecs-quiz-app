import { useEffect, useState } from "react";

function Countdown({ initialSeconds, onComplete }) {  // Destructure props!
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        if (seconds <= 0) {
            onComplete();
            return;
        }

        const interval = setInterval(() => {
            setSeconds(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds, onComplete]);  // This is OK - will recreate interval each second

    // Format as MM:SS
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const formatted = `${minutes}:${secs.toString().padStart(2, '0')}`;

    return <div className="timer">Time: {formatted}</div>;
}

export default Countdown;