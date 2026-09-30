import { useEffect, useState } from 'react'

import './App.css';

interface Product{
   id: number;
    title:string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    }

}

type SortOrder = "asc" | "desc";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect( () =>{

    const fetchProduct = async () =>{
      try{

        setLoading(true);
        setError("");
        const URL = `https://fakestoreapi.com/products?sor${sortOrder}`;
        console.log("URL: ", URL);
        const response = await fetch(URL);
        if(!response.ok){
          throw new Error("Unable to fetch products")
        }
        const data: Product[] = await response.json();
        setProducts(data);


      } catch(error){
        setError("Unable to fetch product");
      }finally{
        setLoading(false);
      }


    };
    fetchProduct();
  },[sortOrder]);

  const handleSortOrder = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortOrder(event.target.value as SortOrder)
  };

  return (
    <>
    <div className='container'>
      <h1>Product List</h1>
      <div>
        <label>Sort by Price: </label>
        <select id='sort' value={sortOrder} onChange={handleSortOrder}>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      
      {/* Loading */}

      {loading && <p>Loading products...</p>}

      {/* Error handling */}
      {error && (
        <p style={{ color: "red"}}> {error} </p>
      )}

      {/* Products */}

      <div>
        {products.map(
          (product) => (

            <div key={product.id} style={{
              border: "1px solid #ddd",
              padding: "15px",
              margin: "10px 0"
            }}>

              <img src={product.image} alt={product.title} width="60" />
              <h3>{product.title}</h3>
              <p>
                <strong>
                Price: {product.price}
                </strong>
              </p>

              <p>Category: {product.category}</p>
              <p>Rating: 
                <strong>
                  {product.rating.rate}
                </strong>
              </p>
            </div>

          )

        )}



      </div>






    </div>
      
    </>
  )
}

export default App
