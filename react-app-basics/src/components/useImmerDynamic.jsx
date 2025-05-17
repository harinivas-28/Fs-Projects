import { useImmer } from "use-immer";
export default  function DynamicUpdate(){
    const [person, setPerson] = useImmer({
        name: 'Niki de Saint Phalle',
        artwork: {
            title: 'Blue Nana',
            city: 'Hamburg',
            image: 'https://i.imgur.com/Sd1AgUOm.jpg',
        }
    });
    const handleChangeName = (e)=>{
        setPerson(p=>{
            p.name=e.target.value
        });
    }
    const handleTitleChange = (e)=>{
        setPerson(p=>{
            p.artwork.title=e.target.value
        });
    }
    const handleCityChange = (e)=>{
        setPerson(p=>{
            p.artwork.city=e.target.value
        });
    }
    const handleImageUrl = (e)=>{
        setPerson(p=>{
            p.artwork.image=e.target.value
        });
    }
    return (
        <>
        <h1>11. Use Immer Hook</h1>
        <label>Name: <input
        onChange={handleChangeName}
        value={person.name}
        ></input></label><br></br>
        <label>Title: <input
        onChange={handleTitleChange}
        value={person.artwork.title}
        ></input></label><br></br>
        <label>City: <input
        onChange={handleCityChange}
        value={person.artwork.city}
        ></input></label><br></br>
        <label>Image: <input
        onChange={handleImageUrl}
        value={person.artwork.image}
        ></input></label><br></br>
        <p>{person.artwork.title}{' by '}{person.name}{' '}<br></br>(located in {person.artwork.city})</p>
        <img src={person.artwork.image}></img>
        </>
    );
}