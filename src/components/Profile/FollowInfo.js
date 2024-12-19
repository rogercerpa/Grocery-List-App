import React from "react";

const FollowInfo = ({ followers, following }) => {
  return (
    <div className="flex p-4">
      <div className="w-1/2 text-center">
        <span className="font-bold">{followers}0</span> Followers
      </div>
      <div className="w-0 border border-gray-300"></div>
      <div className="w-1/2 text-center">
        <span className="font-bold">{following}0</span> Following
      </div>
    </div>
  );
};

export default FollowInfo;
