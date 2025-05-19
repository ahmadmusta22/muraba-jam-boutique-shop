import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import useUserData from "@/contexts/useUserData";

const Profile: React.FC = () => {
  const { currentUser, signOutUser } = useAuth();
  const { userData } = useUserData();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOutUser();
    navigate("/login");
  };

  if (!currentUser || !userData) {
    navigate("/login");
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <p>Email: {userData.email}</p>
        <p>Phone: {userData.phone}</p>
        <p>Created At: {userData.createdAt}</p>
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white p-2 rounded mt-4"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;