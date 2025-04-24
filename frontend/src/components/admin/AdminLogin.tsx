
import { useNavigate, Link } from 'react-router-dom';

const AdminLogin = () => {
 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold">Admin Sign In</h2>
        </div>
        <form className="space-y-6" >
          <input
            type="email"
            name="email"
            placeholder="Admin Email"

            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"

            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Sign in
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Not an admin?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Go to User Login</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
