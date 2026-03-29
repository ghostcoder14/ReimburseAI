import React, { useState } from "react";

const Profile = () => {
  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-white text-black p-6 rounded-xl">
      <h2 className="text-xl mb-4">My Profile</h2>

      <div className="flex items-center space-x-6">

        {/* Profile Image */}
        <div>
          {image ? (
            <img
              src={image}
              alt="profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
          )}

          <input type="file" onChange={handleImage} className="mt-2" />
        </div>

        {/* User Info */}
        <div>
          <p className="text-lg font-semibold">Sagar Sharma</p>
          <p className="text-sm text-gray-600">sagar@email.com</p>
          <p className="text-sm text-gray-600">Employee</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;