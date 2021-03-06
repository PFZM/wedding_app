import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { EDIT_USER } from "../utils/mutations";
import Loading from "../components/Loading";

const ViewAndEditGuest = () => {
  const params = useParams();

  const { loading, data } = useQuery(QUERY_USER, {
    variables: {
      id: params.ID,
    },
  });

  const [formState, setFormState] = useState({
    values: {
      name: null,
      lastname: null,
      email: null,
      phone: null,
      admin: null,
      plusOne: null,
      namePluseOne: null,
    },
    errors: { error: "" },
  });
  if (!loading && formState.values.name === null) {
    setFormState({
      ...formState,
      values: {
        name: data.user.name,
        lastname: data.user.lastname,
        email: data.user.email,
        phone: data.user.phone,
        admin: data.user.admin,
        plusOne: data.user.plusOne,
        namePluseOne: data.user.namePlusOne,
      },
    });
  }

  let history = useHistory();

  const [editUser, { error }] = useMutation(EDIT_USER);

  const handleChange = (event) => {
    let value, name;
    const inputEl = event.target;
    if (inputEl.type === "checkbox") {
      [name, value] = [inputEl.name, inputEl.checked];
    } else {
      [name, value] = [inputEl.name, inputEl.value];
    }

    setFormState({
      values: { ...formState.values, [name]: value },
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await editUser({
        variables: { ...formState.values, id: params.ID },
      });
      if (data.editUser === null) {
        setFormState({
          errors: {
            error: "Please check you input all the required information",
          },
        });
        return;
      }
      history.goBack();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-cover bg-login-signup-bkg max-w-none flex justify-center items-center">
          <div className="bg-pearl-white shadow border border-gray-200 min-w-[40%] rounded-lg max-w-sm p-4 sm:p-6 lg:p-8">
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <h3 className="text-xl font-medium text-gray-900">
                View & Edit Guest
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
                  checked={formState?.values?.admin}
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
                  checked={formState?.values?.plusOne}
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
                Edit
              </button>
              <button
                className="w-full text-white bg-blue-600 hover:bg-rose-900 focus:ring-4 focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={() => history.goBack()}
              >
                Cancel
              </button>
              {formState.errors?.error && (
                <div className="border mt-3 border-red-900 font-bold text-red-900 sm:text-sm rounded-lg  block w-full p-2.5">
                  <span className="text-xl">???</span>
                  {formState.errors.error} <span className="text-xl">???</span>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewAndEditGuest;
