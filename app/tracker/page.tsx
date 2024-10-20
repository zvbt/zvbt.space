'use client'
import { useEffect, useState, FormEvent, useRef } from 'react';
import Image from "next/image";
import LeagueStats from '@/components/LeagueStats';
import ValorantStats from '@/components/ValStats';


export default function Home() {
    return (
        <main>
            <Image src={'https://r2.e-z.host/7ed0180f-b228-49a7-be1e-0183c1938777/a8hokk7w.png'} width={1920} height={1080} className='fixed object-cover w-full h-full blur-sm z-0' draggable={false} alt='bg' quality={100}/>

            <div className="flex absolute space-x-2 m-4">
                <div>
                    <p className='max-w-lg p-2 bg-[#11111bc2] text-white rounded-lg shadow-md flex'>League Of Legends</p>
                    <LeagueStats />
                </div>
                <div>
                    <p className='max-w-lg p-2 bg-[#11111bc2] text-white rounded-lg shadow-md flex'>Valorant</p>
                    <ValorantStats />
                </div>
                <div>
                    <p className='max-w-lg p-2 bg-[#11111bc2] text-white rounded-lg shadow-md flex'>n/a</p>
                    <ValorantStats />
                </div>
                <div>
                    <p className='max-w-lg p-2 bg-[#11111bc2] text-white rounded-lg shadow-md flex'>n/a</p>
                    <ValorantStats />
                </div>
            
            </div>
        </main>
    );
}
