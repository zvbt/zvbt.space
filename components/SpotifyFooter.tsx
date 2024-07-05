import React from 'react';

interface SpotifyCardProps {
  status: any;
  statusColor: any;
  link?: any;
  Image?: any;
  title?: any;
  artist?: any;
  progress?: any;
}

const SpotifyCard: React.FC<SpotifyCardProps> = ({
  status,
  statusColor,
  link,
  Image,
  title,
  artist,
  progress
}) => {

  return (
    <div className=''>
    <a href={link} target='_blank'>
    <div className='flex flex-col'>
      <div className='flex items-center space-x-2'>
        <img src={Image} width={64} height={64} className='ml-auto mt-auto rounded-sm' draggable={false} alt=' '/>
        <ul className='list-none ml-4 text-sm sm:text-sm'>
          <li className={statusColor}>{status}</li>
          <li className='text-white text-stroke' title={title}>{title}</li>
          <li className='text-white text-stroke' title={artist}>{artist}</li>
        </ul>
      </div>
    </div>
</a>
</div>
  );
};

export default SpotifyCard;