import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SignUp = () =>
{
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState(null);

  const navigate = useNavigate()
  const { dispatch } = useContext(authContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })


  const schema = Yup.object().shape({
    name: Yup.string().required("Please enter your name"),
    email: Yup.string()
      .email("Invalid email!")
      .required("Please enter your email!"),
    password: Yup.string().required("Please enter your password!").min(6),
    confirmPassword: Yup.string()
      .required("Please confirm Your password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const handleInputChange = e =>
  {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e =>
  {

    e.preventDefault()
    setLoading(true);


    try
    {
      await schema.validate(formData, { abortEarly: false });

      const res = await fetch(`${BASE_URL}/users/verify-email`, {
        method: 'post',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const result = await res.json();

      if (res.ok)
      {
        dispatch({
          type: "ACTIVATE_USER",
          payload: {
            activationToken: result.activationToken,
          }
        })

        setLoading(false);
        toast.success(result.message)
        navigate("/verify");
      }
      else
      {
        toast.error(result.message);
        setLoading(false);
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
        setFormErrors(errors);
      }
      else
      {
        toast.error(err.message);
      }
      setLoading(false)
    }

  }

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Create your account</h2>
        <form className="form form--signup" onSubmit={handleSubmit}>
          <div className="form__group">
            <label className="form__label" htmlFor="name">
              Name
            </label>
            <input
              className="form__input"
              type="text"
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

          </div>
          {formErrors && formErrors.name && (
            <span className="text-red-500 pt-2 block">{formErrors.name}</span>
          )}

          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              name="email"
              className="form__input"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          {formErrors && formErrors.email && (
            <span className="text-red-500 pt-2 block">{formErrors.email}</span>
          )}

          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="form__input"
              type="password"
              placeholder="••••••••"
              required
              minLength="8"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          {formErrors && formErrors.password && (
            <span className="text-red-500 pt-2 block">{formErrors.password}</span>
          )}

          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              className="form__input"
              type="password"
              placeholder="••••••••"
              required
              minLength="8"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
          {formErrors && formErrors.confirmPassword && (
            <span className="text-red-500 pt-2 block">{formErrors.confirmPassword}</span>
          )}

          <div className="form__group">
            <button className="btn btn--green" type="submit">
              Sign Up
            </button>
          </div>

          <div className="form__group">
            <p className="form__text">
              Already have an account?{' '}
              <a href="/login" className="form__link">
                Log in
              </a>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
