import { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? 25 * 60 : 5 * 60);
      setIsActive(false);
    }

    return () => clearInterval(timer);
  }, [isActive, timeLeft, isBreak]);

  useEffect(() => {
    document.title = `${formatTime(timeLeft)} - ${isBreak ? 'Break | zvbt.cc' : 'Work | zvbt.cc'}`;
  }, [timeLeft, isBreak]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
    setIsBreak(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-[#11111bc2] p-6 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">{isBreak ? 'Break Time' : 'Work Time'}</h1>
        <div className="text-6xl font-mono mb-6 text-white">{formatTime(timeLeft)}</div>
        <div className="space-x-4">
          <button
            onClick={toggleTimer}
            className={`px-4 py-2 rounded-lg text-white ${isActive ? 'bg-red-500' : 'bg-green-500'}`}
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={resetTimer}
            className="px-4 py-2 rounded-lg bg-gray-500 text-white"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
