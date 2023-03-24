import ReactPlayer from "react-player";
import Button from "./components/button";
import InputRange from "./components/input-range";
import { useYoutubeVideo } from "./hooks/useYoutubeVideo";

function App() {
  const {
    videos,
    slider,
    player1,
    player2,
    handlePlay,
    handleRewind,
    handleFastForward,
    handleSliderChange,
    duration,
    playbackRate,
  } = useYoutubeVideo();

  return (
    <div className="grid grid-cols-1 bg-black h-screen p-4">
      <div className=" grid grid-rows-3 gap-1">
        <InputRange
          handleChange={handleSliderChange}
          max={duration}
          value={slider}
        />
        <div className="grid grid-cols-2 gap-4">
          <Button handleClick={handleRewind} text="Back" />
          <Button handleClick={handleFastForward} text="Forward" />
        </div>
        <Button
          handleClick={handlePlay}
          text={videos.find((video) => video.isPlaying) ? "Pause" : "Play"}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {videos.map((vid, idx) => (
          <ReactPlayer
            className="grid text-cyan-500 shadow-cyan-500/50 hover:shadow-indigo-500/40 place-self-center"
            key={vid.id}
            ref={vid.id === 1 ? player1 : player2}
            playing={vid.isPlaying}
            controls={false}
            pip={false}
            playbackRate={idx === 1 ? playbackRate : 1}
            muted={true}
            config={{
              file: {
                attributes: {
                  onContextMenu: (e) => e.preventDefault(),
                  controlsList: "nodownload",
                },
              },
            }}
            url="https://www.youtube.com/watch?v=lIES3ii-IOg&ab_channel=GuyCollinsAnimation"
          />
        ))}
      </div>
    </div>
  );
}

export default App;
