import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import Header from './components/Header.jsx';
import Meals from './components/Meals.jsx';
import { CartContextProvider } from './store/CartContext.jsx';
import { UserProgressContextProvider } from './store/UserProgressContext.jsx';
import SuccessPage from './components/SuccessPage.jsx';
import BackendPage from './components/BackendPage.jsx';

// Define your routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Meals />,
  },
  {
    path: '/success',
    element: <SuccessPage />, // Replace with your actual Success Page component
  },
  {
    path: '/backends',
    element: <BackendPage />, // Replace with your actual Backend Page component
  }
]);

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <RouterProvider router={router} />
        <Cart />
        <Checkout/>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
