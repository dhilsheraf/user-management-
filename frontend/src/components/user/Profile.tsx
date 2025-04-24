import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


function UserProfile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">User Profile</h2>

          <button
            onClick={()=>{}}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Logout
          </button>
        </div>
      </div>
  );
}

export default UserProfile;
