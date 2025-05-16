const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

export default function ShopList() {
    const listItems = products.map(p=>(
       <li key={p.id} style={{color: p.isFruit ? "magenta" : "darkgreen"}}>{p.title}</li> 
    ));
    return (
      <>
      <h1>4. Rendering Lists</h1>
      <h3>Shopping List</h3>
      <ul>{listItems}</ul>
      </>
    );
}