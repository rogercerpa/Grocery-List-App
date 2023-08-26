import React, { useState } from "react";
import UserInfo from "./UserInfo";
import FollowInfo from "./FollowInfo";
import ActionButton from "./ActionButton";
import EditProfileForm from "./EditProfileForm";
import { PencilIcon } from "@heroicons/react/24/outline";

const ProfileCard = ({
  user,
  handleSignOut,
  handleEdit,
  editing,
  handleUsernameChange,
  handlePhotoChange,
  username,
  UserDefaultImage,
}) => {
  const [bannerImage, setBannerImage] = useState("");

  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className=" w-full max-w-3xl mx-auto bg-white shadow-xl hover:shadow rounded-lg">
      <div
        className="relative w-full h-20"
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
        }}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="bannerUpload"
          onChange={handleBannerChange}
        />
        <PencilIcon
          className="h-6 w-6 text-gray-500 absolute bottom-2 right-2 cursor-pointer"
          onClick={() => document.getElementById("bannerUpload").click()}
        />
      </div>
      <div className="">
        <img
          className="w-32 mx-auto rounded-full -mt-20 border-8 border-white z-10"
          src={UserDefaultImage}
          alt="ProfileImage"
        />
      </div>
      <UserInfo user={user} username={username} />
      <FollowInfo followers={user.followers} following={user.following} />
      <ActionButton
        label="Sign Out"
        className="bg-red-600 hover:bg-yellow-500"
        onClick={handleSignOut}
      />
      <ActionButton
        label={editing ? "Cancel" : "Edit"}
        className="bg-green-600 hover:bg-purple-500"
        onClick={handleEdit}
      />

      {editing && (
        <EditProfileForm
          handleUsernameChange={handleUsernameChange}
          handlePhotoChange={handlePhotoChange}
          username={username}
        />
      )}
    </div>
  );
};

export default ProfileCard;
