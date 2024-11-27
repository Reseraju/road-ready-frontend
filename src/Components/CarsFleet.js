import React, { useEffect, useState } from 'react'
import FleetCard from './Fleet';
import '../css/CarsFleet.css';

export default function CarsFleet() {
    let [name, setName] =useState();
    let [price,setPrice]=useState();
    let [image,setImage]=useState();
    let [description,setDescription]=useState();
    let [category,setCategory]=useState();
    let [rating,setRating]=useState();
    const [products, setProducts] =useState([])
    let [fproducts, setFproducts] = useState([])
    let [search, setSearch] = useState("")
  
    useEffect(()=>setFproducts(products.filter((temp)=>
      temp.title.toLowerCase().includes(search.toLowerCase()) ||
      temp.description.toLowerCase().includes(search.toLowerCase()) ||
      temp.category.toLowerCase().includes(search.toLowerCase()) ||
      temp.price.toString().includes(search)
  
    )),[search])
  
    useEffect(()=>{
      fetch('https://fakestoreapi.com/products')
      .then((res)=>res.json())
      .then((temp)=>setProducts(temp))
      .catch((e)=>console.log(e))
    },[])
  
    const addItem=()=>{
      let item = {name, price, description, category, image, rating: {
        rate: parseFloat(rating) || 0, 
        count: 0,
      },}
      setProducts([item,...products])
    }
  
    const removeItem=(id)=>{
      setProducts(products.filter((temp)=>temp.id!==id))
    }
  
    const updateItem = (id, price) => {
      const updatedProducts = products.map((temp) => {
        if (temp.id === id) {
          return { ...temp, price: price };
        }
        return temp;
      });
      setProducts(updatedProducts);
    };
  
    return (
      <div className="App">
          <br /><br />
          <div className='search-container'>
            <input
                className='search-input'
                type="text"
                placeholder='Search products...'
                onChange={(e) => setSearch(e.target.value)}
            />
         </div>
  
          {/* <div className='div1'>
            <input type="text" placeholder='Enter product name' onChange={(e)=>setName(e.target.value)}/>
            <input type="text" placeholder='Enter price' onChange={(e)=>setPrice(e.target.value)}/>
            <input type="text" placeholder='Enter image url' onChange={(e)=>setImage(e.target.value)}/>
            <input type="text" placeholder='Enter product description' onChange={(e)=>setDescription(e.target.value)}/>
            <input type="text" placeholder='Enter product Category' onChange={(e)=>setCategory(e.target.value)}/>
            <input type="text" placeholder='Enter product rating' onChange={(e)=>setRating(e.target.value)}/> <br />
            <button onClick={addItem}>add item</button>
          </div> */}
          
          <div className='fleets'>
            {
              search.length>0?
              fproducts.map((temp)=> <FleetCard id={temp.id} title={temp.title} price={temp.price} description={temp.description} category={temp.category} image={temp.image} rating={temp.rating} removeItem={removeItem} updateItem={updateItem}/>)
              :
              products.map((temp)=> <FleetCard id={temp.id} title={temp.title} price={temp.price} description={temp.description} category={temp.category} image={temp.image} rating={temp.rating} removeItem={removeItem} updateItem={updateItem} />)
            }
          </div>

      </div>
    );
}
