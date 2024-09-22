import React from 'react';
import logo_white from "../assets/img/logo-white.png"

const Header = ({ user }) => {
  return (
    <header className="header">
      <nav className="nav nav--tours">
        <a href="/" className="nav__el">All tours</a>
      </nav>
      <div className="header__logo">
        <img src={logo_white} alt="Natours logo" />
      </div>
      <nav className="nav nav--user">
        {user ? (
          <>
            <a className="nav__el nav__el--logout">Log out</a>
            <a href="/me" className="nav__el">
              <img
                src={`../assets/img/users/${user?.photo}`}
                alt={`Photo of ${user?.name}`}
                className="nav__user-img"
              />
              <span>{user?.name.split(' ')[0]}</span>
            </a>
          </>
        ) : (
          <>
            <a href="/login" className="nav__el">Log in</a>
            <a href="/signup" className="nav__el nav__el--cta">Sign up</a>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
