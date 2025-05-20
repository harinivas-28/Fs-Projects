import { useState } from "react";

let nextId = 0;
const initialShapes = [
    {id:0, type:'circle', x:50, y:100},
    {id:1, type:'square', x:150, y:100},
    {id:2, type:'circle', x:250, y:100}
];
export default function UpdateInState(){
    const [arr, setArr] = useState([]);
    const [shapes, setShapes] = useState(initialShapes);
    const [inputValue, setInputValue] = useState("");
    const moveCircles = ()=>{
        const nextShapes = shapes.map(sh=>{
            if(sh.type==='square'){
                return sh;
            } else {
                return {
                    ...sh,
                    y: sh.y+50
                };
            }
        });
        setShapes(nextShapes);
    }
    const handleClick = ()=>{
        setArr([
            {id: ++nextId, value: inputValue},
            ...arr
        ]);
        setInputValue("");
    }
    const handleReverse = ()=>{
        const t = [...arr];
        t.reverse();
        setArr(t);
    }
    const handleDelete = (delId)=>{
        setArr(arr.filter(i=>i.id!==delId));
    }
    return (
        <>
        <h1>12. Updating Arrays in State</h1>
        <input
            placeholder="add..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
        />{' '}
        <button onClick={handleClick}>Add</button>{' '}
        <button onClick={handleReverse}>Reverse</button>
        <ul>{arr.length === 0 ? "No Items Added" : arr.map(item => (
            <li key={item.id}>
                {item.value}{' '}
                <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
        ))}</ul>
        <div style={{ position: 'relative', height: 400 }}>
            <button onClick={moveCircles}>Move Circles Down</button>
            {' '}<button onClick={()=>setShapes(initialShapes)}>Reset Shapes</button>
            {shapes.map(sh=>(
                <div key={sh.id}
                style={{
                    width:50,
                    height:50,
                    position:'absolute',
                    background:'purple',
                    borderRadius: sh.type==='circle'?'50%':'',
                    left:sh.x,
                    top:sh.y
                }}
                ></div>
            ))}
        </div>
        </>
    );
}