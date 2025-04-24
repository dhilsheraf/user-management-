import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from './redux/store'; // Make sure this path is correct
import Login from './components/user/Login';
import SignUp from './components/user/SignUp';
import UserProfile from './components/user/Profile';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import Home from './components/user/Home'; // Make sure the case matches your file name

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/admin" element={<AdminDashboard />}/>
          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;