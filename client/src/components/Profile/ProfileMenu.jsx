// import React, { useState } from "react";
// import { FiUser, FiMail, FiPhone, FiLogOut, FiChevronRight } from "react-icons/fi";
// import { FaBirthdayCake } from "react-icons/fa";
// import { MdWc } from "react-icons/md";
// import { FiHelpCircle } from "react-icons/fi";

// export default function ProfileMenu({ user, onLogout, onUpdateUser }) {
//   return (
//     <div
//       className="
//         w-full h-[60vh] p-6 space-y-4 overflow-y-auto
//         bg-gray-50
//         min-[800px]:h-full
//         min-[800px]:w-[55%]
//         min-[800px]:p-10
//         min-[800px]:flex min-[800px]:flex-col min-[800px]:justify-center
//       "
//     >
//       <div className="space-y-4 max-w-md mx-auto w-full">
//         <h3 className="text-xl font-bold text-gray-800 mb-6 hidden min-[800px]:block">
//           Account Settings
//         </h3>

//         {/* About */}
//         <EditableTextItem
//           icon={<FiUser />}
//           label="About"
//           value={user?.about || "Available"}
//           onSave={(val) => onUpdateUser({ about: val })}
//         />

//         {/* Email (Read Only) */}
//         <ReadOnlyMenuItem
//           icon={<FiMail />}
//           label="Email"
//           value={user?.email || "user@example.com"}
//         />

//         {/* Date of Birth (Calendar) */}
//         <EditableDateItem
//           icon={<FaBirthdayCake />}
//           label="Birthday"
//           value={user?.birthday || ""}
//           onSave={(val) => onUpdateUser({ birthday: val })}
//         />

//         {/* Gender Dropdown */}
//         <EditableSelectItem
//           icon={<MdWc />}
//           label="Gender"
//           value={user?.gender || "Male"}
//           options={["Male", "Female", "Prefer not to say"]}
//           onSave={(val) => onUpdateUser({ gender: val })}
//         />

//         {/* Phone Number (updates ProfileHeader automatically 🔥) */}
//         <EditableTextItem
//           icon={<FiPhone />}
//           label="Phone"
//           value={user?.phoneNumber || ""}
//           onSave={(val) => onUpdateUser({ phoneNumber: val })}
//         />

//         {/* Support Link */}
//         <LinkMenuItem icon={<FiHelpCircle />} label="Support" />

//         {/* Logout */}
//         <button
//           className="w-full mt-8 bg-red-50 text-red-500 py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-red-100 hover:shadow-sm transition-all duration-300 group cursor-pointer border-none"
//           onClick={onLogout}
//         >
//           <FiLogOut className="group-hover:-translate-x-1 transition-transform" />
//           Sign Out
//         </button>
//       </div>
//     </div>
//   );
// }

// /* ---------------- EDITABLE TEXT ITEM ---------------- */

// function EditableTextItem({ icon, label, value, onSave }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [temp, setTemp] = useState(value);

//   const handleSave = () => {
//     setIsEditing(false);
//     onSave(temp);
//   };

//   return (
//     <BaseItem icon={icon} label={label}>
//       {isEditing ? (
//         <input
//           className="mt-1 px-2 py-1 border rounded-lg text-sm w-full"
//           value={temp}
//           onChange={(e) => setTemp(e.target.value)}
//         />
//       ) : (
//         <span className="text-xs text-gray-500 mt-0.5">{value || "Not added"}</span>
//       )}

//       {isEditing ? (
//         <button onClick={handleSave} className="text-xs font-semibold text-green-600">
//           Save
//         </button>
//       ) : (
//         <button
//           onClick={() => setIsEditing(true)}
//           className="hidden group-hover:flex text-xs font-semibold text-[#5b7cfa]"
//         >
//           Edit
//         </button>
//       )}
//     </BaseItem>
//   );
// }

// /* ---------------- DATE PICKER ITEM ---------------- */

// function EditableDateItem({ icon, label, value, onSave }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [temp, setTemp] = useState(value);

//   const handleSave = () => {
//     setIsEditing(false);
//     onSave(temp);
//   };

