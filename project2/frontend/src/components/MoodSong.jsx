// src/components/MoodSong.jsx
import React, { useRef } from "react";
import CustomAudioPlayer from "./CustomAudioPlayer"; // Make sure path is correct

const MoodSong = ({ Songs, isLoading }) => {
  const songList = Songs?.songs || [];
  const currentAudioRef = useRef(null); // ✅ shared audio ref

  return (
    <div className="text-white w-full flex flex-col mt-5 px-4">
      <h1 className="mb-5 text-xl font-bold">Recommended Songs</h1>

      {isLoading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto"></div>
          <p className="mt-3 text-sm text-gray-400">Loading songs...</p>
        </div>
      ) : songList.length > 0 ? (
        <ul className="space-y-4">
          {songList.map((song, index) => (
            <li key={index} className="bg-gray-800 p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{song.title}</h2>
              <p className="text-gray-400">{song.artist}</p>

              {/* ✅ Use CustomAudioPlayer instead of <audio> */}
              <CustomAudioPlayer
                src={song.audio}
                currentAudioRef={currentAudioRef}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No songs found for the detected mood.</p>
      )}
    </div>
  );
};

export default MoodSong;
