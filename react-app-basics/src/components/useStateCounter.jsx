import { useState } from "react";

export default function Counter(){
    const [cnt, setCnt] = useState(0);
    const handleClick = ()=>{
        setCnt(cnt+1);
    }
    return (
        <>
        <h1>6. Using Hooks</h1>
        <h2>6.1 Use State</h2>
        <p>Functions starting with use are called Hooks.</p>
        <p>Hooks are more restrictive than other functions.</p>
        <p>Count: {cnt}</p>
        <button onClick={handleClick}>Click Here</button>
        </>
    );
}