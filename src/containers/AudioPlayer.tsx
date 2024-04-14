import React, {useState, useRef} from 'react';
import './AudioPlayer.scss';
import AllSongs from '../components/allSongs';
import DisplayTrack from '../components/DisplayTrack';
import ProgressBar from '../components/Progress';
import Controls from '../components/Controls';
import { data } from './AudioPlayer.data';
type TSongs = {
    audioData: string;
    name: string;
    picture: string;
    author: string;
    id: string;
    nowPlaying: boolean;
}
type TTime = {
    progress: number;
}
type Tduration = {
    duration: string;
    current: string;
}
const AudioPlayer = () => {
    const [music, setMusics] = useState<TSongs[]>(data);
    const [currentTrack, setCurrentTrack] = useState(music[0]);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [songTime, setSongTime] = useState<TTime>({progress: 0});
    const [times, setTimes] = useState<Tduration>({duration: '0:00', current: '0:00'})
    const [shuffle, setShuffle] = useState<boolean>(false);
    const [repeat, setRepeat] = useState<boolean>(false);

    const HandlePlay = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    }
    const HandlePause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    }
    const HandleNextSong = () => {
        if (shuffle) {
            const randomIndex: number = Math.floor(Math.random() * music.length);
            setCurrentTrack(music[randomIndex]);
        } else if (repeat) {
            setCurrentTrack(prevTrack => {
                const currentIndex = music.findIndex(track => track.id === prevTrack.id);
                const nextIndex = (currentIndex) % music.length;
                return music[nextIndex];
            });
        } else {
            setCurrentTrack(prevTrack => {
                const currentIndex = music.findIndex(track => track.id === prevTrack.id);
                const nextIndex = (currentIndex + 1) % music.length;
                return music[nextIndex];
            });
        }
        setTimeout(() => {
            HandlePlay();
        }, 500)
    }
    const HandlePrevSong = () => {
        setCurrentTrack(prevTrack => {
            const currentIndex = music.findIndex(track => track.id === prevTrack.id);
            let nextIndex = (currentIndex - 1) % music.length;
            if (nextIndex === -1) {
                nextIndex = music.length - 1;
            }
            return music[nextIndex];
        });
        setTimeout(() => {
            HandlePlay();
        }, 500)
    }
    const handleShuffle = () => {
        if (shuffle) {
            setShuffle(false);
        } else {
            setShuffle(true);
        }
    }
    const handleRepeat = () => {
        if (repeat) {
            setRepeat(false);
        } else {
            setRepeat(true);
        }
    }
    const onPlaying = () => {
        const Duration = audioRef.current?.duration;
        const ct = audioRef.current?.currentTime;

        const ctMinutes = Math.floor(ct! / 60);
        const ctSeconds = Math.floor(ct! - ctMinutes * 60);

        const DurationMinutes = Math.floor(Duration! / 60);
        const DurationSeconds = Math.floor(Duration! - DurationMinutes * 60);

        setSongTime({progress: ct! / Duration! * 100});
        setTimes({
            duration: `${DurationMinutes}:${DurationSeconds < 10 ? '0' : ''}${DurationSeconds}`,
            current: `${ctMinutes}:${ctSeconds < 10 ? '0' : ''}${ctSeconds}`
        }); 

        if (ct === Duration) {
            HandleNextSong();
        }   
    }
    return (
        <div className='audioPlayer'>
            <div className="allSongs">
                <div className="head_song">
                    <h1>Your songs:</h1>
                </div>
                <div className="songs">
                    {
                        music.map((item) => (
                            <AllSongs  key={item.id} audioData={item.audioData} name={item.name} picture={item.picture} author={item.author} nowPlaying={item.id === currentTrack.id}/>
                        ))
                    }
                </div>
            </div>
            <div className="main_song">
                <DisplayTrack key={currentTrack.id} ref={audioRef} currentTrack={currentTrack.audioData} image={currentTrack.picture} name={currentTrack.name} author={currentTrack.author} onPlaying={onPlaying} />
                <ProgressBar progress={songTime ? songTime : {progress: 0}} />
                <Controls isRepeat={repeat} isShuffle={shuffle} handleShuffle={() => handleShuffle()} handleRepeat={() => handleRepeat()} HandlePlay={HandlePlay} HandlePause={HandlePause} nextHandle={HandleNextSong} prevHandle={HandlePrevSong} durTime={times}/>
            </div>
        </div>
    )
}
export default AudioPlayer;