import { useEffect, useRef, useState } from "react";

const VideoPlayer = ({src, isPlaying})=>{
    const ref = useRef(null);
    useEffect(()=>{
        if(isPlaying){
            ref.current.play();
        } else {
            ref.current.pause();
        }
    }, [isPlaying]);
    return <video width="500" ref={ref} src={src} loop playsInline></video>
}

export default function UseEffectVideoRender(){
    const [isPlaying, setIsPlaying] = useState(false);
    return (
        <>
        <h1>20. Use Effect Hook</h1>
        <button onClick={()=>setIsPlaying(!isPlaying)}>{isPlaying ? "Pause": "Play"}</button><br></br>
        <br></br>
        <VideoPlayer isPlaying={isPlaying} src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"/>
        <br></br>
        </>
    );
}