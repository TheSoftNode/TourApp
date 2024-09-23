import React, { useState } from 'react';

import useGetProfile from "../hooks/useFetchData"
import { BASE_URL } from '../config';
import Loading from '../components/Loader/Loading';
import ErrorPage from './Error';

const UserSettings = () =>
{

  // const [profileKey, setProfileKey] = useState(Date.now());

  const { data: userData, loading, error } = useGetProfile(`${BASE_URL}/users/me`);
  const user = userData?.data?.data;


  // const refreshProfile = () =>
  // {
  //   setProfileKey(prevKey => prevKey + 1); // Update the key to force a refresh
  // };


  const navItem = (link, text, icon, active) => (
    <li className={active ? 'side-nav--active' : ''}>
      <a href={link}>
        <svg>
          <use xlinkHref={`img/icons.svg#icon-${icon}`} />
        </svg>
        {text}
      </a>
    </li>
  );

  return (
    <main className="main">
      {loading && !error && <Loading />}

      {error && !loading && <ErrorPage errMessage={error} />}

      {
        !loading && !error && (
          <div className="user-view">
            <nav className="user-view__menu">
              <ul className="side-nav">
                {navItem('#', 'Settings', 'settings', true)}
                {navItem('/my-tours', 'My bookings', 'briefcase')}
                {navItem('#', 'My reviews', 'star')}
                {navItem('#', 'Billing', 'credit-card')}
              </ul>

              {user?.role === 'admin' && (
                <div className="admin-nav">
                  <h5 className="admin-nav__heading">Admin</h5>
                  <ul className="side-nav">
                    {navItem('#', 'Manage tours', 'map')}
                    {navItem('#', 'Manage users', 'users')}
                    {navItem('#', 'Manage reviews', 'star')}
                    {navItem('#', 'Manage bookings', 'briefcase')}
                  </ul>
                </div>
              )}
            </nav>

            <div className="user-view__content">
              <div className="user-view__form-container">
                <h2 className="heading-secondary ma-bt-md">Your account settings</h2>

                {/* Uncomment this block for API integration */}
                {/* <form className="form form-user-data" action="/submit-user-data" method="POST" encType="multipart/form-data"> */}

                {/* With API */}
                <form className="form form-user-data">
                  <div className="form__group">
                    <label className="form__label" htmlFor="name">Name</label>
                    <input
                      id="name"
                      className="form__input"
                      type="text"
                      defaultValue={user?.name}
                      required
                      name="name"
                    />
                  </div>
                  <div className="form__group ma-bt-md">
                    <label className="form__label" htmlFor="email">Email address</label>
                    <input
                      id="email"
                      className="form__input"
                      type="email"
                      defaultValue={user?.email}
                      required
                      name="email"
                    />
                  </div>
                  <div className="form__group form__photo-upload">
                    <img className="form__user-photo" src={`/img/users/${user?.photo}`} alt="User photo" />
                    <input
                      className="form__upload"
                      type="file"
                      accept="image/*"
                      id="photo"
                      name="photo"
                    />
                    <label htmlFor="photo">Choose new photo</label>
                  </div>
                  <div className="form__group right">
                    <button className="btn btn--small btn--green" type="submit">Save settings</button>
                  </div>
                </form>
              </div>

              <div className="line">&nbsp;</div>

              <div className="user-view__form-container">
                <h2 className="heading-secondary ma-bt-md">Password change</h2>
                <form className="form form-user-password">
                  <div className="form__group">
                    <label className="form__label" htmlFor="password-current">Current password</label>
                    <input
                      id="password-current"
                      className="form__input"
                      type="password"
                      placeholder="••••••••"
                      required
                      minLength="8"
                    />
                  </div>
                  <div className="form__group">
                    <label className="form__label" htmlFor="password">New password</label>
                    <input
                      id="password"
                      className="form__input"
                      type="password"
                      placeholder="••••••••"
                      required
                      minLength="8"
                    />
                  </div>
                  <div className="form__group ma-bt-lg">
                    <label className="form__label" htmlFor="password-confirm">Confirm password</label>
                    <input
                      id="password-confirm"
                      className="form__input"
                      type="password"
                      placeholder="••••••••"
                      required
                      minLength="8"
                    />
                  </div>
                  <div className="form__group right">
                    <button className="btn btn--small btn--green btn--save-password" type="submit">Save password</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )
      }

    </main>
  );
};

export default UserSettings;
