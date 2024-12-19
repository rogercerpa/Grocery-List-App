import React from "react";
import UserInfo from "./UserInfo";
import ProductCategories from './ProductCategories';

const ProfileCard = ({
  user,
  username,
}) => {

  return (
    <div className=" w-full max-w-3xl mx-auto bg-white  hover:shadow rounded-lg">
      <UserInfo user={user} username={username} />
      <ProductCategories userUID={user.uid}/>
    </div>
  );
};

export default ProfileCard;
