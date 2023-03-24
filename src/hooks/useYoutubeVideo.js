import { useState, useRef, useEffect } from "react";

let syncInterval;

export const useYoutubeVideo = () => {
  const [videos, setVideos] = useState([
    { id: 1, label: "First Player" },
    { id: 2, label: "Second Player" },
  ]);

  const [isPlaying, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  const [sliderValue, setSliderValue] = useState(0);
  const player1 = useRef(null);
  const player2 = useRef(null);

  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    if (isPlaying) {
      startSync();
    } else stopSync();

    () => {
      stopSync();
    };
  }, [player1, player2, isPlaying]);

  function startSync() {
    syncInterval = setInterval(() => {
      const diff =
        player1.current.getCurrentTime() - player2.current.getCurrentTime();
      setSliderValue(player2.current.getCurrentTime());

      setDuration(player2.current.getDuration());
      console.log("diff: ", diff);
      if (Math.abs(diff) > 0.01) {
        if (diff > 0) {
          console.log("more");
          setPlaybackRate(1.01);
        } else {
          console.log("less");

          setPlaybackRate(0.99);
        }
      } else {
        setPlaybackRate(1);
      }
    }, 10);
  }

  function stopSync() {
    clearInterval(syncInterval);
  }

  const handlePlay = () => {
    setPlaying((prevPlaying) => !prevPlaying);
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
    setSliderValue(currentSlider);
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
    playbackRate,
  };
};
