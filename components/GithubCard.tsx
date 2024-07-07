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
    homepage
}) => {
    const capitalize = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

  return (
    <div className="flex-col p-4">
      <a href={link} className="pr-2 text-blue-500" target="_blank">github</a>
      <a href={homepage} className="text-blue-500" target="_blank">homepage</a>
      <p>{process.env.GITHUB_USER}/{reponame}</p>
      <p>{description}</p>
      <p>{language}</p>
      <p>{star}</p>
    </div>
  );
}

export default GithubCard;
