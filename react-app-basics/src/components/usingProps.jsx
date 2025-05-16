import { useState } from "react";

function MyButton({cnt, onClick}){
    return(
        <button onClick={onClick}>Count: {cnt}</button>
    );
}

export default function Props(){
    const [cnt, setCnt] = useState(0);
    const handleClick = ()=>{
        setCnt(cnt+1);
    }
    return(
        <>
        <h2>6.2 Using Props</h2>
        <MyButton cnt={cnt} onClick={handleClick}/>
        <MyButton cnt={cnt} onClick={handleClick}/>
        <MyButton cnt={cnt} onClick={handleClick}/>
        </>
    );
}