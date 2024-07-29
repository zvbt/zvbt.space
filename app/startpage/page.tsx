'use client'
import Image from "next/image";
import Link from "next/link";
import Clock from "@/components/clock";
export default async function Home() {
    return (
        <main>
            <Image src={'https://r2.e-z.host/7ed0180f-b228-49a7-be1e-0183c1938777/a8hokk7w.png'} width={1920} height={1080} className='fixed object-cover w-full h-full blur-sm z-0' draggable={false} alt='bg' quality={100}/>
            <Link href={'https://r2.e-z.host/7ed0180f-b228-49a7-be1e-0183c1938777/a8hokk7w.png'} target='_blank' className="z-50 absolute mx-2 opacity-60 text-sm right-0 bottom-[10px]">Background by Unknown</Link>
            
            <Clock />
            <div className="flex justify-center items-center h-screen z-10 relative">
                <form action="https://www.google.com/search" method="get" className="w-full max-w-md">
                    <input 
                        type="text" 
                        name="q" 
                        placeholder="서치" 
                        className="w-full px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white placeholder-gray-300"
                    />
                </form>
            </div>
        </main>
    );
}
