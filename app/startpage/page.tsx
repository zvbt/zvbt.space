'use client'
import Image from "next/image";
import Link from "next/link";
import NoteTaking from "@/components/NoteTaking";

export default async function Home() {
    return (
        <main>
            <title>New Tab</title>
             <Image src={'https://r2.e-z.host/7ed0180f-b228-49a7-be1e-0183c1938777/a8hokk7w.png'} width={1920} height={1080} className='fixed object-cover w-full h-full blur-sm z-0' draggable={false} alt='bg' quality={100}/>            
            <div className="flex justify-center items-center h-screen z-10 relative">
                <form action="https://www.google.com/search" method="get" className="w-full max-w-md">
                    <input 
                        type="text" 
                        name="q" 
                        placeholder="서치" 
                        className="text-center w-full px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white placeholder-white"
                    />
                </form>
            </div>

            <NoteTaking />

           
        </main>
    );
}
