import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/admin/admin-login', {
        email,
        password,
      });

      localStorage.setItem('adminToken', res.data.token);
      localStorage.setItem('adminUser', JSON.stringify(res.data.user)); 
      toast.success('Login successful!');

      setTimeout(() => navigate('/admin'), 1000);
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;

        if (status === 403) {
          toast.error('Access denied: Not an admin.');
        } else if (status === 401) {
          toast.error('Invalid credentials. Please try again.');
        } else {
          toast.error('Something went wrong. Please try again later.');
        }
      } else {
        toast.error('Network error or server not reachable.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold">Admin Sign In</h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Sign in
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Not an admin?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Go to User Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
