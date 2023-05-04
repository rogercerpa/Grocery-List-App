import React from "react";
import { getAuth, signOut } from "firebase/auth";

// handles authentication to show profile
function Profile({ user }) {
  const auth = getAuth();
  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <h1>Profile</h1>
      {user && (
        <div>
          <p>Email: {user.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
}

export default Profile;
