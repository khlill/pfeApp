import React, { useState , Fragment } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './NavbarAdmin.css';
import { IconContext } from 'react-icons';
import { connect } from 'react-redux';
import { logout } from '../../actions/action.auth';
import{ Button }from '../button'


function NavbarAdmin({ isAuthenticated, logout }) {
  const [sidebar, setSidebar] = useState(false);


  const showSidebar = () => setSidebar(!sidebar);

  const guestLinks = (
    <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars id="barsadmin" onClick={showSidebar} />
          </Link>
        </div>
        <nav id="menu" className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li id="toggle" className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <a href="/" style={{fontWeight:"600"}}>Acceuil</a><br/><br/>
            <a href="/a1d2m0i5n" style={{color:"#fff"}}>Veuillez vous connecter !</a>
          </ul>
        </nav>
      </IconContext.Provider>
  );
  const authorizedLinks = (
    <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars id="barsadmin" onClick={showSidebar} />
          </Link>
        </div>
        <nav id="menu" className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li id="toggle" className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
        <li id="navMobile" class="nav-item">
          <Link style={{color:"black"}} class="nav-links-mobile" onClick={logout} to="/a1d2m0i5n"><Button>Déconnexion</Button></Link>
        </li>
          </ul>
        </nav>
      </IconContext.Provider>
  );
  return (
  
       <div>
      <nav>
        <ul>
          <li>
          </li>
          {
            <Fragment>
              {isAuthenticated ? authorizedLinks : guestLinks}
            </Fragment>
          }
        </ul>
      </nav>
    </div>
 
  );
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { logout })(NavbarAdmin);
