import React from "react";
import { getAuth, signOut } from "firebase/auth";
import Modal from "react-modal";
Modal.setAppElement("#root");

// handles authentication to show profile
function Profile({ user }) {
  const auth = getAuth();
  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <Modal className=" bg-white p-6 rounded-md shadow-md w-96 max-w-full mx-auto m-20 ">
      <div>
        <h1>Profile</h1>
        {user && (
          <div>
            <p>Email: {user.email}</p>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default Profile;
