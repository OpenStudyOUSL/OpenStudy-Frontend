import { useState } from "react";

export default function EditProfilePage() {
  const defaultImage = "../../../public/profile.jpg"; // public folder

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [degree, setDegree] = useState("");
  const [regNumber, setRegNumber] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      firstName,
      lastName,
      username,
      email,
      number,
      degree,
      regNumber,
      profilePicture: image,
    };

    console.log("Updated User:", updatedUser);
    // 🔐 API call here
  };

  return (
    <div className="min-h-screen bg-purple-100 flex justify-center items-center px-6 py-10">
      <div className="w-full max-w-5xl bg-purple-400 rounded-3xl shadow-2xl p-12">

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-10">Profile</h1>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-12">
          <img
            src={imagePreview || defaultImage}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover border-4 border-white mb-4"
          />

          <label className="px-6 py-2 rounded-full border border-white text-white cursor-pointer hover:bg-white hover:text-purple-600 transition">
            Edit Picture
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </label>

          {imagePreview && (
            <button
              onClick={removeImage}
              className="mt-3 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
            >
              Remove Picture
            </button>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Left Column */}
          <div className="space-y-8">
            <Input label="First Name" value={firstName} onChange={setFirstName} />
            <Input label="Last Name" value={lastName} onChange={setLastName} />
            <Input label="User Name" value={username} onChange={setUsername} />
            <Input label="Email" value={email} onChange={setEmail} />
            <Input label="Number" value={number} onChange={setNumber} />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <Input label="Degree programme" value={degree} onChange={setDegree} />
            <Input label="OUSL Register Number" value={regNumber} onChange={setRegNumber} />
          </div>

          {/* Save Button */}
          <div className="col-span-full flex justify-center mt-10">
            <button
              type="submit"
              className="w-64 bg-white text-black text-xl font-semibold py-3 rounded-xl shadow-md hover:scale-105 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* Reusable Input Component */
function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="text-black font-medium mb-2 block">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-black outline-none py-2 text-black"
      />
    </div>
  );
}
