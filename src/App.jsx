import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import Header from './components/Header.jsx';
import Meals from './components/Meals.jsx';
import { CartContextProvider } from './store/CartContext.jsx';
import { UserProgressContextProvider } from './store/UserProgressContext.jsx';
import SuccessPage from './components/success.jsx';
import BackendPage from './components/BackendPage.jsx';
import Navbar from './components/NewHeader.jsx';
import CoverDemo from './components/Design/SecondHeader.jsx'
import TracingBeam from './components/Beam'
import Effect from './components/Effect'
import { FollowerPointerCard } from "./components/following-pointer";
import ExpandableCardDemo from './components/expandablecard';
import FlipWords from './components/Flipwords';


// Define your routes
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <CoverDemo />
        <Meals />
      </>
    ),
  },
  {
    path: '/success',
    element: <SuccessPage />,
  },
  {
    path: '/backends',
    element: (
    <>
    <Header />
    <BackendPage />
    </>),
  },
  {
    path: '/explain',
    element: (
      <>
      <Navbar /> 
      <Effect />
      <TracingBeam />
      <FlipWords/>
      <ExpandableCardDemo />
      </>
    )
  }
]);

function App() {

  

  return (
    <UserProgressContextProvider>
      <CartContextProvider>
      <FollowerPointerCard 
      >
        {/* Main Content */}
        <div>
          <RouterProvider router={router} />
          <Cart />
          <Checkout />
        </div>

      </FollowerPointerCard>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
