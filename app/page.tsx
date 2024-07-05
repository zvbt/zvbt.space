import Image from "next/image";
import DiscordCard from "@/components/DiscordCard";
import { lanyard } from "@/lib/lanyard";
import ProgressBar from "@/components/progressbar";
import SpotifyCard from "@/components/SpotifyFooter";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import unsplash from "@/lib/unsplash";
import Link from "next/link";
const crypto = require('crypto');

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export default async function Home() {
  const {discord_user: user, discord_status: status , activities: bio, listening_to_spotify, spotify} = await lanyard();
  let start = 0;
  let end = 0;
  if (listening_to_spotify == true){
    start = spotify.timestamps.start;
    end = spotify.timestamps.end;
  }

  const unsplashData = await unsplash();
  const randomIndex = crypto.randomInt(unsplashData.results.length);
  const result = unsplashData.results[randomIndex];
  const imgSource = result.links.html;
  const author = result.user.name;
  const randomImg = result.urls.regular;

    return (
        <main>
            <Image src={randomImg} width={1920} height={1080} className='absolute object-cover w-full h-full blur-sm z-1' draggable={false} alt='bg' quality={100}/>
            <Link href={imgSource} target='_blank' className="z-50 absolute mx-2 opacity-50 text-sm">Background by {author}</Link>
            <div className="flex justify-center">
                <DiscordCard
                    displayName={`${user.display_name}`}
                    status={`${status}`}
                    link={`https://discord.com/users/${user.id}`}
                    Image={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                    flag={bio[0] && bio[0].state ? `${bio[0].emoji?.name || ''} ${bio[0].state}`.trim() : bio[0]?.emoji?.name || bio[0]?.state || ' '}
                    game={bio[1]?.name && bio[1].name !== 'Spotify' ? `Playing ${bio[1].name}` : ' '}
                    spotify={listening_to_spotify !== false ? (
                      <div>
                        <p className="text-[#a6d189]">Listening to Spotify</p>
                        <p>{spotify.song} by {spotify.artist}</p>
                      </div>
                    ) : '   '}
                />
            </div>
            <div className="absolute bottom-0 left-0 right-0">
            {listening_to_spotify !== false ? <ProgressBar startEpochTime={start} endEpochTime={end}/> : ' '}
            </div>
            <div className="fixed bottom-0 left-0">
              <SpotifyCard 
                link={listening_to_spotify !== false ? `https://open.spotify.com/track/${spotify.track_id}` : '#'}
                Image={listening_to_spotify !== false ? spotify.album_art_url : ' '}
                statusColor={cn(listening_to_spotify === false && "text-white", listening_to_spotify === true && "text-white font-bold")}
                status={listening_to_spotify !== false ? 'Listening to Spotify' : " "}
                title={listening_to_spotify !== false ? spotify.song : '   '}
                artist={listening_to_spotify !== false ? `by ${spotify.artist}` : '   '}
              />
            </div>
            {listening_to_spotify !== false ? ' ' : (<div className='fixed bottom-0 left-0 flex justify-center items-center w-[100%] h-[64px] backdrop-blur-sm bg-[#171717b2]'>I'm not listening to Spotify at the moment.</div>)}
        </main>
    );
}
