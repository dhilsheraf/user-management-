
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../redux/authSlice';

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('') 

  const handleLogin = async (e:React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8080/api/login',{email,password})
      dispatch(login( res.data.user))
      navigate('/')
    } catch (error) {
      console.error(error)
      alert('Login failed')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold">Sign in to your account</h2>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            className="w-full p-2 border rounded"
            required
            onChange={(e)=>setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Sign in
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
