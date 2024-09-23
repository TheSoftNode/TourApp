import { Routes, Route } from 'react-router-dom';

import Login from '../Pages/Login'
import SignUp from '../pages/SignUp'
import ToursList from '../pages/ToursList';
import TourDetails from '../pages/TourDetails';
import EmailVerified from '../pages/EmailVerified';
import EmailVerificationSent from '../pages/EmailVerificationSent';
// import CheckoutSuccess from '../Pages/Doctors/CheckoutSucess'
// import CheckoutFail from '../Pages/Doctors/CheckoutFail'
// import ForgotPassword from '@/Pages/ForgotPassword'
// import ResetPassword from '@/Pages/ResetPassword'


const Routers = () =>
{
  return <Routes>
    <Route path="/" element={<ToursList />} />
    <Route path="/home" element={<ToursList />} />
    <Route path="/tours" element={<ToursList />} />
    <Route path="/tours/:id" element={<TourDetails />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/verify" element={<EmailVerificationSent />} />
    <Route path="/signup" element={<EmailVerified />} />
    {/* <Route path="/contact" element={<Contact/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/checkout-fail" element={<CheckoutFail />} /> */}


  </Routes>
};

export default Routers;