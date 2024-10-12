import logoImg from '../assets/logo.jpg';

export default function Header(){
    return(
        <header id="main-header"> 
            <div id="title">
                <img sec={logoImg} alt='a restorent'/>
                <h1>My Blog</h1>
            </div>
            <nav>
                <button>Carty {0}</button>
            </nav>
        </header>
    )
}