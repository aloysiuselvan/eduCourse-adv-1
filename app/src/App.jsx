import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AllCourses from './pages/AllCourses';
import ProductDetail from './pages/ProductDetail';
import PaymentMethod from './pages/PaymentMethod';
import PaymentPage from './pages/PaymentPage';
import ChangePaymentMethod from './pages/ChangePaymentMethod';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentPending from './pages/PaymentPending';
import MyOrders from './pages/MyOrders';
import MyCourses from './pages/MyCourses';
import UserProfile from './pages/UserProfile';
import CourseLearning from './pages/CourseLearning';
import Certificate from './pages/Certificate';
import ManageCoursesList from './pages/ManageCoursesList';
import ManageCourseForm from './pages/ManageCourseForm';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCourses } from './store/redux/courseSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/all-courses" element={<AllCourses />} />
      <Route path="/course/:id" element={<ProductDetail />} />
      <Route path="/checkout" element={<PaymentMethod />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/payment/change-method" element={<ChangePaymentMethod />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />
      <Route path="/payment/pending" element={<PaymentPending />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/my-courses" element={<MyCourses />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/course/:id/learn" element={<CourseLearning />} />
      <Route path="/certificate" element={<Certificate />} />
      <Route path="/manage-courses" element={<ManageCoursesList />} />
      <Route path="/manage-courses/add" element={<ManageCourseForm />} />
      <Route path="/manage-courses/edit/:id" element={<ManageCourseForm />} />
    </Routes>
  );
}

export default App;
