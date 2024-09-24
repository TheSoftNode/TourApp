import React, { useContext, useState } from 'react';

import useGetProfile from "../hooks/useFetchData"
import { BASE_URL } from '../config';
import Loading from '../components/Loader/Loading';
import ErrorPage from './Error';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader"
import * as Yup from 'yup';
import { authContext } from '../context/AuthContext';

const UserSettings = () =>
{

  const { token } = useContext(authContext);


  const [passworLoading, setPasswordLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [passwordFormErrors, setPasswordFormErrors] = useState(null);
  const [userFormErrors, setUserFormErrors] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState("")

  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    photo: ""
  })

  const [passwordFormData, setPasswordFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const passwordSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Please enter your password!").min(6),
    newPassword: Yup.string().required("Please enter your password!").min(6),
    confirmPassword: Yup.string()
      .required("Please confirm Your password")
      .oneOf([Yup.ref("newPassword")], "Passwords must match"),
  });


  const userSchema = Yup.object().shape({
    name: Yup.string().required("Please enter your name"),
    email: Yup.string()
      .email("Invalid email!")
      .required("Please enter your email!"),
  });

  const handlePasswordInputChange = e =>
  {
    setPasswordFormData({ ...passwordFormData, [e.target.name]: e.target.value })
  }

  const handleuserInputChange = e =>
  {
    setUserFormData({ ...userFormData, [e.target.name]: e.target.value })
  }

  const handlePasswordSubmit = async e =>
  {

    e.preventDefault()

    try
    {
      await passwordSchema.validate(passwordFormData, { abortEarly: false });

      setPasswordLoading(true);

      const res = await fetch(`${BASE_URL}/users/update-password`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(passwordFormData)
      })

      const result = await res.json();

      console.log(result)

      if (res.ok)
      {

        toast.success(result.message, { className: "toast-message" })
        setPasswordLoading(false);
      }
      else
      {
        toast.error(result.message, { className: "toast-message" });
        setPasswordLoading(false);
        console.log(result);
      }
    }
    catch (err)
    {
      if (err instanceof Yup.ValidationError)
      {
        const errors = {};
        err.inner.forEach(e =>
        {
          errors[e.path] = e.message;
        });
        setPasswordFormErrors(errors);
      }
      else
      {
        toast.error(err.message);
      }
      setPLoading(false)
    }

  }

  const handleFileInputChange = async (e) =>
  {
    const file = e.target.files[0];

    // const data = await uploadImageToCloudinary(file);

    setPreviewUrl(data.url);
    setSelectedFile(data.url)
    setUserFormData({ ...userFormData, photo: data.url })
  }

  const { data: userData, loading, error } = useGetProfile(`${BASE_URL}/users/me`);
  const user = userData?.data?.data;


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
                <form className="form form-user-password" onSubmit={handlePasswordSubmit}>
                  <div className="form__group">
                    <label className="form__label" htmlFor="password-current">Current password</label>
                    <input
                      name="oldPassword"
                      className="form__input"
                      type="password"
                      value={passwordFormData.oldPassword}
                      onChange={handlePasswordInputChange}
                      placeholder="••••••••"
                      required
                      minLength="8"
                    />
                  </div>
                  {passwordFormErrors && passwordFormErrors.oldPassword && (
                    <span className="input_error">{passwordFormErrors.oldPassword}</span>)}

                  <div className="form__group">
                    <label className="form__label" htmlFor="password">New password</label>
                    <input
                      name="newPassword"
                      className="form__input"
                      type="password"
                      placeholder="••••••••"
                      value={passwordFormData.newPassword}
                      onChange={handlePasswordInputChange}
                      required
                      minLength="8"
                    />
                  </div>
                  {passwordFormErrors && passwordFormErrors.newPassword && (
                    <span className="input_error">{passwordFormErrors.newPassword}</span>)}

                  <div className="form__group ma-bt-lg">
                    <label className="form__label" htmlFor="password-confirm">Confirm password</label>
                    <input
                      name="confirmPassword"
                      className="form__input"
                      type="password"
                      value={passwordFormData.confirmPassword}
                      onChange={handlePasswordInputChange}
                      placeholder="••••••••"
                      required
                      minLength="8"
                    />
                  </div>
                  {passwordFormErrors && passwordFormErrors.confirmPassword && (
                    <span className="input_error">{passwordFormErrors.confirmPassword}</span>
                  )}
                  <div className="form__group right">
                    <button className="btn btn--small btn--green btn--save-password" type="submit">
                      {passworLoading ? <HashLoader size={35} color="#ffffff" /> : "Save Password"}
                    </button>
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
