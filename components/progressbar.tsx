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
  <div className='flex flex-col items-end mr-10 pr-0 sm:mr-0'>
  <div className='flex w-full text-[#c0c1c2] text-xs'>
 
  </div>
      <div className='w-full h-[63px] bg-[#171717]'>
        <div
          style={{
            width: `${(elapsedTime / (endEpochTime - startEpochTime)) * 100}%`,
            transition: 'width 3s ease',
          }}
          className='h-full bg-green-600'
        />
      </div>
    </div>
    
  );
};

export default ProgressBar;