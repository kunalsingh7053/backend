import React, { useState } from 'react'
import FaceMoodDetector from './components/FaceMoodDetector'
import MoodSong from './components/MoodSong'

const App = () => {
  const [songs, setSongs] = useState({ songs: [] });
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <FaceMoodDetector setSongs={setSongs} setIsLoading={setIsLoading} />
      <MoodSong Songs={songs} isLoading={isLoading} />
    </div>
  );
};

export default App;
