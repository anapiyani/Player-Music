import React from "react"; 
import './allSongs.scss';
type TProps = {
    audioData: string;
    name: string;
    picture: string;
    author: string;
    nowPlaying: boolean;
}
const AllSongs = (props: TProps) => {
    const isCurrentSong = props.nowPlaying;
    return (
        <div className="song_out">
            <div className="song">
                <div className="pic">
                    <img src={props.picture} alt="" />
                </div>
                <div className="name">
                    {isCurrentSong ?  <p style={{color: '#529821', fontSize: '16px'}}>{props.name}</p> :  <p style={{color: 'white'}}>{props.name}</p> }
                    {isCurrentSong ?  <p style={{color: '#529821'}}>{props.author}</p> :  <p style={{color: 'white'}}>{props.author}</p> }
                </div>
            </div>
        </div>
    )
}

export default AllSongs;