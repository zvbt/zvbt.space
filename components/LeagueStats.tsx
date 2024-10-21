import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Participant {
    puuid: string;
    championId: number;
    kills: number;
    deaths: number;
    assists: number;
    totalDamageDealtToChampions: number;
    pentaKills: number;
    quadraKills: number;
    tripleKills: number;
    win: boolean;
    item0: number;
    item1: number;
    item2: number;
    item3: number;
    item4: number;
    item5: number;
    item6: number;  // Boots item
}


interface MatchDetails {
    info: {
        participants: Participant[];
        gameMode: string;
        gameDuration: number;
        gameCreation: number;
        queueId: number;
    };
}

interface Champion {
    id: string;
    key: string;
    name: string;
}

interface KDA {
    kills: number;
    deaths: number;
    assists: number;
    kda: string;
    championId: number;
    gameMode: string;
    totalDamage: number;
    gameDuration: number;
    pentaKills: number;
    quadraKills: number;
    tripleKills: number;
    gameDate: string;
    queueId: number;
    win: boolean;
    item0: number;
    item1: number;
    item2: number;
    item3: number;
    item4: number;
    item5: number;
    item6: number;  // Boots item
}

const patchVersion = process.env.NEXT_PUBLIC_LOL_PATCH;
const summonerName = process.env.NEXT_PUBLIC_USERNAME;
const summonerTagline = process.env.NEXT_PUBLIC_TAGLINE;
const proxy = process.env.NEXT_PUBLIC_PROXY;


