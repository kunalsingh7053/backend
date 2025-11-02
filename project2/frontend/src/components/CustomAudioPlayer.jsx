// src/components/CustomAudioPlayer.jsx
import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

const CustomAudioPlayer = ({ src, currentAudioRef }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    // Safely attach pausePlayer after mount
    if (audio) {
      audio.pausePlayer = () => {
        audio.pause();
        audio.currentTime = 0; // 👈 added this line to reset the audio
        setIsPlaying(false);
      };
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      // Pause the currently playing audio if it's different
      if (
        currentAudioRef.current &&
        currentAudioRef.current !== audio
      ) {
        currentAudioRef.current.pausePlayer?.();
      }

      currentAudioRef.current = audio;
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setProgress(audio.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const value = e.target.value;
    if (audio) {
      audio.currentTime = value;
      setProgress(value);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="w-full bg-black text-white p-4 rounded-lg shadow-md">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={togglePlay}
          className="text-xl bg-gray-800 p-2 rounded-full hover:bg-gray-700"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <div className="text-sm">
          {formatTime(progress)} / {formatTime(duration)}
        </div>
      </div>
      <input
        type="range"
        min="0"
        max={duration || 0}
        value={progress}
        onChange={handleSeek}
        className="w-full accent-blue-500"
      />
    </div>
  );
};

export default CustomAudioPlayer;
