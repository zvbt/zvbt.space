import { Howl } from 'howler';
import { useEffect, useState } from 'react';

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const [sound, setSound] = useState<Howl | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.01); // Set initial volume to 10%

  useEffect(() => {
    const newSound = new Howl({
      src: [src],
      html5: true,
      volume: volume, // Set initial volume for the Howl instance
    });

    setSound(newSound);

    return () => {
      newSound.unload();
    };
  }, [src, volume]); // Include volume in dependencies to ensure it updates correctly

  const handlePlayPause = () => {
    if (sound) {
      if (isPlaying) {
        sound.pause();
      } else {
        sound.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (sound) {
      sound.volume(newVolume);
      setVolume(newVolume);
    }
  };

  return (
    <div className="">
      <button 
        onClick={handlePlayPause}
        className="px-4 py-2 border border-[#232328] bg-[#18181D] text-[#adadad] font-iosevka text-[16px] z-50"
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <div>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
