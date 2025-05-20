import { useMemo } from "react"

export default function  UseMemoHook({patients}){
    const sortedPatients = useMemo(()=>{
        return [...patients].sort((a,b)=>b.age-a.age);
    }, [patients]);
    return (
        <>
        <h1>15. Use Memo Hook</h1>
        <div style={{backgroundColor:'gray', borderRadius:'10px', color:'black'}}>
            <b>useMemo – Why? When? How?</b><br />
            <ul>
                <li>🔶 Why use useMemo?<br />
                    React components re-render often, and during re-renders, functions and computations are re-executed, even if the inputs haven't changed. This can cause performance issues, especially for expensive calculations or rendering large lists.
                </li>
                <li>➡️ useMemo caches the result of a computation and only recalculates it when the dependencies change.
                </li>
                <li>🔶 When to use useMemo?<br />
                    Use useMemo when:
                    <ul>
                        <li>You have expensive calculations in your component.</li>
                        <li>You want to prevent unnecessary re-renders of child components.</li>
                        <li>You are working with filtered/sorted/processed data based on props or state.</li>
                    </ul>
                </li>
            </ul>
        </div>
        {sortedPatients.length>0 && <h4>Patients</h4>}
        <ul>
            {sortedPatients.map((pat)=>{
                return <li key={pat.id}>{pat.name } - {pat.age}</li>
            })}
        </ul>
        </>
    );
}