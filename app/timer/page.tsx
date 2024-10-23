'use client';

import PomodoroTimer from "@/components/PomodoroTimer";
import Clock from "@/components/Clock";
import Image from 'next/image';

export default function Home() {
    return (
        <main className="relative flex items-center justify-center h-screen overflow-hidden">
            <div className="absolute inset-0 -z-10 blur-sm">
                <Image 
                    src="https://r2.e-z.host/7ed0180f-b228-49a7-be1e-0183c1938777/9rwgd42l.jpg"
                    alt="bg"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    priority={true}
                />
            </div>
            <div className="flex w-full justify-center p-10 bg-[#11111bc2]">
                <div className="w-1/2 flex justify-center">
                    <Clock />
                </div>
                <div className="w-1/2 flex justify-center">
                    <PomodoroTimer />
                </div>
            </div>
        </main>
    );
}
