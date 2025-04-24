import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import { RootState } from "../../redux/store";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.user);

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-4">
      <button
        className="bg-amber-900 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-50 transition duration-200 shadow-md"
        onClick={handleProfile}
      >
        Go to my Profile
      </button>

      <div className="text-center mb-8">
        <h1 className="text-amber-900 text-4xl font-bold mb-4 mt-4">
          Hello welcome to the {user?.name || "user"} management
        </h1>
      </div>

      <button
        className="bg-amber-900 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-50 transition duration-200 shadow-md"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
