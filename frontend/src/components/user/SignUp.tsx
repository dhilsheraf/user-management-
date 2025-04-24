import { Link } from "react-router-dom";


const Signup = () => {
 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Create an account</h2>
          <p className="text-sm text-gray-500">Fill in your details to sign up</p>
        </div>

        <form className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
        
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
     

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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
      
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Sign up
          </button>
        </form>

        <p className="text-sm text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
