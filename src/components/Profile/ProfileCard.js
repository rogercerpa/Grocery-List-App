import React from "react";
import UserInfo from "./UserInfo";
import ProductCategories from './ProductCategories';

const ProfileCard = ({
  user,
  username,
  UserDefaultImage,
}) => {

  return (
    <div className=" w-full max-w-3xl mx-auto bg-white shadow-xl hover:shadow rounded-lg">
      <div className="">
        {/* <img
          className="w-32 mx-auto rounded-full -mt-20 border-8 border-white z-10"
          src={UserDefaultImage}
          alt="ProfileImage"
        /> */}
      </div>
      <UserInfo user={user} username={username} />
      <ProductCategories userUID={user.uid}/>

    </div>
  );
};

export default ProfileCard;
