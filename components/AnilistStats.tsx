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

    // Helper function to get a dynamic relative time format
function getRelativeTime(unix: EpochTimeStamp, showAgo?: Boolean) {
    const date = new Date();
    const timestamp = date.getTime();
    const seconds = Math.floor(timestamp / 1000);
    const difference = seconds - unix;
    if (difference < 60) {
      return `${difference}s ${showAgo ? " ago" : ""}`;
    } else if (difference < 3600) {
      return `${Math.floor(difference / 60)}m ${showAgo ? " ago" : ""}`;
    } else if (difference < 86400) {
      return `${Math.floor(difference / 3600)}h ${showAgo ? " ago" : ""}`;
    } else if (difference < 2620800) {
      return `${Math.floor(difference / 86400)}d ${showAgo ? " ago" : ""}`;
    } else if (difference < 31449600) {
      return `${Math.floor(difference / 2620800)}mo ${showAgo ? " ago" : ""}`;
    } else {
      return `${Math.floor(difference / 31449600)}y ${showAgo ? " ago" : ""}`;
    }
  }

    return (
        <div className="w-[340px] h-[160px] mx-auto mt-2 p-4 bg-[#11111bc2] text-white rounded-lg shadow-md">
            {error && <p className="text-red-500">{error}</p>}
            {entry ? (
                <div className="pt-4 mb-2">
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
                            <p className="text-sm text-gray-400">Watched {getRelativeTime(entry.updatedAt, true)}</p>
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
