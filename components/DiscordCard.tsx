import React from "react";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

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
        // border border-white hover:border-[#e78284]
        <div
            className="m-1 w-90 sm:w-96 z-10 rounded-lg p-2 sm:p-5 border border-white hover:border-[#e78284]">
            <a href={link} target="_blank">
                <div className="flex flex-col">
                    <div className="flex items-center space-x-2">
                        <img
                            src={Image}
                            width={100}
                            height={100}
                            draggable={false}
                            alt="discord_avatar"
                            className={cn(
                                "",
                                status === "dnd" && "rounded-full border border-[#e78284] border-x-4 border-y-4",
                                status === "online" && "rounded-full border-[#a6d189] border-x-4 border-y-4",
                                status === "idle" && "rounded-full border-[#e5c890] border-x-4 border-y-4",
                                status === "offline" && "rounded-full border-[#737994] border-x-4 border-y-4"
                            )}
                        />
                        <ul className="list-none ml-4 text-sm sm:text-base">
                            <li className="">{displayName}</li>
                            <li>{flag}</li>
                            <li>{game}</li>
                        </ul>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default DiscordCard;
