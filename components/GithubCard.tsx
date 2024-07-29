import { Icons } from "./icon";

interface GithubCardProps {
    user?: any;
    reponame?: any;
    description?: any;
    language?: any;
    star?: any;
    link?: any;
    homepage?: any;
}

const GithubCard: React.FC<GithubCardProps> = ({
    user,
    reponame,
    description,
    language,
    star,
    link,
    homepage,
}) => {
    const capitalize = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div className="bg-[#11111bc2] m-2 p-4 w-[29rem] h-[12rem] rounded-lg z-50 flex flex-col justify-between" >
            <div>
                <div className="inline-flex mb-2">
                    <div className="mt-[5px] pr-1">
                        <Icons.archive />
                    </div>
                    <a href={link} className="pr-2 hover:underline" target="_blank">{process.env.GITHUB_USER}/{reponame}</a>
                </div>
                <p className="text-sm text-[#a6adc8]">{description}</p>
            </div>

            {/* tags star and link */}
            <div className="inline-flex space-x-1 mt-3 text-xs backdrop-blur-sm">
                <div className="inline-flex bg-[#11111bc2] p-1 rounded-lg">
                    <p>{language}</p>
                </div>
                <div className="bg-[#11111bc2] rounded-lg inline-flex p-1 items-center">
                    <p>⭐</p>
                    <p>{star}</p>
                </div>
                {homepage ? (
                    <div className="bg-[#11111bc2] rounded-lg inline-flex p-1 items-center">
                        <a href={homepage} target="_blank" title={homepage}>
                            <Icons.globe />
                        </a>
                    </div>
                ) : (
                    <div className="bg-[#11111bc2] rounded-lg inline-flex p-1 items-center">
                        <a href="#" title="No Homepage Available">
                            <Icons.globe />
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GithubCard;
