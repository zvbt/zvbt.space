'use client';
import React, { useState, useEffect } from 'react';

interface ProgressBarProps {
  startEpochTime: number;
  endEpochTime: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ startEpochTime, endEpochTime }) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    const updateElapsedTime = () => {
      const currentEpochTime = new Date().getTime();
      const newElapsedTime = currentEpochTime - startEpochTime;
      setElapsedTime(newElapsedTime);

      if (currentEpochTime < endEpochTime) {
        setTimeout(updateElapsedTime, 1000); // Update every second
      }
    };

    updateElapsedTime();
  }, [startEpochTime, endEpochTime]);

  const totalDurationInSeconds = Math.floor((endEpochTime - startEpochTime) / 1000);
  const totalMinutes = Math.floor(totalDurationInSeconds / 60);
  const totalSeconds = totalDurationInSeconds % 60;

  const elapsedMinutes = Math.floor(elapsedTime / 60000); // Convert milliseconds to minutes
  const elapsedSeconds = Math.floor((elapsedTime % 60000) / 1000); // Remaining seconds

  // Format minutes and seconds with leading zeros
  const formattedElapsedMinutes = elapsedMinutes.toString().padStart(2, '0');
  const formattedElapsedSeconds = elapsedSeconds.toString().padStart(2, '0');
  const formattedTotalMinutes = totalMinutes.toString().padStart(2, '0');
  const formattedTotalSeconds = totalSeconds.toString().padStart(2, '0');

  return (
  <div className='hidden lg:flex flex-col items-end overflow-x-hidden'>
      <div className='ml-[64px] w-full h-[64px] backdrop-blur-sm bg-[#11111bc2]'>
        <div
          style={{
            width: `${(elapsedTime / (endEpochTime - startEpochTime)) * 100}%`,
            transition: 'width 2s ease',
          }}
          className='h-full rounded-md bg-[#1DB954]'
        />
      </div>
      <div className='fixed'>
        {formattedElapsedMinutes}:{formattedElapsedSeconds} / {formattedTotalMinutes}:{formattedTotalSeconds}
      </div>
    </div>
    
  );
};

export default ProgressBar;