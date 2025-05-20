import { useReducer, useState } from "react";
import tasksReducer from "./tasksReducer";

let nextId = 3;
const initialTasks = [
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];
const Task = ({task, dispatch})=>{
    const [edit, setEdit] = useState(false);
    const [changeText, setChangeText] = useState(task.text);
    const [done, setDone] = useState(task.done);
    const handleChangeText=(e)=>{
        setChangeText(e.target.value);
    }
    const handleDelete=()=>{
        dispatch({
            type: 'deleted',
            id:task.id,
        });
    }
    const handleEdit=()=>{
        dispatch({
            type: 'changed',
            id: task.id, 
            text: changeText,
            done: done,
        });
        setEdit(false);
    }
    return (
        <div style={{display:'flex', justifyContent:'space-evenly', margin:'3px'}}>
            <input type="checkbox" checked={done} onChange={()=>setDone(!done)}></input>
            {edit ?
                <>
                <input value={changeText} onChange={handleChangeText}></input>
                <button 
                    onClick={handleEdit} 
                    style={{ backgroundColor: 'green', color: 'white' }}
                >
                    Submit
                </button>
                </>
                :
                <>
                <p>{task.text}</p>
                <button 
                    onClick={()=>setEdit(true)} 
                    style={{ backgroundColor: 'blue', color: 'white' }}
                >
                    Edit
                </button>
                </>
            }
            <button 
                onClick={handleDelete} 
                style={{ backgroundColor: 'red', color: 'white' }}
            >
                Delete
            </button>
        </div>
    );
}
export default function UseReducerTasks(){
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
    const [inp, setInp] = useState("");
    const handleInputChange = (e)=>{
        setInp(e.target.value);
    }
    const handleAdd= ()=>{
        dispatch({
            type:'added',
            id:nextId++,
            text:inp,
        });
        setInp("");
    }
    return (
        <>
        <h1>14. Use Reducer Hook</h1>
        <h5>Using Custom reducer function</h5>
        <h2>Iternery Planner</h2>
        <input placeholder="Add task" value={inp} onChange={handleInputChange}></input>{' '}
        <button onClick={handleAdd}
        style={{ backgroundColor: 'green', color: 'white' }}
        >Add</button><br></br>
        {tasks.map(task=>{
            return <Task key={task.id} task={task} dispatch={dispatch}/>
        })}
        <a href="https://react.dev/learn/extracting-state-logic-into-a-reducer">Learn Reducer</a>
        </>
    );
}