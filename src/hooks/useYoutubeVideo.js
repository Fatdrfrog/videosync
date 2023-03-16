import { useState, useRef } from "react";
import { useHookWithRefCallback } from "./useHookWithRefCallback";

export const useYoutubeVideo = () => {
  const [videos, setVideos] = useState([
    { id: 1, label: "First Player" },
    { id: 2, label: "Second Player" },
  ]);

  const [sliderValue, player1, duration] = useHookWithRefCallback(0);

  const player2 = useRef(null);

  const handlePlay = () => {
    setVideos((prevVideos) =>
      prevVideos.map((vid) => {
        return { ...vid, isPlaying: !vid.isPlaying };
      })
    );
  };

  const handleRewind = () => {
    player1.current.seekTo(player1.current.getCurrentTime() - 10);
    player2.current.seekTo(player2.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    player1.current.seekTo(player1.current.getCurrentTime() + 10);
    player2.current.seekTo(player2.current.getCurrentTime() + 10);
  };

  const handleSliderChange = (e) => {
    const currentSlider = e.target.value;
    setSlider(currentSlider);
    player1.current.seekTo(currentSlider);
    player2.current.seekTo(currentSlider);
  };

  return {
    videos,
    slider: sliderValue,
    player1,
    player2,
    handlePlay,
    handleRewind,
    handleFastForward,
    handleSliderChange,
    duration,
  };
};
