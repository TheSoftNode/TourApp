import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import Contact from '../Pages/Contact'
import Verification from '../Pages/Verification';
import MyAccount from '../Dashboard/user-account/MyAccount'


import {Routes, Route} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute'
import CheckoutSuccess from '../Pages/Doctors/CheckoutSucess'
import CheckoutFail from '../Pages/Doctors/CheckoutFail'
import ForgotPassword from '@/Pages/ForgotPassword'
import ResetPassword from '@/Pages/ResetPassword'


const Routers = () => {
  return <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/doctors" element={<Doctors/>} />
        <Route path="/doctors/:id" element={<DoctorDetail/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Signup/>} />
        <Route path="/verify" element={<Verification/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/checkout-fail" element={<CheckoutFail />} />
        <Route 
        path="/users/profile/me" 
        element={
            <ProtectedRoute allowedRoles={["patient"]}>
                <MyAccount/>
            </ProtectedRoute>
        } 
        />
        <Route 
            path="/doctors/profile/me" 
            element={
                <ProtectedRoute allowedRoles={["doctor"]}>
                    <Dashboard/>
                </ProtectedRoute>
            } 
        />
        <Route 
            path="/admin/dashboard"
            element={
                <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminDashboard />
                </ProtectedRoute>
            }
        />
        

    </Routes>
};

export default Routers;