const LeagueStats: React.FC = () => {
    const [puuid, setPuuid] = useState<string | null>(null);
    const [kdaInfo, setKdaInfo] = useState<KDA | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [champions, setChampions] = useState<Record<number, Champion>>({});

    const fetchChampions = async () => {
        try {
            const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/data/en_US/champion.json`);
            if (!response.ok) {
                throw new Error('Failed to fetch champions data');
            }
            const data: { data: Record<string, Champion> } = await response.json();

            const championData: Champion[] = Object.values(data.data).map((champ: Champion) => ({
                id: champ.id,
                key: champ.key,
                name: champ.name,
            }));

            const championMap: Record<number, Champion> = {};
            championData.forEach(champion => {
                championMap[parseInt(champion.key)] = champion;
            });

            setChampions(championMap);
        } catch (err) {
            setError('Error fetching champions: ' + (err instanceof Error ? err.message : 'Unknown error'));
        }
    };

    const fetchSummonerPuuid = async () => {
        try {
            const response = await fetch(
                `${proxy}https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${summonerTagline}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
                {
                    headers: {
                        "Origin": "https://proxy.zvbt.space"
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch summoner data');
            }

            const summonerData = await response.json();
            setPuuid(summonerData.puuid);
        } catch (err) {
            setError('Error fetching PUUID: ' + (err instanceof Error ? err.message : 'Unknown error'));
        }
    };

    const fetchKDA = async () => {
        if (!puuid) {
            setError('API key or PUUID is not set.');
            return;
        }

        try {
            const matchIdResponse = await fetch(
                `${proxy}https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=1&api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
                {
                    headers: {
                        "Origin": "https://proxy.zvbt.space"
                    }
                }
            );

            if (!matchIdResponse.ok) {
                throw new Error(`Failed to fetch match IDs: ${matchIdResponse.statusText}`);
            }

            const matchIds: string[] = await matchIdResponse.json();
            const lastMatchId = matchIds[0];

            const matchDetailsResponse = await fetch(
                `${proxy}https://europe.api.riotgames.com/lol/match/v5/matches/${lastMatchId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
                {
                    headers: {
                        "Origin": "https://proxy.zvbt.space"
                    }
                }
            );

            if (!matchDetailsResponse.ok) {
                throw new Error(`Failed to fetch match details: ${matchDetailsResponse.statusText}`);
            }

            const matchDetails: MatchDetails = await matchDetailsResponse.json();
            const participants = matchDetails.info.participants;
            const yourParticipant = participants.find(participant => participant.puuid === puuid);

            if (yourParticipant) {
                const kills = yourParticipant.kills || 0;
                const deaths = yourParticipant.deaths || 1;
                const assists = yourParticipant.assists || 0;
                const kda = ((kills + assists) / deaths).toFixed(2);
                const gameMode = matchDetails.info.gameMode;
                const queueId = matchDetails.info.queueId; 
                const championId = yourParticipant.championId;
                const totalDamage = yourParticipant.totalDamageDealtToChampions;
                const gameDuration = matchDetails.info.gameDuration;
                const pentaKills = yourParticipant.pentaKills || 0;
                const quadraKills = yourParticipant.quadraKills || 0;
                const tripleKills = yourParticipant.tripleKills || 0;
                const win = yourParticipant.win;

                const gameDate = new Date(matchDetails.info.gameCreation).toLocaleDateString();

                setKdaInfo({
                    kills,
                    deaths,
                    assists,
                    kda,
                    gameMode,
                    championId,
                    totalDamage,
                    gameDuration,
                    pentaKills,
                    quadraKills,
                    tripleKills,
                    gameDate,
                    queueId,
                    win,
                    item0: yourParticipant.item0,
                    item1: yourParticipant.item1,
                    item2: yourParticipant.item2,
                    item3: yourParticipant.item3,
                    item4: yourParticipant.item4,
                    item5: yourParticipant.item5,
                    item6: yourParticipant.item6,
                });
            } else {
                setError('Participant not found!');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError('Error fetching KDA: ' + errorMessage);
        }
    };



    const [items, setItems] = useState<Record<number, { name: string, image: { full: string } }>>({});

    const fetchItems = async () => {
        try {
            const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/data/en_US/item.json`);
            if (!response.ok) {
                throw new Error('Failed to fetch item data');
            }
            const data: { data: Record<string, { name: string, image: { full: string } }> } = await response.json();
            const itemMap: Record<number, { name: string, image: { full: string } }> = {};

            Object.keys(data.data).forEach(key => {
                itemMap[parseInt(key)] = data.data[key];
            });

            setItems(itemMap);
        } catch (err) {
            setError('Error fetching items: ' + (err instanceof Error ? err.message : 'Unknown error'));
        }
    };


    useEffect(() => {
        fetchChampions();
        fetchItems();
        fetchSummonerPuuid();
        if (puuid) {
            fetchKDA(); // Fetch KDA after PUUID is retrieved
        }
    }, [puuid]);

    const getGameModeLabelByQueueId = (queueId: number) => {
        switch (queueId) {
            case 420:
                return "Ranked Solo/Duo";
            case 440:
                return "Ranked Flex";
            case 450:
                return "ARAM";
            case 700:
                return "Clash";
            case 900:
                return "URF";
            case 1020:
                return "One for All";
            default:
                return "Normal Game";
        }
    };

    const formatGameDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className="max-w-lg mx-auto mt-2 p-4 bg-[#11111bc2] text-white rounded-lg shadow-md flex">
            {error && <p className="text-red-500">{error}</p>}
            {kdaInfo ? (
                <>
                <Link href={`https://www.deeplol.gg/summoner/euw/${summonerName}-${summonerTagline}`} target='_blank' className='flex'>
                    <div className="flex-shrink-0 mr-4">
                        <Image
                            src={`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${champions[kdaInfo.championId]?.id}.png`}
                            alt={champions[kdaInfo.championId]?.name}
                            className="w-16 h-16 rounded-md"
                            width={64}
                            height={64}
                            quality={100}
                        />
                        <p className={`text-center text-sm font-bold border rounded-md mt-4 ${kdaInfo.win ? 'text-green-500' : 'text-red-500'}`}>
                            {kdaInfo.win ? 'Win' : 'Lose'}
                        </p> 
                        
                    </div>
                    <div className="flex-grow">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold">{getGameModeLabelByQueueId(kdaInfo.queueId)}</h2>
                            <div className="flex flex-col items-end pl-4">
                                <p className="text-[10px] text-gray-400">Played at {kdaInfo.gameDate}</p>
                                <p className="text-[10px] text-gray-400">Duration {formatGameDuration(kdaInfo.gameDuration)}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 mt-1">
                            <p className="text-xl font-bold">{kdaInfo.kills}</p>
                            <p className="text-xl font-bold">/ {kdaInfo.deaths}</p>
                            <p className="text-xl font-bold">/ {kdaInfo.assists}</p>
                            <p className="text-sm text-gray-400">{`${kdaInfo.kda} KDA`}</p>
                        </div>
                        <div className='flex space-x-1'>
                            {[kdaInfo.item0, kdaInfo.item1, kdaInfo.item2, kdaInfo.item3, kdaInfo.item4, kdaInfo.item5, kdaInfo.item6].map((itemId, index) => (
                                    itemId !== 0 && items[itemId] ? (
                                        <img
                                            key={index}
                                            src={`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/item/${items[itemId].image.full}`}
                                            alt={items[itemId].name}
                                            className="w-5 h-5 rounded-sm"
                                        />
                                    ) : null
                                ))}
                            </div>
                        <div className="mt-2 text-sm text-gray-300">
                            <p>Total Damage: {kdaInfo.totalDamage.toLocaleString()}</p>
                            <div className="relative group">
                                <p className="text-red-500">
                                    {kdaInfo.pentaKills > 0
                                        ? '🔥 Penta Kill'
                                        : kdaInfo.quadraKills > 0
                                        ? 'Quadra Kill'
                                        : kdaInfo.tripleKills > 0
                                        ? 'Triple Kill'
                                        : null}
                                </p>
                                <div className="absolute left-0 -top-8 p-2 w-40 bg-[#11111b3a] backdrop-blur-sm border text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                    {kdaInfo.tripleKills > 0 && <p>{kdaInfo.tripleKills}x Triple Kill</p>}
                                    {kdaInfo.quadraKills > 0 && <p>{kdaInfo.quadraKills}x Quadra Kill</p>}
                                    {kdaInfo.pentaKills > 0 && <p>{kdaInfo.pentaKills}x Penta Kill</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    </Link>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default LeagueStats;
