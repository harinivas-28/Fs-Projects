import React, { useRef, useState } from "react";
import { SyncLoader } from "react-spinners";
export default function UseRefTime(){
    const [startTime, setStartTime] = useState(null);
    const [pause, setPause] = useState(false);
    const [now, setNow] = useState(null);
    const [pauseTime, setPauseTime] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const vidRef = useRef(null);
    const interval = useRef(null);
    const handlePlay = ()=>{
        const nextIsPlaying = !isPlaying;
        setIsPlaying(nextIsPlaying);
        if(nextIsPlaying){
            vidRef.current.play();
        } else {
            vidRef.current.pause();
        }
    }
    const handleStart = ()=>{
        setStartTime(Date.now());
        setNow(Date.now());
        clearInterval(interval.current);
        interval.current = setInterval(()=>{
            setNow(Date.now());
        }, 10);
    }
    const handlePause = ()=>{
        if(startTime!=null && now!=null){
            setPause(true);
            setPauseTime(Date.now());
            clearInterval(interval.current);
        }
    }
    const handleCont=()=>{
        if(pause && pauseTime!=null && startTime!=null && now!=null){
            const pausedDuration = Date.now()-pauseTime;
            setStartTime(prev=>prev+pausedDuration);
            setPause(false);
            clearInterval(interval.current);
            interval.current = setInterval(()=>{
                setNow(Date.now());
            }, 10);
        }
    }
    const handleReset=()=>{
        setStartTime(null);
        setNow(null);
        setPause(false);
        setPauseTime(null);
        clearInterval(interval.current);
    }
    let sec = 0;
    if(startTime!=null && now!=null){
        sec = (now-startTime)/1000;
    }
    return (
        <>
        <h1>19. useRef Hook</h1>
        <h3>Time: {sec.toFixed(3)}</h3>
        <button onClick={handleStart}>Start</button>{' '}
        {pause ? <button onClick={handleCont}>Continue</button> 
        : <button onClick={handlePause}>Pause</button>}{' '}
        <button onClick={handleReset}>Reset</button><br></br>
        <a href="https://react.dev/learn/referencing-values-with-refs">Learn useRef</a>
        <br></br>
        <br></br>
        <button onClick={handlePlay}>{isPlaying ? "Pause":"Play"} Video</button>
        <br></br>
        <br></br>
        <video
            width="500"
            ref={vidRef}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
        >
            <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4" />
        </video>
        <br></br>
        <a href="https://react.dev/learn/manipulating-the-dom-with-refs">Best practices for DOM manipulation with refs</a>
        </>
    );
}