// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useAuthStore from "../stores/useAuthStore";
// import ProfileHeader from "../components/Profile/ProfileHeader";
// import ProfileMenu from "../components/Profile/ProfileMenu";
// import { motion } from "framer-motion";

// export default function Profile() {
//   const navigate = useNavigate();
//   const { user, logout: logoutFromStore } = useAuthStore();

//   // 🔥 Local editable user state
//   const [localUser, setLocalUser] = useState(user);

//   const handleLogout = () => {
//     logoutFromStore();
//     navigate("/login");
//   };

//   // 🔥 This updates both Header + Menu
//   const handleUpdateUser = (updatedFields) => {
//     setLocalUser((prev) => ({
//       ...prev,
//       ...updatedFields,
//     }));
//   };

//   return (
//     <div className="min-h-screen w-screen flex items-center justify-center bg-[#E0E7FF] p-0 md:p-6 overflow-hidden">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.4, ease: "easeOut" }}
//         className="
//           w-full h-screen bg-white overflow-hidden
//           flex flex-col
//           md:rounded-[35px] md:h-[85vh] md:max-w-5xl md:shadow-2xl md:flex-row
//           relative z-10
//         "
//       >
//         <ProfileHeader user={localUser} onBack={() => navigate("/")} />

//         {/* 🔥 Pass update function */}
//         <ProfileMenu
//           user={localUser}
//           onLogout={handleLogout}
//           onUpdateUser={handleUpdateUser}
//         />
//       </motion.div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import { motion } from "framer-motion";
import axios from "axios";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileMenu from "../components/Profile/ProfileMenu";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout: logoutFromStore, updateUser, token } = useAuthStore();

  // 🔥 Local editable user state
  const [localUser, setLocalUser] = useState(user);

  const handleLogout = () => {
    logoutFromStore();
    navigate("/login");
  };

  /* ================= SAVE PROFILE TO DATABASE ================= */

  const handleUpdateUser = async (updatedFields) => {
    try {
      // 🔥 MAP FRONTEND FIELDS → BACKEND FIELDS
      const mappedData = {};

      // About -> bio
      if (updatedFields.about !== undefined) {
        mappedData.bio = updatedFields.about;
      }

      // Phone -> mobile
      if (updatedFields.phoneNumber !== undefined) {
        mappedData.mobile = updatedFields.phoneNumber;
      }

      // Gender
      if (updatedFields.gender !== undefined) {
        mappedData.gender = updatedFields.gender;
      }

      // Birthday
      if (updatedFields.birthday !== undefined) {
        mappedData.birthday = updatedFields.birthday;
      }

      // Avatar (profile pic)
      if (updatedFields.avatar !== undefined) {
        mappedData.avatar = updatedFields.avatar;
      }

      // Username (if you allow editing later)
      if (updatedFields.username !== undefined) {
        mappedData.username = updatedFields.username;
      }

      // 🔥 SEND TO BACKEND
      const res = await axios.put(
        "http://localhost:5000/api/auth/profile",
        mappedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // 🔥 Backend returns updated user
      setLocalUser(res.data);
      updateUser(res.data); // update Zustand store

      console.log("✅ Profile updated successfully:", res.data);
    } catch (error) {
      console.error("Profile update failed:", error);
      alert("Failed to update profile ❌");
    }
  };

  /* ================= UI ================= */

  if (!localUser) return null;

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 p-0 md:p-8 overflow-hidden relative">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="
          w-full h-screen bg-white/80 backdrop-blur-2xl overflow-hidden
          flex flex-col
          md:rounded-3xl md:h-[92vh] md:max-w-7xl
          md:flex-row md:border md:border-gray-200/50
          md:shadow-[0_20px_60px_rgba(0,0,0,0.12)]
          relative z-10
        "
      >
        {/* 🔥 Header (profile picture upload saves to DB) */}
        <ProfileHeader
          user={localUser}
          onBack={() => navigate("/")}
          onUpdateUser={handleUpdateUser}
        />

        {/* 🔥 Menu (about, phone, gender, birthday saved to DB) */}
        <ProfileMenu
          user={localUser}
          onLogout={handleLogout}
          onUpdateUser={handleUpdateUser}
        />
      </motion.div>
    </div>
  );
}
