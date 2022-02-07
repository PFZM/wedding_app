import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Login = () => {
  const [formState, setFormState] = useState({
    values: { email: "", password: "" },
    errors: { error: "" },
  });

  const [login, { error }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      values: { ...formState.values, [name]: value },
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState.values },
      });
      if (data.login === null) {
        setFormState({
          values: { email: "", password: "" },
          errors: { error: "Incorrect credentials" },
        });
        return;
      }
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      values: { email: "", password: "" },
      errors: { error: "" },
    });
  };

  return (
    <div className="bg-cover bg-login-signup-bkg max-w-none mx-auto  flex h-screen justify-center items-center">
      <div className="bg-pearl-white shadow border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8">
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <h3 className="text-xl font-medium text-gray-900">
            Welcome back! Please log-in
          </h3>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              value={formState?.values?.email}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder=".......@email.com"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              value={formState?.values?.password}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              onChange={handleChange}
            />
            <div className=" ml-auto mt-3 ">
              <Link
                to="/forgotpassword"
                className="text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login to your account
          </button>
          <div className="text-sm font-medium text-gray-500">
            Not registered?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
            {formState.errors?.error && (
              <div className="border mt-3 border-red-900 font-bold text-red-900 sm:text-sm rounded-lg  block w-full p-2.5">
                <span className="text-xl">⚠</span>
                {formState.errors.error} <span className="text-xl">⚠</span>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
