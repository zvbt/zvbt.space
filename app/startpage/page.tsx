'use client'
import Image from "next/image";
import Link from "next/link";
import Clock from "@/components/clock";
import unsplash from "@/lib/unsplash";
const crypto = require('crypto');
export default async function Home() {

  //Unsplash
  const unsplashData = await unsplash();
  const randomIndex = crypto.randomInt(unsplashData.results.length);
  const result = unsplashData.results[randomIndex];
  const imgSource = result.links.html;
  const author = result.user.name;
  const randomImg = result.urls.regular;


    return (
        <main>
            <title>New Tab</title>
             <Image src={randomImg} width={1920} height={1080} className='absolute object-cover w-full h-full blur-sm z-1' draggable={false} alt='bg' quality={100}/>
            <Link href={imgSource} target='_blank' className="z-50 absolute mx-2 opacity-60 text-sm right-0 bottom-[10px]">Background by {author}</Link>
            
            <Clock />
            <div className="flex justify-center items-center h-screen z-10 relative">
                <form action="https://www.google.com/search" method="get" className="w-full max-w-md">
                    <input 
                        type="text" 
                        name="q" 
                        placeholder="서치" 
                        className="w-full px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white placeholder-white"
                    />
                </form>
            </div>
        </main>
    );
}
