import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

const img = (text, bg) =>
  `https://placehold.co/300x300/${bg}/ffffff?text=${encodeURIComponent(text)}`; // swap for real plant photos

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: img('Snake Plant', '2e7d32'), description: 'Produces oxygen at night and removes toxins.', cost: 15 },
      { name: 'Spider Plant', image: img('Spider Plant', '388e3c'), description: 'Filters formaldehyde and xylene from the air.', cost: 12 },
      { name: 'Peace Lily', image: img('Peace Lily', '43a047'), description: 'Removes mold spores and purifies the air.', cost: 18 },
      { name: 'Boston Fern', image: img('Boston Fern', '4caf50'), description: 'Naturally humidifies and cleans indoor air.', cost: 20 },
      { name: 'Rubber Plant', image: img('Rubber Plant', '1b5e20'), description: 'Absorbs airborne chemicals and bacteria.', cost: 17 },
      { name: 'Aloe Vera', image: img('Aloe Vera', '66bb6a'), description: 'Purifies air and soothes burns and cuts.', cost: 14 },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: img('Lavender', '7e57c2'), description: 'Calming scent that promotes sleep and relaxation.', cost: 20 },
      { name: 'Jasmine', image: img('Jasmine', '9575cd'), description: 'Sweet floral fragrance that lifts the mood.', cost: 18 },
      { name: 'Rosemary', image: img('Rosemary', '5e35b1'), description: 'Fresh herbal aroma, great for cooking too.', cost: 15 },
      { name: 'Mint', image: img('Mint', '26a69a'), description: 'Refreshing scent that repels pests.', cost: 12 },
      { name: 'Lemon Balm', image: img('Lemon Balm', '9ccc65'), description: 'Citrusy scent that reduces stress.', cost: 14 },
      { name: 'Gardenia', image: img('Gardenia', 'ab47bc'), description: 'Rich, creamy blooms with a strong perfume.', cost: 22 },
    ],
  },
  {
    category: 'Low-Maintenance Succulents',
    plants: [
      { name: 'Jade Plant', image: img('Jade Plant', '00897b'), description: 'Symbol of good luck, very easy to grow.', cost: 16 },
      { name: 'Echeveria', image: img('Echeveria', '26a69a'), description: 'Rosette-shaped succulent that needs little water.', cost: 10 },
      { name: 'Haworthia', image: img('Haworthia', '00796b'), description: 'Compact, striped succulent for small spaces.', cost: 11 },
      { name: 'Burro\'s Tail', image: img('Burros Tail', '4db6ac'), description: 'Trailing stems, perfect for hanging pots.', cost: 18 },
      { name: 'Zebra Cactus', image: img('Zebra Cactus', '009688'), description: 'Striking white stripes, thrives on neglect.', cost: 13 },
      { name: 'String of Pearls', image: img('String of Pearls', '80cbc4'), description: 'Bead-like leaves that cascade beautifully.', cost: 19 },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem({ name: plant.name, image: plant.image, cost: plant.cost }));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand" onClick={onHomeClick}>
          <span className="brand-name">Paradise Nursery</span>
        </div>
        <div className="navbar-links">
          <a href="#home" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>Home</a>
          <a href="#plants" onClick={(e) => { e.preventDefault(); setShowCart(false); }}>Plants</a>
          <a href="#cart" className="cart-link" onClick={(e) => { e.preventDefault(); setShowCart(true); }}>
            <span className="cart-icon" role="img" aria-label="cart">🛒</span>
            <span className="cart-count">{totalQuantity}</span>
          </a>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((group) => (
            <section key={group.category}>
              <h2 className="category-title">{group.category}</h2>
              <div className="product-list">
                {group.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <h3 className="product-title">{plant.name}</h3>
                    <p className="product-description">{plant.description}</p>
                    <p className="product-price">${plant.cost}</p>
                    <button
                      className="product-button"
                      disabled={isInCart(plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
