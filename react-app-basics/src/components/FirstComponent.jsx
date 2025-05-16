const FirstComponent = ()=>{
    return (
        <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson"></img>
    );
}
export default function Gallery() {
    return (
        <section>
            <h1>1. First Component</h1>
            <h3>Amazing scientists</h3>
            <FirstComponent/>
            <FirstComponent/>
            <FirstComponent/>
        </section>
    );
}