import MealItem from './CardBack.jsx';
import useHttp from '../hooks/useHttp.js';
import Error from './Error.jsx';

const requestConfig = {};

export default function Meals() {
  const {
    data: loadedOrders,
    isLoading,
    error,
  } = useHttp('http://localhost:3000/orderget', requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <ul className="orders-list">
      {loadedOrders.length ? (
        loadedOrders.map((order) => (
          <li key={order.id} className="order-item">
            {/* Customer Info */}
            <div className="customer-info">
              <img
                className="customer-avatar"
                src="https://via.placeholder.com/50"
                alt="Customer Avatar"
              />
              <div className="customer-details">
                <h3>{order.customer.name}</h3>
                <p>Hostel: {order.customer.street}</p>
                <p>Room: {order.customer.hostelNumber}</p>
              </div>
            </div>

            {/* Ordered Items */}
            <div className="order-items">
              {order.items.map((meal) => (
                <div key={meal.id} className="meal-item">
                  <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
                  <h4>{meal.name}</h4>
                  <p>{meal.description}</p>
                </div>
              ))}
            </div>
          </li>
        ))
      ) : (
        <p>No meals found.</p>
      )}
    </ul>
  );
}
