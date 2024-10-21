import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { recentActivity } from '@/lib/anilist';
import { Entry } from '@/types/anilist';

const AnilistStats: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [entry, setEntry] = useState<Entry | null>(null);

    const fetchAniListData = async () => {
        try {
            const anidata: Entry | null = await recentActivity("ANIME");
            if (!anidata) {
                throw new Error('Failed to fetch AniList data');
            }
            setEntry(anidata);
        } catch (err) {
            setError('Error fetching AniList data: ' + (err instanceof Error ? err.message : 'Unknown error'));
        }
    };

    useEffect(() => {
        fetchAniListData();
    }, []);

    // Helper function to get the relative time in days
    const getRelativeTime = (timestamp: number) => {
        const now = new Date();
        const updatedAtDate = new Date(timestamp * 1000); // Convert seconds to milliseconds
        const differenceInDays = Math.floor((now.getTime() - updatedAtDate.getTime()) / (1000 * 60 * 60 * 24));

        if (differenceInDays === 0) {
            return 'Today';
        } else if (differenceInDays === 1) {
            return '1 day ago';
        } else {
            return `${differenceInDays} days ago`;
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-2 p-4 bg-[#11111bc2] text-white rounded-lg shadow-md">
            {error && <p className="text-red-500">{error}</p>}
            {entry ? (
                <div className="pt-1.5 mb-2">
                    <Link href={entry.media.siteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4">
                        <Image
                            src={entry.media.coverImage.extraLarge}
                            alt={entry.media.title.userPreferred}
                            className="w-16 h-24 object-center rounded-md"
                            width={64}
                            height={96}
                            quality={100}
                        />
                        <div>
                            <h3 className="text-md font-semibold">{entry.media.title.userPreferred}</h3>
                            <p className="text-sm text-gray-400">Episodes: {entry.progress}</p>
                            <p className="text-sm text-gray-400">Watched {getRelativeTime(entry.updatedAt)}</p>
                        </div>
                    </Link>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AnilistStats;
