import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

// Contexts
import { ProductContext } from './contexts/ProductContext';
import { CartContext } from './contexts/CartContext';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState(() => {
		const item = localStorage.getItem('localCart');
		return item ? JSON.parse(item) : [];
	});

	useEffect(() => {
		localStorage.setItem('localCart', JSON.stringify(cart));
	}, [cart])

	const addItem = item => {
		setCart([...cart, item]);
	};

	const removeItem = (id) => {
		setCart([...cart].filter(item => item.id !== id));
	}

	return (
		<div className="App">
			<ProductContext.Provider value={{ products, addItem, removeItem }}>
				<CartContext.Provider value={cart}>
					<Navigation />

					{/* Routes */}
					<Route
						exact
						path="/"
						component={Products}
					/>

					<Route
						path="/cart"
						component={ShoppingCart}
					/>
				</CartContext.Provider>
			</ProductContext.Provider>
		</div>
	);
}

export default App;
