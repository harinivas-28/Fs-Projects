import { useState, useRef } from "react";

export default function MovingDot(){
    const [pos, setPos] = useState({
        x:0,
        y:0
    });
    const containerRef = useRef(null);
    return (
        <>
        <h1>10. Moving Dot</h1>
        <div
        ref={containerRef}
        onPointerMove={e=>{
            const rect = containerRef.current.getBoundingClientRect();
            setPos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }} 
        style={{position:'relative', width:'80vw', height:'50vh', border:'black solid 1px'}}
        >
            <div
            style={{
                position:'absolute',
                backgroundColor:'red',
                borderRadius: '50%',
                left: pos.x - 10,
                top: pos.y - 10,
                width: 20,
                height:20
            }}></div>
        </div>
        </>
    );
}