import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const mdlUsername = process.env.NEXT_PUBLIC_MDL_USERNAME;
const proxy = process.env.NEXT_PUBLIC_PROXY;

interface Drama {
    title: string;
    episode: string;
    lastUpdateTime: string;
    poster: string;
    dramaUrl: string;
}

const MDLStats: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [dramaList, setDramaList] = useState<Drama[] | null>(null);

    const fetchDramaData = async () => {
        try {
            const response = await fetch(`${proxy}https://mdl.zvbt.space/data?username=${mdlUsername}`);
            if (!response.ok) {
                throw new Error('Failed to fetch drama data');
            }
            const data: Drama[] = await response.json();
            setDramaList(data);
        } catch (err) {
            setError('Error fetching drama data: ' + (err instanceof Error ? err.message : 'Unknown error'));
        }
    };

    useEffect(() => {
        fetchDramaData();
    }, []);

    return (
        <div className="max-w-lg mx-auto mt-2 p-4 bg-[#11111bc2] text-white rounded-lg shadow-md">
            {error && <p className="text-red-500">{error}</p>}
            {dramaList ? (
                <div>
                    {dramaList.map((drama, index) => (
                        <div key={index} className="pt-1.5 mb-2">
                            <Link href={drama.dramaUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4">
                                <Image src={drama.poster} alt={drama.title} className="w-16 h-24 object-center rounded-md" width={64} height={96} quality={100}/>
                                <div>
                                    <h3 className="text-md font-semibold">{drama.title}</h3>
                                    <p className="text-sm text-gray-400">{drama.episode}</p>
                                    <p className="text-sm text-gray-400">Watched {drama.lastUpdateTime}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MDLStats;
