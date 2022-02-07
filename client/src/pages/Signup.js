import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    values: { email: "", password: "", passwordConfirmation: "" },
    errors: { error: "" },
  });

  const [signUpUser, { error }] = useMutation(SIGNUP_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      values: { ...formState.values, [name]: value },
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      if (formState.values.password !== formState.values.passwordConfirmation) {
        setFormState({
          values: { email: "", password: "", passwordConfirmation: "" },
          errors: {
            error: "Passwords doesn't match!",
          },
        });
        return;
      }
      if (formState.values.password.length < 5) {
        setFormState({
          values: { email: "", password: "", passwordConfirmation: "" },
          errors: {
            error: "Password needs to be at least 5 characters long!",
          },
        });
        return;
      }
      const { data } = await signUpUser({
        variables: {
          email: formState.values.email,
          password: formState.values.password,
        },
      });
      if (data.signUp === null) {
        setFormState({
          values: { email: "", password: "", passwordConfirmation: "" },
          errors: {
            error:
              "Incorrect credentials, please make sure you are using the email from where you receive the link for the website. If you are already an user please login.",
          },
        });
        return;
      }
      Auth.login(data.signUp.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      values: { email: "", password: "", passwordConfirmation: "" },
      errors: { error: "" },
    });
  };

  return (
    <div className="bg-cover bg-login-signup-bkg max-w-none flex h-screen justify-center items-center">
      <div className="bg-pearl-white shadow border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8">
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <h3 className="text-xl font-medium text-gray-900">
            Sign in to our wedding!
          </h3>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Your email (Plese enter the email from where you received the
              link)
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
              Create your password (Min lenght of 5 characters)
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
          </div>
          <div>
            <label
              htmlFor="passwordConfirmation"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Confirm your password
            </label>
            <input
              type="password"
              name="passwordConfirmation"
              value={formState?.values?.passwordConfirmation}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Sign up!
          </button>
          <div className="text-sm font-medium text-gray-500">
            Already a user?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
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

export default Signup;
