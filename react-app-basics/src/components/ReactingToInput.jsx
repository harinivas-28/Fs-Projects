import { useState } from "react";

export default function ReactingToInput(){
    const [ans, setAns] = useState('');
    const [status, setStatus] = useState('typing');
    const handleChange = (val)=>{
        setAns(val);
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        setStatus('submitting');
        if(ans==='istanbul'){
            setStatus('success');
        } else {
            setStatus('error');
        }
    }
    if(status==='success'){
        return (<>
        <h1>13. Reacting to Input with State</h1>
        <p>Which city is located on two continents?</p>
        <h3>That's Right!</h3>
        </>)
    } else {
        return(
            <>
            <h1>13. Reacting to Input with State</h1>
            <p>Which city is located on two continents?</p>
            <form onSubmit={handleSubmit}>
                <textarea onChange={(e)=>handleChange(e.target.value)}></textarea><br></br>
                <button type="submit"
                disabled={
                    status==='submitting' ||
                    status==='empty'
                }
                >Submit</button>
            </form>
            {status==='error' && <p style={{color:'red'}}>Good guess! But Wrong try again</p>}
            </>
        );
    }
}