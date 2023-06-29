import React from "react";

const UserInfo = ({ user, username }) => {
  return (
    <div>
      <h1>Profile</h1>
      <p className="text-center mt-2 text-3xl font-medium">{username}</p>
      <p className="text-center mt-2 font-light text-sm">{user.email}</p>
      <p className="text-center font-normal text-lg">{user.location}</p>
      <p className="px-6 text-center mt-2 font-light text-sm">
        Bio: {user.bio}
      </p>
      <hr className="mt-8"></hr>
    </div>
  );
};

export default UserInfo;
