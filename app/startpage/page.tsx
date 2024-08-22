'use client'
import { useEffect, useState, FormEvent, useRef } from 'react';
import Image from "next/image";
import NoteTaking from "@/components/NoteTaking";
import Clock from "@/components/clock";
import "./main.css"




export default function Home() {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const query = inputRef.current?.value;
        if (!query) return;

        const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
        
        if (urlPattern.test(query)) {
            const url = query.startsWith('http') ? query : `http://${query}`;
            window.location.href = url;
        } else {
            const searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
            window.location.href = searchUrl;
        }
    };


    const [currentImage, setCurrentImage] = useState('/img/side1.gif');
    const [imageKey, setImageKey] = useState(0); // force re-render of image

    const imageCount = 23; // number of GIFs

    useEffect(() => {
        const updateClock = (): void => {
            const days: string[] = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
            const m: Date = new Date();
            const dateString: string =
                days[m.getDay()] + " " +
                ("0" + m.getDate()).slice(-2) + "/" +
                ("0" + (m.getMonth() + 1)).slice(-2) + "/" +
                m.getFullYear() + " " +
                ("0" + m.getHours()).slice(-2) + ":" +
                ("0" + m.getMinutes()).slice(-2) + ":" +
                ("0" + m.getSeconds()).slice(-2);
        
            const element: HTMLElement | null = document.getElementById('codes');
            if (element) {
                element.innerHTML = dateString;
            }
        
            setTimeout(updateClock, 1000);
        };

        updateClock();

        // random gif every 10sec
        const changeImage = () => {
            const randomIndex = Math.floor(Math.random() * imageCount) + 1;
            setCurrentImage(`/img/side${randomIndex}.gif`);
            setImageKey(prevKey => prevKey + 1);
        };

        const interval = setInterval(changeImage, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <main className='font-iosevka'>
            <title>New Tab</title>
            {/* old page 
            <Image src={'https://r2.e-z.host/7ed0180f-b228-49a7-be1e-0183c1938777/a8hokk7w.png'} width={1920} height={1080} className='fixed object-cover w-full h-full blur-sm z-0' draggable={false} alt='bg' quality={100}/>
            <Clock />          
            <div className="flex justify-center items-center h-screen z-10 relative">
                <form onSubmit={handleSubmit} className="w-full max-w-md">
                    <input 
                        type="text" 
                        name="q" 
                        placeholder="서치" 
                        ref={inputRef}
                        className="text-center w-full px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white placeholder-white"
                    />
                </form>
            </div>
            <NoteTaking />
            */}

            <div className="main block">
                <div className="image-wrapper">
                    <div className="mySlides">
                        <Image src={currentImage} key={imageKey} className="fade" alt="Random GIF" width={300} height={600} quality={100}/>
                    </div>
                </div>
       
                <header className='mt-20 mb-10 text-[40px]'>
                    <h1>Hello, <span className="flair">시아딘</span></h1>
                </header>

                <nav className="flex justify-center">
                    <ul className="blue flex-1 flex flex-col items-center text-[#adadad] hover:text-white">
                        <li className='mb-2'>Socials</li>
                        <li><a href="https://www.youtube.com" className="hover:text-blue-500">youtube</a></li>
                        <li><a href="https://twitch.tv/" className="hover:text-blue-500">twitch</a></li>
                        <li><a href="https://x.com/" className="hover:text-blue-500">twitter</a></li>
                        <li><a href="https://mydramalist.com/dramalist/Cyadine" className="hover:text-blue-500">mydramalist</a></li>
                        <li><a href="https://anilist.co/home" className="hover:text-blue-500">anilist</a></li>
                    </ul>

                    <ul className="green flex-1 flex flex-col items-center text-[#adadad] hover:text-white ">
                        <li className='mb-2'>DEV</li>
                        <li><a href="https://github.com" className="hover:text-green-500">github</a></li>
                        <li><a href="http://192.168.1.32:3000/" className="hover:text-green-500">dokploy</a></li>
                        <li><a href="http://192.168.1.32:9000/" className="hover:text-green-500">portainer</a></li>
                        <li><a href="http://192.168.1.32:7575/" className="hover:text-green-500">dash</a></li>
                    </ul>

                    <ul className="red flex-1 flex flex-col items-center text-[#adadad] hover:text-white ">
                        <li className='mb-2'>Stats</li>
                        <li><a href="https://www.deeplol.gg/summoner/EUW/Long%20time%20no%20see-jisu" className="hover:text-red-500">deeplol</a></li>
                        <li><a href="https://tracker.gg/valorant/profile/riot/Long%20time%20no%20see%23jisu/overview" className="hover:text-red-500">tracker.gg</a></li>
                    </ul>

                    <ul className="yellow flex-1 flex flex-col items-center text-[#adadad] hover:text-white ">
                        <li className='mb-2'>Others</li>
                        <li><a href="https://monkeytype.com/" className="hover:text-yellow-500">monkeytype</a></li>
                        <li><a href="https://www.duolingo.com/" className="hover:text-yellow-500">duolingo</a></li>
                        <li><a href="https://papago.naver.com/" className="hover:text-yellow-500">papago</a></li>
                    </ul>
                </nav>

                <div className="codes" id="codes"></div>
            </div>

            <div className="flex justify-center my-[-4.5em]">
            <div className="w-[1070px]">
            <form onSubmit={handleSubmit} className="">
                <input 
                    type="text" 
                    name="q" 
                    placeholder="Search" 
                    ref={inputRef}
                    className="text-center w-[1070px] px-4 py-2 border border-[#232328] bg-[#18181D] focus:outline-none text-white placeholder-[#adadad] hover:placeholder-white"
                />
            </form>
            </div>
        </div>



        </main>
    );
}
