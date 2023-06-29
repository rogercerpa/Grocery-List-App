import React from "react";
import UserInfo from "./UserInfo";
import FollowInfo from "./FollowInfo";
import ActionButton from "./ActionButton";
import EditProfileForm from "./EditProfileForm";

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
  return (
    <div className="card w-96 mx-auto bg-white shadow-xl hover:shadow rounded-lg">
      <img
        className="w-32 mx-auto rounded-full -mt-20 border-8 border-white"
        src={UserDefaultImage}
        alt="ProfileImage"
      />

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
