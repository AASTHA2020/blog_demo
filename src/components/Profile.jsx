import React, { useState } from "react";
import profile from "../assets/profile.jpg";
import authlogin from "../store/authlogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Profile = () => {
  const { user } = authlogin();
  const username = user?.username || "";
  const password = user?.password || "";
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="mt-36 lg:mt-28 h-60">
      <section className="py-10 my-auto dark:bg-gray-900">
        <div className="lg:w-[80%] md:w-[90%] w-[96%] mx-auto flex gap-4">
          <div className="lg:w-[88%] sm:w-[88%] w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40 mb-10">
            <div>
              <h1 className="lg:text-2xl md:text-2xl text-xl font-sans font-semibold text-gray-700 mb-2 dark:text-white">
                Profile
              </h1>

              <form>
                <div className="w-full items-center">
                  <div>
                    <img
                      src={profile}
                      alt="Profile"
                      className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full object-cover"
                    />
                  </div>
                </div>

                <h2 className="text-center mt-3 font-semibold dark:text-gray-300">
                  Upload Profile and Cover Image
                </h2>

                <div className="flex flex-col lg:flex-row gap-2 justify-center w-full">
                  <div className="w-full mb-4 mt-6">
                    <label htmlFor="username" className="mb-2 dark:text-gray-300 block">
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      placeholder="Username"
                      value={username}
                      readOnly
                    />
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-2 justify-center w-full">
                  <div className="w-full">
                    <label htmlFor="password" className="dark:text-gray-300 mb-2 block">
                      Password
                    </label>
                    <div className="w-full flex items-center relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="w-full text-gray-700 border-2 rounded-lg p-4 pr-10 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                        value={password}
                        readOnly
                      />
                      <button
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 text-gray-600 dark:text-gray-300"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                  <button type="submit" className="w-full p-4">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
