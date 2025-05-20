import { useContext } from "react";
import { AuthContext } from "./createAuthContext";

export default function UseComp(){
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
        </div>
    );
}