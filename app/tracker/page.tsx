'use client'
import { useEffect, useState, FormEvent, useRef } from 'react';
import Image from "next/image";
import LeagueStats from '@/components/LeagueStats';


export default function Home() {
    return (
        <main>
            <Image src={'https://r2.e-z.host/7ed0180f-b228-49a7-be1e-0183c1938777/a8hokk7w.png'} width={1920} height={1080} className='fixed object-cover w-full h-full blur-sm z-0' draggable={false} alt='bg' quality={100}/>

            <div className="min-h-screen flex items-center justify-center absolute">
             
            <LeagueStats />
            </div>
        </main>
    );
}
