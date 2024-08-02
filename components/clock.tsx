// components/Clock.tsx
import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return () => clearInterval(timerID);
    }, []);

    const tick = () => {
        setTime(new Date());
    };

    const formatTime = (date: Date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return { hours, minutes, seconds };
    };

    const { hours, minutes, seconds } = formatTime(time);

    return (
        <div className="fixed text-6xl z-50 right-5 top-5 font-NanumGothic font-bold">
            <span className="fixed text-3xl mt-6">{seconds}</span>
            <span className='ml-9'>{hours}:{minutes}</span>
        </div>
    );
};

export default Clock;
