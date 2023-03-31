import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Products } from './pages/products';
import './App.css';
import { useState, useEffect } from 'react';
import { ProductContext } from './hooks/product-context';
import { EditProduct } from './pages/edit-product';
import { getProducts } from './api/get-products';
import { AddProduct } from './pages/add-product';

let isInitialized = false;

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log('hello');
    if (isInitialized) {
      console.log('not first time');
      return;
    }
    console.log('first time');

    isInitialized = true;

    const fetchProducts = async () => {
      const response = await getProducts();

      setProducts(response);
    };

    fetchProducts();
  }, [setProducts]);

  return (
    <div className="App">
      <BrowserRouter>
        <ProductContext.Provider
          value={{
            products,
            setProducts,
          }}
        >
          <Routes>
            <Route exact path="/" element={<Products />} />
            <Route exact path="/new-product" element={<AddProduct />} />
            <Route path="/edit-product/:productId" element={<EditProduct />} />
          </Routes>
        </ProductContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
