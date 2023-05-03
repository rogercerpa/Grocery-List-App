import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Profile from "./Profile";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");

export default function Header(props) {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const { darkMode, toggleDarkMode, user, setUser } = props;

  return (
    <nav className={darkMode ? "dark" : ""}>
      <div className="flex items-center">
        <p className="toggler--light">Light</p>
        <div
          className="w-6 h-3 bg-[#2B283A] rounded-full mx-1 cursor-pointer flex items-center justify-start border border-black box-content"
          onClick={toggleDarkMode}
        >
          <div className="toggler--slider--circle"></div>
        </div>
        <p className="toggler--dark">Dark</p>
        {!user && (
          <>
            <button onClick={() => setShowSignUp(true)}>
              <FaUserPlus />
            </button>
            <button onClick={() => setShowSignIn(true)}>
              <FaSignInAlt />
            </button>
            <Modal
              isOpen={showSignUp}
              onRequestClose={() => setShowSignUp(false)}
            >
              <button onClick={() => setShowSignUp(false)}>Close</button>
              <SignUp setUser={setUser} />
            </Modal>
            <Modal
              isOpen={showSignIn}
              onRequestClose={() => setShowSignIn(false)}
            >
              <button onClick={() => setShowSignIn(false)}>Close</button>
              <SignIn setUser={setUser} />
            </Modal>
          </>
        )}
        {user && <Profile user={user} setUser={setUser} />}
      </div>
    </nav>
  );
}
