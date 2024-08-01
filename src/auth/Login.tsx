import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axiosInstance from "../config/AxiosInterceptors";
import { useNavigate } from "react-router-dom";
interface values {
  emailOrUsername: string,
  password: string
}

interface tsPayload {
  email?: string;
  username?: string;
  password: string
}
const validate = (values: values) => {
  const errors: { [key: string]: string } = {};

  // Check if the input is either a valid email or username
  const isEmail = /\S+@\S+\.\S+/.test(values.emailOrUsername);

  if (!values.emailOrUsername) {
    errors.emailOrUsername = "Email or username is required";
  } else if (!isEmail && values.emailOrUsername.trim() === "") {
    errors.emailOrUsername = "Username cannot be empty";
  } else if (isEmail && !/\S+@\S+\.\S+/.test(values.emailOrUsername)) {
    errors.emailOrUsername = "Invalid email format";
  }

  // Validate password
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  return errors;
};

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen w-full flex justify-center items-center">
      <div className="bg-mainBackgroundColor w-[400px] rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Login
        </h2>
        <Formik
          initialValues={{
            emailOrUsername: "",
            password: "",
          }}
          validate={validate}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const payload: tsPayload = {
                password: values.password,
              };
              const isEmail = /\S+@\S+\.\S+/.test(values.emailOrUsername);

              // Determine if the input is an email or username
              if (isEmail) {
                payload.email = values.emailOrUsername;
              } else {
                payload.username = values.emailOrUsername;
              }

              const response = await axiosInstance.post('/login', payload);
              console.log(response, "Whole response");

              console.log('Login successful:', response.data);

              if (response.status === 200) {
                localStorage.setItem("jwt",response.data.token)
                navigate("/");
              }
            } catch (error) {
              console.error('Login error:', error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="emailOrUsername" className="block text-gray-400 mb-2">
                  Email or Username
                </label>
                <Field
                  type="text"
                  name="emailOrUsername"
                  placeholder="Enter email or username"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  id="emailOrUsername"
                />
                <ErrorMessage name="emailOrUsername" component="p" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-400 mb-2">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  id="password"
                />
                <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
