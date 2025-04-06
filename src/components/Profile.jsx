import React, { useState } from "react";
import profile from "../assets/profile.jpg";
import authlogin from "../store/authlogin";
import { FaEye, FaEyeSlash } from "react-icons/fa"; //

const Profile = () => {
  const { username, password } = authlogin();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
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
                <div className="w-full rounded-sm bg-[url(/assets/profile.jpg)]bg-cover bg-center bg-no-repeat items-center">
                  <div>
                    <img
                      src={profile}
                      alt=""
                      className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-[{profile}] bg-cover bg-center bg-no-repeat"
                    />
                  </div>
                </div>
                <h2 className="text-center mt-3 font-semibold dark:text-gray-300">
                  Upload Profile and Cover Image
                </h2>
                <div className="flex flex-col lg:flex-row gap-2 justify-center w-full">
                  <div className="w-full  mb-4 mt-6">
                    <label for="" className="mb-2 dark:text-gray-300">
                      Username
                    </label>
                    <input
                      type="text"
                      class="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      placeholder="First Name"
                      value={username}
                    />
                  </div>
                  {/* <div className="w-full  mb-4 lg:mt-6">
                    <label for="" className=" dark:text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      placeholder="Last Name"
                    />
                  </div> */}
                </div>

                <div className="flex flex-col lg:flex-row  gap-2 justify-center w-full">
                  <div className="w-full">
                    <h3 className="dark:text-gray-300 mb-2">Password</h3>
                    <div className="w-full flex">

                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full text-grey border-2 rounded-lg p-4 pl-2 pr-2 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      value={password}
                    />
                    <button onClick={togglePasswordVisibility}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    </div>
                  </div>
                </div>
                <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                  <button type="submit" className="w-full p-4 ">
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
