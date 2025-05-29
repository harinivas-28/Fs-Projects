import axios from "axios";
import { useState, useEffect } from "react";

export default function ShowProfiles(){
    const [data, setData] = useState(null);
    const [msg, setMsg] = useState(null);
    const [visible, setIsVisible] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);

    const fetchData = async()=>{
        try {
            const response = await axios.get('http://localhost:5000/profiles');
            setData(response.data);
        } catch(err){
            console.log("Error Fetching data: "+err);
            setMsg("Error Fetching data");
        }
    };
    const handleCancel = ()=>{
        setIsVisible(false);
        setSelectedProfile(null);
    }
    const handleClick = (p)=>{
        setSelectedProfile(p);
        setIsVisible(true);
    }
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
                <button onClick={() => handleClick(p)}>{">"}</button>
                </div>;
        })}
        {visible && selectedProfile && (
            <div className="profile-details-modal">
                <button onClick={handleCancel}>X</button>
                <h3>Personal Info</h3>
                <p>Email: {selectedProfile.personalinfo?.email}</p>
                <p>Phone: {selectedProfile.personalinfo?.phone}</p>
                <br />
                <h3>Education</h3>
                <p>Degree: {selectedProfile.education?.degree}</p>
                <p>Institution: {selectedProfile.education?.institution}</p>
                <p>Year: {selectedProfile.education?.year}</p>
                <br />
                <h3>Interests</h3>
                {selectedProfile.interests && selectedProfile.interests.map((inte, i)=>{
                    return <p key={i}>{inte}</p>;
                })}
                <h3>Achievements</h3>
                {selectedProfile.achievements && selectedProfile.achievements.map((ach, i)=>{
                    return <p key={i}>{ach}</p>;
                })}
            </div>
        )}
        </>
    );
}