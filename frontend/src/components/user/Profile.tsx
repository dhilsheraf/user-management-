import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, updateProfileImage } from "../../redux/authSlice";
import { useEffect, useState } from "react";
import axios from "axios";

const NO_IMAGE_URL = "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg";

function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false); // To show loader during upload
  const [uploadedImage, setUploadedImage] = useState<string | null>(null); // To show image immediately after upload

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleUpload = async () => {
    if (!imageFile || !user) return;
    
    setUploading(true); // Set uploading state to true to show loader
    
    const formData = new FormData();
    formData.append('profileImage', imageFile);

    try {
      const res = await axios.put(
        `http://localhost:8080/api/${user._id}/profile-image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // Update profile image in Redux store and the local state
      dispatch(updateProfileImage(res.data.profileImage));
      setUploadedImage(res.data.profileImage); // Set the uploaded image in local state
      setUploading(false); // Set uploading to false once upload is complete
    } catch (err) {
      console.error("Image upload failed", err);
      setUploading(false); // Set uploading to false in case of an error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>

        <div className="flex justify-center mb-4">
          <img
            src={uploadedImage || user?.profileImage || NO_IMAGE_URL}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-indigo-500 object-cover"
          />
        </div>

        {user && (
          <>
            <p className="text-xl font-semibold text-gray-700">{user.name}</p>
            <p className="text-gray-600">{user.email}</p>
          </>
        )}

        <div className="space-y-2">
          <input
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0 file:text-sm file:font-semibold
              file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          
          <button
            onClick={handleUpload}
            disabled={!imageFile || uploading}
            className={`w-full py-2 text-white rounded-full ${uploading ? "bg-gray-500" : "bg-indigo-600 hover:bg-indigo-700"} transition duration-300`}
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
        >
          Logout
        </button>

        <button
          onClick={()=>{
            navigate('/')
          }}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 ml-3"
        >
          Go to home
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
