import { useContext, useState } from 'react';
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';
import './MealItem.css';

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  function handleAddMealToCart() {
    cartCtx.addItem(meal);
    setIsAnimating(true);
    setIsAddedToCart(true);

    setTimeout(() => {
      setIsAnimating(false);
      setIsAddedToCart(false);
    }, 1000);
  }

  return (
    <li>
      <div className={`nft ${isAnimating ? 'pop-effect' : ''}`}>
        <div className="main">
          <article>
            <img
              className="tokenImage"
              src={`http://localhost:3000/${meal.image}`}
              alt={meal.name}
            />
            <h2>{meal.name}</h2>
            <p className="description">{meal.description}</p>
            <div className="tokenInfo">
              <p className="price">{currencyFormatter.format(meal.price)}</p>
              <div className="duration">
                <ins>◷</ins>
                <p>20-30 min</p>
              </div>
            </div>

            <hr />
            <div className="creator" onClick={handleAddMealToCart}>
              <div className="wrapper">
                <img
                  src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
                  alt="Creator"
                />
              </div>
              <p>
                <ins>{isAddedToCart ? 'Added to' : 'Add to'}</ins> Cart
              </p>
            </div>
          </article>
        </div>
      </div>
    </li>
  );
}
