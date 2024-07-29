import { useEffect, useState } from "react";

export default function Clock() {
    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = (hours % 12 || 12).toString().padStart(2, '0');

    return (
        <div className="fixed top-4 left-4 border bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-gray-300 px-4 py-2 rounded-full shadow-sm z-20">
            {displayHours}:{minutes}:{seconds} {ampm}
        </div>
    );
}
