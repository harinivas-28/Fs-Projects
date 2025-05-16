export default function MyButton(){
    const handleClick = ()=>{
        alert("Button Clicked");
    }
    return(
        <>
        <h1>5. Responding to Events</h1>
        <button onClick={handleClick}>Click Button</button>
        </>
    );
}