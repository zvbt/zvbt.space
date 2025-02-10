"use client";
import Image from "next/image";
import LeagueStats from "@/components/LeagueStats";
import MDLStats from "@/components/MDLStats";
import AnilistStats from "@/components/AnilistStats";
import WakaTimeStats from "@/components/WakatimeStats";
import Wasted from "@/components/Wasted";

export default function Home() {
    return (
        <main className="relative w-full min-h-screen flex flex-col items-center">
            <Image
                src={"https://r2.e-z.host/7ed0180f-b228-49a7-be1e-0183c1938777/fhaewi1i.png"}
                width={1920}
                height={1080}
                className="fixed object-cover w-full h-full blur-sm z-0"
                draggable={false}
                alt="bg"
                quality={100}
            />

            {/* Wasted hours large screen */}
            <div className="hidden lg:flex lg:flex-col absolute top-4 left-4 bg-[#11111bc2] py-4 px-4 text-white rounded-lg shadow-md max-w-sm">
                <p className="text-center font-semibold">Wasted Hours</p>
                <Wasted />
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4 px-1 w-full max-w-6xl lg:ml-7">
                <div className="bg-[#11111bc2] py-4 text-white rounded-lg shadow-md">
                    <p className="text-center font-semibold">MyDramalist</p>
                    <MDLStats />
                </div>
                <div className="bg-[#11111bc2] py-4 text-white rounded-lg shadow-md">
                    <p className="text-center font-semibold">Anilist</p>
                    <AnilistStats />
                </div>
                <div className="bg-[#11111bc2] py-4 text-white rounded-lg shadow-md">
                    <p className="text-center font-semibold">League Of Legends</p>
                    <LeagueStats />
                </div>
                <div className="bg-[#11111bc2] py-4 text-white rounded-lg shadow-md">
                    <p className="text-center font-semibold">Wakatime</p>
                    <WakaTimeStats />
                </div>

                <div className="block lg:hidden bg-[#11111bc2] py-4 text-white rounded-lg shadow-md">
                    <p className="text-center font-semibold">Wasted Hours</p>
                    <Wasted />
                </div>
            </div>
        </main>
    );
}
