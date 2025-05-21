export default function Arrows({bottomRef, topRef}){
    const moveDown = ()=>(
        bottomRef.current?.scrollIntoView({behavior: 'smooth'})
    );
    const moveUp = ()=>{
        topRef.current?.scrollIntoView({behavior:'smooth'})
    };
    return (
        <>
        <h1>18. Arrow Functionality</h1>
        <p>The buttons which are floating in this page using for top and bottom navigation</p>
        <p>They are implemented using useRef Hook</p>
        <button
        onClick={moveDown}
        style={{
            position: 'fixed',
            bottom:20
        }}>
        <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5z" />
        </svg>
        </button>
        <button onClick={moveUp} style={{
            position:'fixed',
            bottom: 20,
            right: 20,
        }}>
        <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M7 14l5-5 5 5z" />
        </svg>
        </button>
        </>
    );
}