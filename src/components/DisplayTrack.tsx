import React, { useState } from "react";
import './DisplayTrack.scss';
type TProps = {
    currentTrack: string;
    image: string;
    name: string;
    author: string;
    onPlaying: VoidFunction;
}
const DisplayTrack = React.forwardRef<HTMLAudioElement, TProps>((props, ref) => {
    return (
        <div className="displayTrack">
              <audio controls src={props.currentTrack} ref={ref} onTimeUpdate={props.onPlaying}></audio>
            <div className="display_track">
                <div className="track_pic">
                    <img src={props.image} alt="" />
                </div>
                <div className="track_info">
                    <div className="name_author">
                        <p>{props.name}</p>
                        <p>{props.author}</p>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default DisplayTrack;