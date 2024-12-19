import React from "react";

const EditProfileForm = ({
  handleUsernameChange,
  handlePhotoChange,
  username,
}) => {
  return (
    <form className="mt-8 mb-2 w-full max-w-screen-lg sm:w-96 border-gray-300 p-2 rounded-md">
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          class="w-full border-gray-300 p-2 rounded-md"
        />
      </label>
      <label>
        Profile picture:
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          class="w-full border-gray-300 p-2 rounded-md"
        />
      </label>
      <button
        type="submit"
        class="w-full bg-blue-500 text-white p-2 rounded-md"
      >
        Save
      </button>
    </form>
  );
};

export default EditProfileForm;