//   return (
//     <BaseItem icon={icon} label={label}>
//       {isEditing ? (
//         <input
//           type="date"
//           className="mt-1 px-2 py-1 border rounded-lg text-sm w-full"
//           value={temp}
//           onChange={(e) => setTemp(e.target.value)}
//         />
//       ) : (
//         <span className="text-xs text-gray-500 mt-0.5">
//           {value || "Not added"}
//         </span>
//       )}

//       {isEditing ? (
//         <button onClick={handleSave} className="text-xs font-semibold text-green-600">
//           Save
//         </button>
//       ) : (
//         <button
//           onClick={() => setIsEditing(true)}
//           className="hidden group-hover:flex text-xs font-semibold text-[#5b7cfa]"
//         >
//           Edit
//         </button>
//       )}
//     </BaseItem>
//   );
// }

// /* ---------------- SELECT (GENDER) ITEM ---------------- */

// function EditableSelectItem({ icon, label, value, options, onSave }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [temp, setTemp] = useState(value);

//   const handleSave = () => {
//     setIsEditing(false);
//     onSave(temp);
//   };

//   return (
//     <BaseItem icon={icon} label={label}>
//       {isEditing ? (
//         <select
//           className="mt-1 px-2 py-1 border rounded-lg text-sm w-full"
//           value={temp}
//           onChange={(e) => setTemp(e.target.value)}
//         >
//           {options.map((opt) => (
//             <option key={opt} value={opt}>
//               {opt}
//             </option>
//           ))}
//         </select>
//       ) : (
//         <span className="text-xs text-gray-500 mt-0.5">{value}</span>
//       )}

//       {isEditing ? (
//         <button onClick={handleSave} className="text-xs font-semibold text-green-600">
//           Save
//         </button>
//       ) : (
//         <button
//           onClick={() => setIsEditing(true)}
//           className="hidden group-hover:flex text-xs font-semibold text-[#5b7cfa]"
//         >
//           Edit
//         </button>
//       )}
//     </BaseItem>
//   );
// }

// /* ---------------- READ ONLY ITEM ---------------- */

// function ReadOnlyMenuItem({ icon, label, value }) {
//   return (
//     <div className="bg-white flex items-center justify-between px-5 py-4 rounded-2xl border border-gray-100">
//       <div className="flex items-center gap-4">
//         <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#5b7cfa] text-lg">
//           {icon}
//         </div>
//         <div className="flex flex-col items-start">
//           <span className="text-sm font-medium text-gray-900">{label}</span>
//           <span className="text-xs text-gray-500 mt-0.5">{value}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------------- LINK ITEM ---------------- */

// function LinkMenuItem({ icon, label }) {
//   return (
//     <div className="group bg-white flex items-center justify-between px-5 py-4 rounded-2xl cursor-pointer hover:shadow-md hover:bg-white transition-all duration-300 border border-transparent hover:border-gray-100">
//       <div className="flex items-center gap-4">
//         <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#5b7cfa] text-lg group-hover:bg-[#5b7cfa] group-hover:text-white transition-colors duration-300">
//           {icon}
//         </div>
//         <span className="text-sm font-medium text-gray-900">{label}</span>
//       </div>

//       <FiChevronRight className="text-gray-400 group-hover:translate-x-1 transition-transform" />
//     </div>
//   );
// }

// /* ---------------- BASE ITEM WRAPPER ---------------- */

// function BaseItem({ icon, label, children }) {
//   return (
//     <div className="group bg-white flex items-center justify-between px-5 py-4 rounded-2xl hover:shadow-md hover:bg-white transition-all duration-300 border border-transparent hover:border-gray-100">
//       <div className="flex items-center gap-4 w-full">
//         <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#5b7cfa] text-lg group-hover:bg-[#5b7cfa] group-hover:text-white transition-colors duration-300">
//           {icon}
//         </div>

//         <div className="flex flex-col items-start flex-grow">
//           <span className="text-sm font-medium text-gray-900">{label}</span>
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLogOut,
  FiChevronRight,
  FiEdit2,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { FaBirthdayCake } from "react-icons/fa";
