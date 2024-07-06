import React from 'react';
import { Icons } from './icon';
import Link from 'next/link';
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
      <div className='flex items-center space-x-2'>
      <img src={Image} width={64} height={64} className='ml-auto mt-auto' draggable={false} alt=' '/>
      
        <ul className='list-none text-sm sm:text-sm'>
          <li className={statusColor}>{status}</li>
          <li className='text-white text-stroke' title={title}>{title}</li>
          <li className='text-white text-stroke' title={artist}>{artist}</li>
        </ul>
        <Link href={link} className='fixed mb-10 left-52' target='_blank'><Icons.external/></Link>

        </div>

</div>
  );
};

export default SpotifyCard;