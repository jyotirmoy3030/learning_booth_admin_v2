import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { adminLogin } from "services/Auth/Login";
import { toast } from "react-toastify";

// Import images correctly
import dr15_1 from "../../../assets/images/dr15_1.png";
import dr15_2 from "../../../assets/images/dr15_2.png";
import characterImg from "../../../assets/images/character-1.png";
import googleImg from "../../../assets/images/image_24624.png";
import logo from '../../../assets/images/icons/logo.png';

// CSS Import
import "./Authlogin.css"; // Ensure you have the required styles

const styles = {
  topBg: {
    position: "absolute",
    width: "100%",
    height: "100vh",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top center",
    backgroundImage: `url(${dr15_1})`,
    zIndex: -999,
    top: "-50%",
  },
  bottomBg: {
    position: "absolute",
    width: "100%",
    height: "100vh",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom center",
    backgroundImage: `url(${dr15_2})`,
    zIndex: -1,
    bottom: "-5%",
  },
};

const AuthLogin = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <div>
      {/* Background Images */}
      <div className="top-bg" style={styles.topBg}></div>

      <div className="container">
        {/* Illustration */}
        <div className="illustration">
          <img src={characterImg} alt="Illustration" />
        </div>

        {/* Login Form with Formik */}
        <div className="login-box">
          <div className="logo-container">
            <div className="login-logo">
              <img src={logo} alt="Google" />
            </div>
          </div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Must be a valid email")
                .required("Email is required"),
              password: Yup.string().required("Password is required"),
            })}
            onSubmit={async (values, { setErrors, setSubmitting }) => {
              try {
                // values.rememberMe = checked;
                const response = await adminLogin(values);
                localStorage.setItem("token", response?.data?.accessToken);
                if ([200, 201].includes(response.status)) {
                  navigate("/dashboard");
                  window.location.reload();
                }
                toast.success(response?.data?.message || "Logged In Successfully!");
              } catch (err) {
                const errorMessage = err.response?.data?.message || "ERROR: Cannot login.";
                toast.error(errorMessage);
                setErrors({ submit: errorMessage });
              }
              setSubmitting(false);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form noValidate onSubmit={handleSubmit}>
                {/* Email Input */}
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className={touched.email && errors.email ? "error-input" : ""}
                />
                {touched.email && errors.email && (
                  <p className="error-text">{errors.email}</p>
                )}

                {/* Password Input */}
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className={touched.password && errors.password ? "error-input" : ""}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <p className="error-text">{errors.password}</p>
                )}

                {/* Remember Me Checkbox */}
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                  />
                  Keep me signed in
                </label>

                {/* Submit Button */}
                <button className="login-btn" type="submit" disabled={isSubmitting}>
                  Login
                </button>

                {/* Google Login Button */}
                {/* <div className="google-btn-container">
                  <button className="google-btn" type="button">
                    <img src={googleImg} alt="Google" /> Continue With Google
                  </button>
                </div> */}
              </form>
            )}
          </Formik>
        </div>
      </div>

      {/* Bottom Background */}
      <div className="bottom-bg" style={styles.bottomBg}></div>
    </div>
  );
};

export default AuthLogin;