import { MdWc } from "react-icons/md";
import { FiHelpCircle, FiShield, FiBell, FiSettings } from "react-icons/fi";

export default function ProfileMenu({ user, onLogout, onUpdateUser }) {
  return (
    <div className="h-full w-full md:w-[62%] bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30" />

      <div className="relative z-10 h-full overflow-y-auto p-6 md:p-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Settings</h2>
            <p className="text-gray-500">Manage your account preferences</p>
          </motion.div>

          {/* Profile Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Profile Information</h3>
            <div className="space-y-3">
              <EditableTextItem
                icon={<FiUser className="text-lg" />}
                label="About"
                value={user?.bio || "Available"}
                onSave={(val) => onUpdateUser({ about: val })}
              />

              <ReadOnlyMenuItem
                icon={<FiMail className="text-lg" />}
                label="Email"
                value={user?.email || "user@example.com"}
              />

              <EditableTextItem
                icon={<FiPhone className="text-lg" />}
                label="Phone"
                value={user?.mobile || ""}
                onSave={(val) => onUpdateUser({ phoneNumber: val })}
              />

              <EditableDateItem
                icon={<FaBirthdayCake className="text-lg" />}
                label="Birthday"
                value={user?.birthday || ""}
                onSave={(val) => onUpdateUser({ birthday: val })}
              />

              <EditableSelectItem
                icon={<MdWc className="text-lg" />}
                label="Gender"
                value={user?.gender || "Male"}
                options={["Male", "Female", "Prefer not to say"]}
                onSave={(val) => onUpdateUser({ gender: val })}
              />
            </div>
          </motion.div>

          {/* Preferences Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Preferences</h3>
            <div className="space-y-3">
              <LinkMenuItem icon={<FiBell className="text-lg" />} label="Notifications" />
              <LinkMenuItem icon={<FiShield className="text-lg" />} label="Privacy & Security" />
              <LinkMenuItem icon={<FiSettings className="text-lg" />} label="App Settings" />
              <LinkMenuItem icon={<FiHelpCircle className="text-lg" />} label="Help & Support" />
            </div>
          </motion.div>

          {/* Logout Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-6 bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:shadow-2xl transition-all duration-300 group"
            onClick={onLogout}
          >
            <FiLogOut className="text-lg group-hover:-translate-x-1 transition-transform" />
            Sign Out
          </motion.button>
        </div>
      </div>
    </div>
  );
}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, staggerChildren: 0.1 }}
          className="space-y-3"
        >
          {/* 🔥 ABOUT (bio from backend) */}
          <EditableTextItem
            icon={<FiUser />}
            label="About"
            value={user?.bio || "Available"}
            onSave={(val) => onUpdateUser({ about: val })}
          />

          {/* Email (Read Only) */}
          <ReadOnlyMenuItem
            icon={<FiMail />}
            label="Email"
            value={user?.email || "user@example.com"}
          />

          {/* Birthday */}
          <EditableDateItem
            icon={<FaBirthdayCake />}
            label="Birthday"
            value={user?.birthday || ""}
            onSave={(val) => onUpdateUser({ birthday: val })}
          />

          {/* Gender */}
          <EditableSelectItem
            icon={<MdWc />}
            label="Gender"
            value={user?.gender || "Male"}
            options={["Male", "Female", "Prefer not to say"]}
            onSave={(val) => onUpdateUser({ gender: val })}
          />

          {/* 🔥 PHONE (mobile from backend) */}
          <EditableTextItem
            icon={<FiPhone />}
            label="Phone"
            value={user?.mobile || ""}
            onSave={(val) => onUpdateUser({ phoneNumber: val })}
          />

          {/* Support */}
          <LinkMenuItem icon={<FiHelpCircle />} label="Support" />
        </motion.div>

        {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-8 bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:shadow-xl transition-all duration-300 group cursor-pointer border-none"
          onClick={onLogout}
        >
          <FiLogOut className="text-lg group-hover:-translate-x-1 transition-transform" />
          Sign Out
        </motion.button>
      </div>
    </div>
  );
}

/* ---------------- EDITABLE TEXT ITEM ---------------- */

function EditableTextItem({ icon, label, value, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [temp, setTemp] = useState(value);

  useEffect(() => {
    setTemp(value);
  }, [value]);

  const handleSave = () => {
    setIsEditing(false);
    onSave(temp);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTemp(value);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
            {icon}
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</p>
            {isEditing ? (
              <input
                type="text"
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
                className="w-full px-3 py-1.5 border border-purple-300 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
            ) : (
              <p className="text-sm font-medium text-gray-900">{value || "Not set"}</p>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSave}
                className="w-9 h-9 rounded-lg bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <FiCheck />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCancel}
                className="w-9 h-9 rounded-lg bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                <FiX />
              </motion.button>
            </>
          ) : (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsEditing(true)}
              className="w-9 h-9 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center hover:bg-purple-200 transition-colors"
            >
              <FiEdit2 className="text-sm" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- DATE PICKER ITEM ---------------- */

function EditableDateItem({ icon, label, value, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [temp, setTemp] = useState(value);

  useEffect(() => {
    setTemp(value);
  }, [value]);

  const handleSave = () => {
    setIsEditing(false);
    onSave(temp);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTemp(value);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
            {icon}
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</p>
            {isEditing ? (
              <input
                type="date"
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
                className="w-full px-3 py-1.5 border border-purple-300 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
            ) : (
              <p className="text-sm font-medium text-gray-900">{value || "Not set"}</p>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleSave} className="w-9 h-9 rounded-lg bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors">
                <FiCheck />
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleCancel} className="w-9 h-9 rounded-lg bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 transition-colors">
                <FiX />
              </motion.button>
            </>
          ) : (
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsEditing(true)} className="w-9 h-9 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center hover:bg-purple-200 transition-colors">
              <FiEdit2 className="text-sm" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- SELECT ITEM ---------------- */

function EditableSelectItem({ icon, label, value, options, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [temp, setTemp] = useState(value);

  useEffect(() => {
    setTemp(value);
  }, [value]);

  const handleSave = () => {
    setIsEditing(false);
    onSave(temp);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTemp(value);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
            {icon}
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</p>
            {isEditing ? (
              <select
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
                className="w-full px-3 py-1.5 border border-purple-300 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              >
                {options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <p className="text-sm font-medium text-gray-900">{value}</p>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleSave} className="w-9 h-9 rounded-lg bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors">
                <FiCheck />
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleCancel} className="w-9 h-9 rounded-lg bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 transition-colors">
                <FiX />
              </motion.button>
            </>
          ) : (
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsEditing(true)} className="w-9 h-9 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center hover:bg-purple-200 transition-colors">
              <FiEdit2 className="text-sm" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- READ ONLY ITEM ---------------- */

function ReadOnlyMenuItem({ icon, label, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-md">
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</p>
          <p className="text-sm font-medium text-gray-900">{value}</p>
        </div>
        <div className="bg-gray-100 rounded-lg px-3 py-1.5">
          <p className="text-xs font-semibold text-gray-500">Verified</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- LINK ITEM ---------------- */

function LinkMenuItem({ icon, label }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01, x: 4 }}
      className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-700 group-hover:from-purple-500 group-hover:to-pink-500 group-hover:text-white transition-all duration-300 shadow-md">
            {icon}
          </div>
          <p className="text-sm font-medium text-gray-900">{label}</p>
        </div>
        <FiChevronRight className="text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
      </div>
    </motion.div>
  );
}

/* ---------------- BASE ITEM ---------------- */

function BaseItem({ icon, label, children }) {
  return (
    <div className="group bg-white flex items-center justify-between px-5 py-4 rounded-2xl hover:shadow-md hover:bg-white transition-all duration-300 border border-transparent hover:border-gray-100">
      <div className="flex items-center gap-4 w-full">
        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#5b7cfa] text-lg group-hover:bg-[#5b7cfa] group-hover:text-white transition-colors duration-300">
          {icon}
        </div>

        <div className="flex flex-col items-start flex-grow">
          <span className="text-sm font-medium text-gray-900">{label}</span>
          {children}
        </div>
      </div>
    </div>
  );
}
