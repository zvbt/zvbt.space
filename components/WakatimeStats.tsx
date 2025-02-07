import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const languageColors: { [key: string]: string } = {
    JavaScript: "text-yellow-400",
    TypeScript: "text-blue-400",
    Python: "text-green-400",
    C: "text-blue-500",
    "C++": "text-purple-400",
    "C#": "text-violet-500",
    Java: "text-orange-500",
    PHP: "text-indigo-400",
    Ruby: "text-red-400",
    Go: "text-teal-400",
    Rust: "text-orange-600",
    Kotlin: "text-pink-400",
    Swift: "text-red-500",
    Dart: "text-blue-300",
    "Objective-C": "text-gray-500",
    Shell: "text-green-300",
    Lua: "text-purple-500",
    Perl: "text-pink-300",
    R: "text-blue-700",
    Scala: "text-red-600",
    Haskell: "text-indigo-500",
};

const WakaTimeStats: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [stats, setStats] = useState<any | null>(null);
    const [topLanguage, setTopLanguage] = useState<string | null>(null);
    const apiKey = process.env.NEXT_PUBLIC_WAKATIME_API_KEY;

    const fetchWakaTimeData = async () => {
        try {
            const statsResponse = await fetch(
                `https://proxy.zvbt.cc/https://wakatime.com/api/v1/users/current/all_time_since_today?api_key=${apiKey}`
            );

            if (!statsResponse.ok) {
                throw new Error("Failed to fetch WakaTime stats");
            }

            const statsData = await statsResponse.json();
            setStats(statsData.data);

            const langResponse = await fetch(
                `https://proxy.zvbt.cc/https://wakatime.com/api/v1/users/current/stats/all_time?api_key=${apiKey}`
            );

            if (!langResponse.ok) {
                throw new Error("Failed to fetch top language");
            }

            const langData = await langResponse.json();
            const topLang = langData.data.languages?.[0]?.name || "Unknown";
            setTopLanguage(topLang);

        } catch (err) {
            setError("Error fetching WakaTime data: " + (err instanceof Error ? err.message : "Unknown error"));
        }
    };

    useEffect(() => {
        fetchWakaTimeData();
    }, []);

    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(date);
    };

    return (
        <div className="w-[340px] h-[160px] mx-auto mt-2 p-4 bg-[#11111bc2] text-white rounded-lg shadow-md">
            {error && <p className="text-red-500">{error}</p>}
            {stats ? (
                <div className="pt-4 mb-2 flex items-center space-x-4">
                    <Image
                        src="https://r2.e-z.host/7ed0180f-b228-49a7-be1e-0183c1938777/2j2hzy07.png"
                        alt="WakaTime Logo"
                        className="w-16 h-16 object-center rounded-md"
                        width={64}
                        height={64}
                        quality={100}
                    />
                    <div>
                        <h3 className="text-md font-semibold">Coding Time</h3>
                        <p className="text-sm text-gray-400">{stats.text} since 2025-02-01</p>
                        <p className="text-sm text-gray-400">Last session: {formatDate(stats.range.end)}</p>
                        <p className="text-sm text-gray-400">
                            Top Language:{" "}
                            <span className={`font-semibold ${languageColors[topLanguage || ""] || "text-gray-300"}`}>
                                {topLanguage}
                            </span>
                        </p>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default WakaTimeStats;
