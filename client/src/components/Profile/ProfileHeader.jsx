// import React, { useRef, useState } from "react";
// import { FiChevronLeft } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// export default function ProfileHeader({ user, onBack }) {
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);

//   const [previewImage, setPreviewImage] = useState(
//     user?.avatar ||
//       "https://i.pinimg.com/1200x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg"
//   );

//   // Open file picker when clicking Edit Profile
//   const handleEditProfile = () => {
//     fileInputRef.current.click();
//   };

//   // When user selects a new image
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const previewUrl = URL.createObjectURL(file);
//       setPreviewImage(previewUrl);

//       // Later we will upload this file to backend here
//       console.log("Selected new avatar:", file);
//     }
//   };

//   return (
//     <div
//       className="
//         bg-gradient-to-br from-[#5b7cfa] to-[#4b6cff] text-white
//         h-[40vh] w-full
//         rounded-b-[40px]
//         relative
//         px-6 pt-6 pb-10
//         flex flex-col
//         min-[800px]:h-full
//         min-[800px]:w-[45%]
//         min-[800px]:rounded-b-none
//         min-[800px]:rounded-l-[30px]
//         shadow-lg z-10
//       "
//     >
//       {/* Header buttons */}
//       <div className="flex items-center justify-between mb-8">
//         <button
//           onClick={onBack}
//           className="text-white flex items-center gap-2 text-lg font-medium bg-transparent border-none cursor-pointer hover:opacity-80 transition"
//         >
//           <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
//             <FiChevronLeft className="text-xl" />
//           </div>
//           <span className="hidden sm:inline">Back</span>
//         </button>

//         <button
//           onClick={handleEditProfile}
//           className="text-white bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 cursor-pointer border border-white/10 hover:bg-white/30 transition shadow-sm"
//         >
//           Edit Profile
//         </button>

//         {/* Hidden file input */}
//         <input
//           type="file"
//           accept="image/*"
//           ref={fileInputRef}
//           hidden
//           onChange={handleImageChange}
//         />
//       </div>

//       {/* Avatar Section */}
//       <div className="flex flex-col items-center justify-center flex-grow">
//         <div className="relative group">
//           {/* Glow effect */}
//           <div className="absolute inset-0 bg-white/30 rounded-[35px] blur-xl group-hover:bg-white/40 transition-all duration-500"></div>

//           <img
//             src={previewImage}
//             className="
//               relative
//               w-32 h-32 rounded-[35px] object-cover
//               border-[4px] border-white/30
//               shadow-2xl
//               min-[800px]:w-[clamp(180px,20vw,260px)]
//               min-[800px]:h-[clamp(180px,20vw,260px)]
//               transform group-hover:scale-[1.02] transition-transform duration-500
//             "
//             alt="Profile Avatar"
//           />
//         </div>

//         <h2 className="mt-6 text-2xl md:text-3xl font-bold tracking-tight">
//           {user?.username || user?.name || "User"}
//         </h2>

//         <p className="mt-2 text-white/80 font-light tracking-wide bg-black/10 px-4 py-1 rounded-full text-sm backdrop-blur-sm">
//           {user?.phoneNumber || "No phone number added"}
//         </p>
//       </div>
//     </div>
//   );
// }

// import React, { useRef, useState, useEffect } from "react";
// import { FiChevronLeft } from "react-icons/fi";

// export default function ProfileHeader({ user, onBack, onUpdateUser }) {
//   const fileInputRef = useRef(null);

//   const defaultAvatar =
//     "https://i.pinimg.com/1200x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg";

//   const [previewImage, setPreviewImage] = useState(
//     user?.avatar || defaultAvatar
//   );

//   /* 🔁 Sync avatar when profile reloads from DB */
//   useEffect(() => {
//     if (user?.avatar) {
//       setPreviewImage(user.avatar);
//     } else {
//       setPreviewImage(defaultAvatar);
//     }
//   }, [user]);

//   const handleEditProfile = () => {
//     fileInputRef.current.click();
//   };

//   /* 🔥 Upload & save new profile picture */
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const base64Image = reader.result;

//       // Preview instantly
//       setPreviewImage(base64Image);

//       // 🔥 Send to backend through Profile.jsx
//       onUpdateUser({
//         avatar: base64Image,
//       });
//     };

