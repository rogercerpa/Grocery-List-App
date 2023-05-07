import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Logo from "../assets/logo.png";

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
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto" src={Logo} alt="Your Company" />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className=" flex flex-col gap-2 " onSubmit={handleSubmit}>
          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div class="mt-2">
              <input
                id="email"
                name="email"
                autocomplete="email"
                required
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div class="text-sm">
                <a
                  href="/"
                  class="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div class="mt-2">
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="password"
                name="password"
                autocomplete="current-password"
                required
              />
            </div>
          </div>

          <div>
            <button
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
        <p class="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <a
            href="/"
            class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Start a 14 day free trial
          </a>
        </p>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default SignIn;
