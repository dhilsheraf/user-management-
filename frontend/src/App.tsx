import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from './redux/store'; 
import Login from './components/user/Login';
import SignUp from './components/user/SignUp';
import UserProfile from './components/user/Profile';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import Home from './components/user/Home'; 
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/admin/PrivateRoute';
import PublicRoutee from './components/admin/PublicRoute';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/login" element={ <PublicRoute><Login /> </PublicRoute>}/>
          <Route path="/signup" element={ <PublicRoute><SignUp /> </PublicRoute>} />
          <Route path="/profile" element={<ProtectedRoute><UserProfile /> </ProtectedRoute>} />
          <Route path="/admin" element={ <PrivateRoute> <AdminDashboard /></PrivateRoute>}/>
          <Route path="/admin-login" element={ <PublicRoutee> <AdminLogin /> </PublicRoutee>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;