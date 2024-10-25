import { Profiler, useContext ,  useState } from 'react';

import { Link } from 'react-router-dom';

import Button from './UI/Button.jsx';
import logoImg from '../assets/logo.jpg';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import LoginButton from './LoginButton.jsx';
import LogoutButton from './LogoutButton.jsx';
import { useAuth0 } from "@auth0/auth0-react";


export default function Header() {const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  
  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);
  
  function handleShowCart() {
    userProgressCtx.showCart();
  }
  
  
  const { logout, user, isAuthenticated } = useAuth0();
  const [isActive, setIsActive] = useState(false);
  
  const handleToggle = () => {
    setIsActive(!isActive);
  };
  
  
  return(
      !isAuthenticated ? (
  <header id="main-header">
  <div id="title">
    <img src={logoImg} alt="A restaurant" />
    <h1>Tandoori Club</h1>
  </div>
  <nav>
    <LoginButton/>
    <Button textOnly onClick={handleShowCart}>
      Cart ({totalCartItems})
    </Button>
  </nav>
  </header>) : (
  <header id="main-header">
  <div id="title">
    <img src={logoImg} alt="A restaurant" />
    <h1>Tandoori Club</h1>
  </div>
  <nav>
    
    <article className="column">
          <div className="profile-menu">
            {/* Toggle action */}
            <div className="action" onClick={handleToggle}>
              <img src={user?.picture} alt="Profile" />
            </div>
  
            {/* Menu that toggles visibility */}
            <div className={`menu ${isActive ? "active" : ""}`}>
              <div className="profile">
                <img src={user?.picture} alt="User Profile" />
                <div className="info">
                  <h2>{user?.given_name}</h2>
                </div>
              </div>
  
  
              <Button className="btn" textOnly onClick={handleShowCart}>
                  Cart ({totalCartItems})
              </Button>
  
              <ul>
                <li>
                  <img src="images/setting.png" alt="Settings" />
                  <a href="#">Orders</a>
                    
                </li>
                <li>
                  <img src="images/help.png" alt="Help" />
                  <a href="#">Help</a>
                </li>
                <li>
                  <img src="images/logout.png" alt="Logout" />
                  <a href="#" onClick={()=> logout()}>Log out</a>
                </li>
              </ul>
            </div>
          </div>
        </article>
  </nav>
  </header>)
  
  );
}