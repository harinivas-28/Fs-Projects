import { useState } from "react";

function Square({value, onSquareClick}){
    return(
        <button className="square" onClick={onSquareClick}>{value}</button>
    );
}

const winner = (sqrs)=>{
    const lines = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    for(let i=0;i<lines.length;i++){
        const [a,b,c] = lines[i];
        if(sqrs[a] && sqrs[a]===sqrs[b] && sqrs[a]===sqrs[c]){
            return sqrs[a];
        }
    }
    return null;
}
export default function Board(){
    const [stat, setStat] = useState("Next Turn: X");
    const [xisNext, setXIsNext] = useState(true);
    const [sqrs, setSqrs] = useState(Array(9).fill(null));
    const handleStat = ()=>{
        const win = winner(sqrs);
        if(win){
            setStat(`Winner: ${win}`);
        } else {
            setStat(`Next Turn: ${(xisNext) ? 'O' : 'X'}`)
        }
    }
    const handleClick = (i)=>{
        handleStat();
        if(sqrs[i] || winner(sqrs)) return;
        const nextSqrs = sqrs.slice();
        if(xisNext){
            nextSqrs[i] = 'X';
        } else {
            nextSqrs[i] = 'O';
        }
        setSqrs(nextSqrs);
        setXIsNext(!xisNext);
    }
    const handleReset = ()=>{
        setSqrs(Array(9).fill(null));
    }
    return(
        <>
        <p>{stat}</p>
        <div className="board-row">
            <Square value={sqrs[0]} onSquareClick={()=>handleClick(0)}/>
            <Square value={sqrs[1]} onSquareClick={()=>handleClick(1)}/>
            <Square value={sqrs[2]} onSquareClick={()=>handleClick(2)}/>
        </div>
        <div className="board-row">
            <Square value={sqrs[3]} onSquareClick={()=>handleClick(3)}/>
            <Square value={sqrs[4]} onSquareClick={()=>handleClick(4)}/>
            <Square value={sqrs[5]} onSquareClick={()=>handleClick(5)}/>
        </div>
        <div className="board-row">
            <Square value={sqrs[6]} onSquareClick={()=>handleClick(6)}/>
            <Square value={sqrs[7]} onSquareClick={()=>handleClick(7)}/>
            <Square value={sqrs[8]} onSquareClick={()=>handleClick(8)}/>
        </div>
        <button onClick={handleReset}>Reset Game</button>
        </>
    );  
}