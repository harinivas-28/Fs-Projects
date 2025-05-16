import { redirect } from "react-router-dom";

export default function Render(){
    let isLoggedIn = true;
    return (
        <div>
            <h1>3. Conditional Rendering</h1>
            <p>Log Info: {isLoggedIn ? "Logged-In":"Logged-out"}</p>
            {/* {isLoggedIn ? redirect("/") : redirect("/login")} */}
        </div>
    );
}