import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SEND_FORGOT_EMAIL } from "../utils/mutations";

const ForgotPassword = () => {
  const [formState, setFormState] = useState({
    values: { email: "" },
    errors: { error: "" },
  });

  const [sendForgotEmail, { error }] = useMutation(SEND_FORGOT_EMAIL);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      values: { ...formState.values, [name]: value },
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await sendForgotEmail({
        variables: { ...formState.values },
      });
      if (data.sendForgotEmail === null) {
        setFormState({
          values: { email: "" },
          errors: { error: "User not found!" },
        });
        return;
      }
      //   window.location.assign("/");
    } catch (e) {
      console.error(e);
    }

    setFormState({
      values: { email: "" },
      errors: { error: "" },
    });
  };

  return (
    <div className="bg-cover bg-login-signup-bkg max-w-none mx-auto  flex h-screen justify-center items-center">
      <div className="bg-pearl-white shadow border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8">
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <h3 className="text-xl font-medium text-gray-900">
            Forgot your password?
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
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Send Password Reset Email
          </button>
          {formState.errors?.error && (
            <div className="border text-center mt-3 border-red-900 font-bold text-red-900 sm:text-sm rounded-lg  block w-full p-2.5">
              <span className="text-xl">⚠</span>
              {formState.errors.error} <span className="text-xl">⚠</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