//     reader.readAsDataURL(file);
//   };

//   return (
//     <div
//       className="
//         bg-gradient-to-br from-[#5b7cfa] to-[#4b6cff] text-white
//         h-[40vh] w-full
//         rounded-b-[40px]
//         px-6 pt-6 pb-10
//         flex flex-col
//         min-[800px]:h-full
//         min-[800px]:w-[45%]
//         min-[800px]:rounded-l-[30px]
//         shadow-lg
//       "
//     >
//       {/* Header buttons */}
//       <div className="flex items-center justify-between mb-8">
//         <button
//           onClick={onBack}
//           className="text-white flex items-center gap-2 hover:opacity-80 transition"
//         >
//           <FiChevronLeft className="text-xl" />
//           <span className="hidden sm:inline">Back</span>
//         </button>

//         <button
//           onClick={handleEditProfile}
//           className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm hover:bg-white/30 transition"
//         >
//           Edit Profile
//         </button>

//         {/* Hidden file input */}
//         <input
//           type="file"
//           accept="image/*"
//           ref={fileInputRef}
//           hidden
//           onChange={handleImageChange}
//         />
//       </div>

//       {/* Avatar section */}
//       <div className="flex flex-col items-center justify-center flex-grow">
//         <img
//           src={previewImage}
//           className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-xl"
//           alt="Profile Avatar"
//         />

//         <h2 className="mt-6 text-2xl font-bold tracking-tight">
//           {user?.username || "User"}
//         </h2>

//         {/* 🔥 SHOW PHONE FROM BACKEND FIELD (mobile) */}
//         <p className="mt-2 text-white/80 text-sm">
//           {user?.mobile || "No phone number added"}
//         </p>
//       </div>
//     </div>
//   );
// }

import React, { useRef, useState, useEffect } from "react";
import { FiChevronLeft, FiCamera, FiEdit3 } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ProfileHeader({ user, onBack, onUpdateUser }) {
  const fileInputRef = useRef(null);
  const defaultAvatar =
    "https://i.pinimg.com/1200x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg";
  const [previewImage, setPreviewImage] = useState(
    user?.avatar || defaultAvatar,
  );

  useEffect(() => {
    setPreviewImage(user?.avatar || defaultAvatar);
  }, [user?.avatar]);

  const handleEditProfile = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      setPreviewImage(base64Image);
      onUpdateUser({ avatar: base64Image });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="h-full w-full md:w-[38%] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-80 h-80 bg-purple-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <motion.button
            whileHover={{ scale: 1.1, x: -3 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="flex items-center gap-3 text-white/90 hover:text-white transition-colors group"
          >
            <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/20 group-hover:bg-white/20 transition-all">
              <FiChevronLeft className="text-xl" />
            </div>
            <span className="font-medium hidden sm:block">Back</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEditProfile}
            className="bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-xl border border-white/20 text-white hover:bg-white/25 transition-all flex items-center gap-2 font-medium"
          >
            <FiEdit3 className="text-sm" />
            <span>Edit Photo</span>
          </motion.button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            hidden
            onChange={handleImageChange}
          />
        </div>

        {/* Profile Section */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative group cursor-pointer"
            onClick={handleEditProfile}
          >
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl"
            />

            <div className="relative">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                <img
                  src={previewImage}
                  alt="Profile"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <FiCamera className="text-white text-4xl" />
              </div>

              <div className="absolute bottom-3 right-3 w-6 h-6 bg-green-500 rounded-full border-4 border-slate-900" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
              {user?.username || "User"}
            </h1>
            <p className="text-purple-300 font-medium mb-4">
              {user?.email || "user@example.com"}
            </p>

            <div className="flex items-center gap-6 mt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">127</p>
                <p className="text-xs text-white/60 uppercase tracking-wider">
                  Contacts
                </p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-bold text-white">1.2K</p>
                <p className="text-xs text-white/60 uppercase tracking-wider">
                  Messages
                </p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-bold text-white">42</p>
                <p className="text-xs text-white/60 uppercase tracking-wider">
                  Groups
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-center"
        >
          <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
            Phone Number
          </p>
          <p className="text-white font-semibold text-lg">
            {user?.mobile || "+1 (555) 000-0000"}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
