// src/components/FaceMoodDetector.jsx
import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

const FaceMoodDetector = ({ setSongs, setIsLoading }) => {
  const videoRef = useRef();
  const [mood, setMood] = useState("Neutral");

  useEffect(() => {
    let intervalId;

    const loadModelsAndStartCamera = async () => {
      const MODEL_URL = "/models";

      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);

        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        videoRef.current.srcObject = stream;

        intervalId = setInterval(async () => {
          if (videoRef.current && videoRef.current.readyState === 4) {
            const detections = await faceapi
              .detectAllFaces(
                videoRef.current,
                new faceapi.TinyFaceDetectorOptions({
                  inputSize: 320,
                  scoreThreshold: 0.5,
                })
              )
              .withFaceExpressions();

            if (detections.length > 0) {
              const expressions = detections[0].expressions;
              const topExpression = Object.entries(expressions).reduce((max, curr) =>
                curr[1] > max[1] ? curr : max
              );
              setMood(topExpression[0]);
            } else {
              setMood("No face detected");
            }
          }
        }, 2000);
      } catch (err) {
        console.error("Error loading models or accessing camera:", err);
        setMood("Error accessing camera/models");
      }
    };

    loadModelsAndStartCamera();

    return () => {
      clearInterval(intervalId);
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const detectsend = async (currentMood) => {
    console.log("Detected mood:👉", currentMood);
    setIsLoading(true); // ✅ loader ON
    try {
      const response = await axios.get(`http://localhost:3000/songs?mood=${currentMood}`);
      setSongs(response.data);
      console.log("Songs fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching songs:", error);
      setSongs({ songs: [] });
    } finally {
      setIsLoading(false); // ✅ loader OFF
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row items-center md:justify-between gap-5">
      <video
        ref={videoRef}
        autoPlay
        muted
        className="border-2 border-black w-full md:w-2/6 rounded-lg shadow-lg"
        height="400px"
      />
      <div className="text-center md:text-left md:mt-10">
        <h1 className="text-xl font-semibold mb-2">Live Mood Detection</h1>
        <p className="text-gray-400 font-thin mb-2">
          Your current mood is being analyzed in real-time. Enjoy music tailored to your feelings.
        </p>
        <div className="bg-gray-700 px-4 py-2 rounded shadow text-lg font-medium">
          Detected mood: <span className="text-blue-600">{mood}</span>
        </div>
        <button
          className="bg-gray-700 px-4 py-2 rounded shadow text-lg font-medium mt-5"
          onClick={() => detectsend(mood)}
        >
          Generate Song
        </button>
      </div>
    </div>
  );
};

export default FaceMoodDetector;
