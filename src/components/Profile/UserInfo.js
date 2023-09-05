import React from "react";

const UserInfo = ({ user, username }) => {
  return (
    <div className="">
      <h1 className="text-3xl font-medium">Profile</h1>
      <p className="text-center mt-2 text-2xl font-medium">Username: {username}</p>
      <p className="text-center mt-2 font-light text-sm">{user.email}</p>
      <hr className="mt-8"></hr>
    </div>
  );
};

export default UserInfo;
