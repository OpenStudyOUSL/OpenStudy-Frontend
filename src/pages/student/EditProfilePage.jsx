import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import UploadMediaUploadtoSupabase from "../../utils/mediaUpload";

export default function EditProfilePage() {
  const defaultImage = "/profile.jpg"; // place this file in public/ folder

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(defaultImage);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [user, setUser] = useState(null);

  // Load current user data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please login first");
          return;
        }

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        // IMPORTANT: your getUser returns req.user directly — not { user: ... }
        const userObj = res.data; // ← not res.data.user
        setUser(userObj); // Save the entire object for fallback

        setUsername(userObj.userName || userObj.username || "");
        setEmail(userObj.email || "");
        setRegNumber(
          userObj.regNo ||
            userObj.registerNumber ||
            userObj.registrationNumber ||
            "",
        );
        setImagePreview(userObj.profilePicture || defaultImage);
      } catch (error) {
        console.error("Failed to load profile:", error);
        toast.error("Could not load profile data");
      } finally {
        setFetching(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(defaultImage);
  };

  // Submit updated profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let profilePictureUrl = user?.profilePicture; // Fallback to current if no new image

      if (image) {
        toast.loading("Uploading image...", { id: "upload-toast" }); // Show uploading toast
        const uploadResult = await UploadMediaUploadtoSupabase(image);
        profilePictureUrl = uploadResult.publicUrl;
        toast.success("Image uploaded!");
        toast.dismiss("upload-toast"); // Hide upload toast on success
      }

      // We use JSON here because we are sending a URL, not a file anymore
      const payload = {
        userName: username.trim(),
        email: email.trim(),
        registerNumber: regNumber.trim(),
        profilePicture: profilePictureUrl,
      };

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/update`, // ← make sure this route exists!
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      );

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.dismiss("upload-toast"); // Hide upload toast on error just in case
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center">
        <p className="text-purple-700 text-xl animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-purple-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-purple-600 px-8 py-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Edit Profile
          </h1>
        </div>

        <div className="p-8 md:p-12">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative">
              <img
                src={imagePreview}
                alt="Profile preview"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-purple-200 shadow-lg"
              />
              {imagePreview !== defaultImage && (
                <button
                  onClick={removeImage}
                  className="absolute -bottom-2 -right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow hover:bg-red-600 transition"
                >
                  Remove
                </button>
              )}
            </div>

            <label className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-full cursor-pointer hover:bg-purple-700 transition font-medium shadow-md">
              Change Profile Picture
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <Input
              label="Username"
              value={username}
              onChange={setUsername}
              placeholder="Enter your username"
            />
            <Input
              label="Email Address"
              value={email}
              onChange={setEmail}
              placeholder="your.email@example.com"
              type="email"
            />
            <Input
              label="OUSL Registration Number"
              value={regNumber}
              onChange={setRegNumber}
              placeholder="E.g. 2021/ICT/123"
            />

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className={`
                  w-full py-4 px-8 text-lg font-semibold rounded-2xl shadow-lg transition-all
                  ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700 text-white hover:scale-[1.02]"
                  }
                `}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder = "", type = "text" }) {
  return (
    <div className="space-y-2">
      <label className="block text-gray-700 font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full px-4 py-3 rounded-xl border border-gray-300 
          focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
          outline-none transition bg-white/70
        "
      />
    </div>
  );
}
