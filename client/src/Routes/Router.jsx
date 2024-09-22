import Login from '../Pages/Login'
import SignUp from '../pages/SignUp'
import Contact from '../Pages/Contact'
import Verification from '../Pages/Verification';
import ToursList from '../pages/ToursList';
import TourDetails from '../pages/TourDetails';



import {Routes, Route} from 'react-router-dom';
import CheckoutSuccess from '../Pages/Doctors/CheckoutSucess'
import CheckoutFail from '../Pages/Doctors/CheckoutFail'
import ForgotPassword from '@/Pages/ForgotPassword'
import ResetPassword from '@/Pages/ResetPassword'


const Routers = () => {
  return <Routes>
        <Route path="/" element={<ToursList/>} />
        <Route path="/home" element={<ToursList/>} />
        <Route path="/tours" element={<ToursList/>} />
        <Route path="/tours/:id" element={<TourDetails/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/verify" element={<Verification/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/checkout-fail" element={<CheckoutFail />} />
        

    </Routes>
};

export default Routers;