import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function UseContext(){
    const {user,login, logout} = useContext(AuthContext);
    return (
        <div>
            <h1>16. Use Context</h1>
            {user!==null ? (
                <>
                <h2>Welcome, {user.name}</h2>
                <button onClick={logout}>Logout</button>
                </>
            ):(
                <button
                onClick={()=>login({name:"Dr. Smith", role:"Doctor"})}
                >Login as Dr.Smith</button>
            )}
            <h5>The Change Theme is also made up of using useContext Hook</h5>
        </div>
    );
}