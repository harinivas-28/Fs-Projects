import { useState } from "react";

export default function Snapshot(){
    const [canWalk, setCanWalk] = useState(true);
    const handleClick = ()=>{
        setCanWalk(!canWalk);
    }
    return (
        <>
        <h1>9. State as a Snapshot</h1>
        <button onClick={handleClick}>Change to {canWalk?"Stop":"Walk"}</button>
        <h3 style={{color: canWalk ? 'darkgreen' :'darkred'}}>{canWalk?"Walk":"Stop"}</h3>
        </>
    );
}