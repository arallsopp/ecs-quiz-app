import { useEffect, useState } from "react";

function Countdown(initialSeconds, onComplete ) {
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        if (seconds <= 0) return;

        const interval = setInterval(() => {
            setSeconds(prev => {
                if (prev <=1){
                    clearInterval(interval);
                    onComplete();
                    return 0
                }else{
                    return prev - 1;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds,onComplete]);

    return <div>{seconds}</div>;
}

export default Countdown;