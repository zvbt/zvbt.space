import React, { useEffect, useState } from 'react';

interface PlayerStats {
    puuid: string;
    kills: number;
    deaths: number;
    assists: number;
    score: number;
    character: string;
    team: string;
}

interface MatchDetails {
    players: {
        all_players: PlayerStats[];
    };
    metadata: {
        game_start: number;
        game_length: number;
        mode: string;
        map: string;
    };
}

const puuid = process.env.NEXT_PUBLIC_VALORANT_PUUID;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const ValorantStats: React.FC = () => {
    const [playerStats, setPlayerStats] = useState<PlayerStats | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchValorantStats = async () => {
        if (!puuid || !apiKey) {
            setError('API key or PUUID is not set.');
            return;
        }

        try {
            // Fetch match IDs
            const matchIdResponse = await fetch(
                `https://proxy.zvbt.space/https://europe.api.riotgames.com/val/matches/by-puuid/${puuid}/ids?start=0&count=1`,
                {
                    headers: {
                        "X-Riot-Token": "RGAPI-d06a6b4d-9f3a-4390-aa30-6c9e93d0e52c",
                        "Origin": "https://dev2.zvbt.space"
                    }
                }
            );

            if (!matchIdResponse.ok) {
                throw new Error(`Failed to fetch match IDs: ${matchIdResponse.statusText}`);
            }

            const matchIds: string[] = await matchIdResponse.json();
            const lastMatchId = matchIds[0];

            // Fetch match details
            const matchDetailsResponse = await fetch(
                `https://proxy.zvbt.space/https://europe.api.riotgames.com/val/matches/${lastMatchId}`,
                {
                    headers: {
                        "X-Riot-Token": "RGAPI-d06a6b4d-9f3a-4390-aa30-6c9e93d0e52c",
                        "Origin": "https://dev2.zvbt.space"
                    }
                }
            );

            if (!matchDetailsResponse.ok) {
                throw new Error(`Failed to fetch match details: ${matchDetailsResponse.statusText}`);
            }

            const matchDetails: MatchDetails = await matchDetailsResponse.json();
            const yourPlayer = matchDetails.players.all_players.find(player => player.puuid === puuid);

            if (yourPlayer) {
                setPlayerStats(yourPlayer);
            } else {
                setError('Player not found!');
            }
        } catch (err) {
            setError('Error fetching stats: ' + (err instanceof Error ? err.message : 'Unknown error'));
        }
    };

    useEffect(() => {
        fetchValorantStats();
    }, []);

    return (
        <div className="max-w-lg mx-auto mt-2 p-4 bg-[#11111bc2] text-white rounded-lg shadow-md">
            {error && <p className="text-red-500">{error}</p>}
            
        </div>
    );
};

export default ValorantStats;
