import axios from "axios";
import { useState, useEffect } from "react";

export default function ShowProfiles(){
    const [data, setData] = useState(null);
    const [msg, setMsg] = useState(null);
    const fetchData = async()=>{
        try {
            const response = await axios.get('http://localhost:5000/profiles');
            setData(response.data);
        } catch(err){
            console.log("Error Fetching data: "+err);
            setMsg("Error Fetching data");
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
        <h1>All Profiles</h1>
        {msg && <p>{msg}</p>}
        {data && data.map((p, idx)=>{
            return <div className="profile-name" key={idx}>
                <h3>{p.personalinfo?.name || "No Name"}</h3>
                <p>{p.personalinfo?.email}</p>
                </div>;
        })}
        </>
    );
}