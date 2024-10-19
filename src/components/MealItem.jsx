import { useContext, useState } from 'react';
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);
  const [isAnimating, setIsAnimating] = useState(false); // State for animation

  function handleAddMealToCart() {
    cartCtx.addItem(meal);
    setIsAnimating(true); // Trigger the animation

    // Remove animation class after a short delay
    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match this with the duration of your CSS animation
  }

  return (
    <li className={`meal-item ${isAnimating ? 'animate' : ''}`}>
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddMealToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
