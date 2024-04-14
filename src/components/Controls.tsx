import React, {useState} from "react";
import prev from '../assets/icons/prev.png';
import play from '../assets/icons/play.png';
import paused from '../assets/icons/paused.png';
import next from '../assets/icons/next.png';
import repeat from '../assets/icons/repeat.png';
import repeatGreen from '../assets/icons/repaet_green.png';
import shuffle from '../assets/icons/shuffle.png';
import shuffleGreen from '../assets/icons/shuffle_green.png';

import './Controls.scss';
type Tduration = {
    duration: string;
    current: string;
}
type TProps = {
    HandlePlay: () => void;
    HandlePause: () => void;
    nextHandle: () => void;
    prevHandle: () => void;
    handleRepeat: () => void;
    handleShuffle: () => void;
    isShuffle: boolean;
    isRepeat: boolean;
    durTime: Tduration;
}
const Controls = (props: TProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const handleMusic = () => {
        setIsPlaying(!isPlaying);

        if (isPlaying) {
            props.HandlePause();
        } else {
            props.HandlePlay();
        }
    }
    const handleNext = () => {
        props.HandlePause();
        props.nextHandle();
    }
    const handlePrev = () => {
        props.HandlePause();
        props.prevHandle();
    }
    const handleRepeat = () => {
        props.handleRepeat();
    }
    const handleShuffle = () => {
        props.handleShuffle();
    }
    return (
        <div className="controls-wrapper">
            <div className="controls">
                <p>{props.durTime.current}</p>
                <button className="repeat" onClick={() => handleRepeat()}>
                    {props.isRepeat ? <img src={repeatGreen} alt="repeat" /> : <img src={repeat} alt="repeat" />}
                </button>
                <button className="prev" onClick={() => handlePrev()}>
                    <img src={prev} alt="" />
                </button>
                {
                    isPlaying ? <button onClick={() => handleMusic()}  className="play">
                        <img src={paused} alt=""/>
                    </button> : <button className="play" onClick={() => handleMusic()}>
                        <img src={play} alt="" />
                    </button>
                }
                <button className="next" onClick={() => handleNext()}>
                    <img src={next} alt="" />
                </button>
                <button className="shuffle" onClick={() => handleShuffle()}>
                    {props.isShuffle ? <img src={shuffleGreen} alt="shuffle" />: <img src={shuffle} alt="shuffle" />}
                </button>
                <p>{props.durTime.duration}</p>
            </div>
      </div>
    )
}
export default Controls;