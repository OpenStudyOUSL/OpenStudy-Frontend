import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import UploadMediaUploadtoSupabase from "../../utils/mediaUpload";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const defaultImage = "https://i.pravatar.cc/150";

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(defaultImage);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please login first");
          navigate("/login");
          return;
        }

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const userObj = res.data;
        setUser(userObj);

        setUsername(userObj.userName || "");
        setEmail(userObj.email || "");
        setRegNumber(userObj.registerNumber || "");
        setImagePreview(userObj.profilePicture || defaultImage);
      } catch (error) {
        console.error("Failed to load profile:", error);
        toast.error("Could not load profile data");
      } finally {
        setFetching(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(defaultImage);
    // Explicitly mark that the image should be cleared in the database
    // We'll use this in handleSubmit
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let profilePictureUrl = user?.profilePicture;

      // Case 1: New image uploaded
      if (image) {
        const uploadToast = toast.loading(
          "Uploading your new profile picture...",
        );
        try {
          const uploadResult = await UploadMediaUploadtoSupabase(image);
          profilePictureUrl = uploadResult.publicUrl;
          toast.success("Image uploaded successfully!", { id: uploadToast });
        } catch (uploadErr) {
          const errMsg =
            typeof uploadErr === "string"
              ? uploadErr
              : uploadErr.message || "Failed to upload image.";
          toast.error(errMsg, {
            id: uploadToast,
          });
          setLoading(false);
          return;
        }
      }
      // Case 2: Image was removed (preview is default, no new file selected, but old picture existed)
      else if (imagePreview === defaultImage && user?.profilePicture) {
        profilePictureUrl = ""; // Or use the default URL
      }

      const payload = {
        userName: username.trim(),
        email: email.trim(),
        registerNumber: regNumber.trim(),
        profilePicture: profilePictureUrl,
      };

      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/update`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      );

      // CRITICAL: Update localStorage so Navbar and other pages reflect the change
      const updatedUser = { ...user, ...payload };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Dispatch custom event to notify Navbar
      window.dispatchEvent(new Event("userUpdated"));

      toast.success("Profile updated perfectly!");
      setTimeout(() => navigate("/profile"), 1500);
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans py-12 px-4">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-200 rounded-full blur-[100px] opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-200 rounded-full blur-[100px] opacity-30 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <div className="bg-white/70 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-[2.5rem] overflow-hidden">
          <div className="grid lg:grid-cols-5 h-full">
            {/* Left Panel - Visuals */}
            <div className="lg:col-span-2 bg-gradient-to-br from-primary-700 to-primary-900 p-8 sm:p-12 text-white flex flex-col items-center justify-center text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative mb-8"
              >
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl" />
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-white object-cover shadow-2xl relative z-10"
                />
                <div className="absolute bottom-2 right-2 flex gap-2 z-20">
                  {imagePreview !== defaultImage && (
                    <button
                      type="button"
                      onClick={removeImage}
                      className="p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                      title="Remove Picture"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  )}
                  <label className="p-3 bg-white text-primary-700 rounded-full shadow-lg cursor-pointer hover:bg-primary-50 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </motion.div>

              <h2 className="text-3xl font-black mb-4">Edit Profile</h2>
              <p className="text-purple-100 font-medium opacity-80 leading-relaxed mb-8">
                Keep your profile updated so your achievements reflect your true
                self on the leaderboard.
              </p>

              <button
                onClick={() => navigate("/profile")}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-bold border border-white/20 transition-all"
              >
                Back to Dashboard
              </button>
            </div>

            {/* Right Panel - Form */}
            <div className="lg:col-span-3 p-8 sm:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <InputField
                    label="Username"
                    value={username}
                    onChange={setUsername}
                    icon={
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    }
                  />

                  <InputField
                    label="Email Address"
                    value={email}
                    onChange={setEmail}
                    type="email"
                    icon={
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    }
                  />

                  <InputField
                    label="Registration Number"
                    value={regNumber}
                    onChange={setRegNumber}
                    icon={
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2"
                        />
                      </svg>
                    }
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-primary-700 to-primary-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-primary-200 hover:shadow-primary-300 hover:-translate-y-1 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Saving Changes...
                      </span>
                    ) : (
                      "Save Profile Details"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function InputField({ label, value, onChange, type = "text", icon }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-gray-500 tracking-wider uppercase ml-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-600 transition-colors">
          {icon}
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-primary-600 focus:ring-4 focus:ring-primary-100 transition-all outline-none text-gray-800 font-semibold"
        />
      </div>
    </div>
  );
}
