import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const proxy = process.env.NEXT_PUBLIC_PROXY;

interface GameData {
    name: string;
    formattedTime: string;
    logo: string;
}

// Mapping of process names to actual game names and logos
const gameDataMap: Record<string, { name: string; logo: string }> = {
    "genshinimpact.exe": { name: "Genshin Impact", logo: "https://r2.e-z.host/7ed0180f-b228-49a7-be1e-0183c1938777/md87g63b.png" },
    "osu!.exe": { name: "osu!", logo: "https://r2.e-z.host/7ed0180f-b228-49a7-be1e-0183c1938777/p73ca2gz.png" },
    "client-win64-shipping.exe": { name: "Wuthering Waves", logo: "https://r2.e-z.host/7ed0180f-b228-49a7-be1e-0183c1938777/m5xb9s54.png" },
    "league of legends.exe": { name: "League of Legends", logo: "https://r2.e-z.host/7ed0180f-b228-49a7-be1e-0183c1938777/2hwj3fjq.png" },
    "zenlesszonezero.exe": { name: "Zenless Zone Zero", logo: "https://r2.e-z.host/7ed0180f-b228-49a7-be1e-0183c1938777/6ildclww.png" },
    "valorant-win64-shipping.exe": { name: "Valorant", logo: "https://r2.e-z.host/7ed0180f-b228-49a7-be1e-0183c1938777/5ncyjm2p.png" }
};

const Wasted: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [games, setGames] = useState<GameData[] | null>(null);

    const fetchWastedData = async () => {
        try {
            const response = await fetch(`${proxy}https://archive.zvbt.cc/stats/appRuntime.json`);
            if (!response.ok) {
                throw new Error('Failed to fetch game data');
            }
            const data = await response.json();

            // Convert object to an array and map game names/logos
            const gameArray: GameData[] = Object.entries(data)
                .map(([key, value]: [string, any]) => {
                    const gameInfo = gameDataMap[key.toLowerCase()] || { name: key.replace('.exe', ''), logo: "https://via.placeholder.com/64" };
                    return {
                        name: gameInfo.name,
                        formattedTime: value.formattedTime,
                        logo: gameInfo.logo
                    };
                });

            setGames(gameArray);
        } catch (err) {
            setError('Error fetching data: ' + (err instanceof Error ? err.message : 'Unknown error'));
        }
    };

    useEffect(() => {
        fetchWastedData();
    }, []);

    return (
        <div className="w-[340px] mx-auto mt-2 p-4 bg-[#11111bc2] text-white rounded-lg shadow-md">
            {error && <p className="text-red-500">{error}</p>}
            {games ? (
                <div>
                    {games.map((game, index) => (
                        <div key={index} className="flex items-center pt-4 mb-2">
                            <Image
                                src={game.logo}
                                alt={game.name}
                                className="w-16 h-16 object-contain rounded-md"
                                width={64}
                                height={64}
                                quality={100}
                            />
                            <div className="ml-4">
                                <h3 className="text-md font-semibold">{game.name}</h3>
                                <p className="text-sm text-gray-400">{game.formattedTime}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Wasted;
