import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

const AddGuest = () => {
  const [formState, setFormState] = useState({
    values: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
      admin: false,
      plusOne: false,
      namePluseOne: "",
    },
    errors: { error: "" },
  });

  let history = useHistory();

  const [addUser, { error }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      values: { ...formState.values, [name]: value },
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("hola", formState.values.admin);
    try {
      const { data } = await addUser({
        variables: { ...formState.values },
      });
      if (data.addUser === null) {
        setFormState({
          errors: {
            error: "Please check you input all the required information",
          },
        });
        history.goBack();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-cover bg-login-signup-bkg max-w-none mx-auto  flex h-auto justify-center items-center">
      <div className="bg-pearl-white shadow border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8">
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <h3 className="text-xl font-medium text-gray-900">
            Please add information of new guest
          </h3>
          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Name*
            </label>
            <input
              type="name"
              name="name"
              value={formState?.values?.name}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Lastname*
            </label>
            <input
              type="lastname"
              name="lastname"
              value={formState?.values?.lastname}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="lastname"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Email*
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
              htmlFor="phone"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Phone*
            </label>
            <input
              type="phone"
              name="phone"
              value={formState?.values?.phone}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="61 456......"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="admin"
              className="form-check-label text-sm font-medium text-gray-700 block mb-1"
            >
              Admin?
            </label>
            <input
              type="checkbox"
              name="admin"
              value={formState?.values?.admin}
              className="cursor-pointer shadow-sm"
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="plusOne"
              className="form-check-label text-sm font-medium text-gray-700 block mb-1"
            >
              Plus One?
            </label>
            <input
              type="checkbox"
              name="plusOne"
              value={formState?.values?.plusOne}
              className="form-check-label text-sm font-medium text-gray-700 block mb-2"
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="namePlusOne"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Name of the Plus one?
            </label>
            <input
              type="namePlusOne"
              name="namePlusOne"
              value={formState?.values?.namePlusOne}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Add Guest
          </button>
          <button
            className="w-full text-white bg-blue-600 hover:bg-rose-900 focus:ring-4 focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={() => history.goBack()}
          >
            Cancel
          </button>
          {formState.errors?.error && (
            <div className="border mt-3 border-red-900 font-bold text-red-900 sm:text-sm rounded-lg  block w-full p-2.5">
              <span className="text-xl">⚠</span>
              {formState.errors.error} <span className="text-xl">⚠</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddGuest;
