'use client'
import Image from "next/image";
import LeagueStats from '@/components/LeagueStats';
import MDLStats from "@/components/MDLStats";
import AnilistStats from "@/components/AnilistStats";
import WakaTimeStats from "@/components/WakatimeStats";

export default function Home() {
    return (
        <main>
            <Image src={'https://r2.e-z.host/7ed0180f-b228-49a7-be1e-0183c1938777/fhaewi1i.png'} width={1920} height={1080} className='fixed object-cover w-full h-full blur-sm z-0' draggable={false} alt='bg' quality={100}/>

            <div className="flex absolute space-x-2 m-4">
                <div>
                    <p className='max-w-lg p-2 bg-[#11111bc2] text-white rounded-lg shadow-md flex'>MyDramalist</p>
                    <MDLStats />
                </div>
                <div>
                    <p className='max-w-lg p-2 bg-[#11111bc2] text-white rounded-lg shadow-md flex'>Anilist</p>
                    <AnilistStats />
                </div>

                <div>
                    <p className='max-w-lg p-2 bg-[#11111bc2] text-white rounded-lg shadow-md flex'>League Of Legends</p>
                    <LeagueStats />
                </div>
                <div>
                    <p className='max-w-lg p-2 bg-[#11111bc2] text-white rounded-lg shadow-md flex'>Wakatime</p>
                    <WakaTimeStats />
                </div>
            </div>
        </main>
    );
}
