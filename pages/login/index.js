import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import LoaderComponent from "../../components/LoaderComponent";
import { setProfileData } from "../../redux/profileSlice";
import apiRouter from "../../utils/apiRouter";
import { axiosPost } from "../../utils/axiosHelper";
import { localStorageKeys, secureKeys } from "../../utils/constant";
import { encodeData } from "../../utils/helper";
import router from "../../utils/router";
import toaster from "../../utils/toaster";

const Login = () => {
  // Const
  const { register, setValue, handleSubmit, watch, errors, reset } = useForm();
  const Router = useRouter();
  const dispatch = useDispatch();

  // State
  const [isLoading, setIsLoading] = useState(false);

  // Effects

  // Methods
  const handleFormSubmit = async (val) => {
    const { email, password } = val;
    const apiData = {
      email,
      password,
      loginType: "email",
    };

    try {
      setIsLoading(true);
      const result = await axiosPost(apiRouter.LOGIN, apiData);
      if (result.status) {
        await encodeData(
          result?.data,
          secureKeys.userData,
          localStorageKeys.userData
        );
        await dispatch(setProfileData(result.data));
        Router.push(router.HOME);
      } else {
        toaster("error", result.message);
      }
    } catch (error) {
      console.log("Error ::", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="middle-box text-center loginscreen animated fadeInDown">
      <div>
        <div>
          <h1 className="logo-name">EM</h1>
        </div>
        <h3>Welcome to EVENIMEX</h3>

        <p>Login in. To see it in action.</p>
        <form
          className="m-t"
          // role="form"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="form-group">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Username"
              ref={register({
                required: "Email is required",
              })}
            />
            {errors?.email && (
              <p className="m-t text-danger">{errors?.email?.message}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              ref={register({
                required: "Password is required",
              })}
            />
            {errors?.password && (
              <p className="m-t text-danger">{errors?.password?.message}</p>
            )}
          </div>
          <button className="btn btn-primary block full-width m-b">
            Login
          </button>

          {/* <a href="#">
            <small>Forgot password?</small>
          </a>
          <p className="text-muted text-center">
            <small>Do not have an account?</small>
          </p>
          <a className="btn btn-sm btn-white btn-block" href="register.html">
            Create an account
          </a> */}
        </form>
      </div>
      {isLoading && <LoaderComponent isLoading={isLoading} />}
    </div>
  );
};

export default Login;
