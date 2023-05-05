import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// sign up state management
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //authentication from firebase
  const auth = getAuth();

  // handles the sign in submit and waits for the email and password for be verified.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col ">
      <h1 className="font-mono  p-3">Enter Your information below</h1>
      <form className=" flex flex-col gap-2 " onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          id="inline-full-name"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          id="inline-full-name"
        />
        <button
          className="font-mono shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded"
          type="submit"
        >
          Sign In
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default SignIn;
