import { useState } from "react";

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]
const ProductCategoryRow = ({cat})=>{
    return(
        <tr>
            <th colSpan={2}>
                {cat}
            </th>
        </tr>
    );
}
const ProductRow = ({pro})=>{
    const name = pro.stocked ? pro.name : 
    <span style={{color:'red'}}>{pro.name}</span>
    return (
        <tr>
            <td>{name}</td>
            <td>{pro.price}</td>
        </tr>
    );
}
const ProductTable = ({products, filterText, inStockOnly})=>{
    const rows = [];
    let lastCategory = null;
    products.forEach(p=>{
        if(p.name.toLowerCase().indexOf(filterText.toLowerCase())===-1){
            return;
        }
        if(inStockOnly&&!p.stocked){
            return;
        }
        if(p.category!==lastCategory){
            rows.push(
                <ProductCategoryRow cat={p.category} key={p.category}/>
            );
        }
        rows.push(
            <ProductRow pro={p}
            key={p.name}/>
        );
        lastCategory = p.category;
    });
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}
const SearchBar = ({filterText, inStockOnly, onFilterChange, onInStockChange})=>{
    return (
        <form>
        <input type="text" 
        value={filterText} placeholder="Search..."
        onChange={(e)=>onFilterChange(e.target.value)}
        ></input>
        <br></br>
        <label><input type="checkbox"
        checked={inStockOnly}
        onChange={(e)=>onInStockChange(e.target.checked)}
        ></input>Only Show Products in Stock</label>
        </form>
    );
}
export default function Ecommerce(){
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);
    return (
        <div className="product-table">
        <h1>8. Ecommerce Example</h1>
        <SearchBar filterText={filterText} inStockOnly={inStockOnly} onFilterChange={setFilterText} onInStockChange={setInStockOnly}/>
        <ProductTable products={PRODUCTS} filterText={filterText} inStockOnly={inStockOnly}/>
        </div>
    );
}