import React from "react";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { Icons } from "./icon";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface DiscordCardProps {
    status: string;
    displayName?: string;
    flagText?: string;
    link?: string;
    Image?: string;
    flag?: any;
    game?: any;
    spotify?: any;
    progress?: any;
}

const DiscordCard: React.FC<DiscordCardProps> = ({
    status,
    displayName,
    link,
    Image,
    flag,
    game,
    spotify,
    progress
}) => {
    const capitalize = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div
            className="w-90 sm:w-96 z-10 rounded-tr-lg p-2 sm:p-5 rounded-lg">
                <div className="flex flex-col">
                    <div className="flex items-center space-x-2">
                    <div className={cn("",status === "dnd" && "fixed w-4 h-4 rounded-full ml-[50px] mt-[48px] bg-[#e78284] border-2 border-black",status === "online" && "absolute w-4 h-4 rounded-full ml-[50px] mt-[48px] bg-[#a6d189] border-2 border-black",status === "idle" && "fixed w-4 h-4 rounded-full ml-[50px] mt-[48px] bg-[#e5c890] border-2 border-black",status === "offline" && "fixed w-4 h-4 rounded-full ml-[50px] mt-[48px] bg-[#737994] border-2 border-black")}></div>
                    <a href={link} target="_blank" className="fixed w-[64px] h-[64px] rounded-full">
                    <div className={'fixed w-[64px] h-[64px] rounded-full opacity-0 hover:opacity-100 hover:bg-[#11111bc2] flex items-center justify-center'}>
                     <Icons.external className="w-5 h-5"/> 
                    </div>
                    </a>
                        <img
                            src={Image}
                            width={64}
                            height={64}
                            draggable={false}
                            alt="discord_avatar"
                            className="rounded-full"
                        />
                        
                        <ul className="list-none ml-4 text-sm sm:text-base ">
                            <li>{displayName}</li>
                            <li>{flag}</li>
                            <li>{game}</li>
                        </ul>
                    </div>
                </div>

        </div>
    );
};

export default DiscordCard;



