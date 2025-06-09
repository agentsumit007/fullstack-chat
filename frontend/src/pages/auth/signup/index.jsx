import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { clearStatus, login, registerForm } from "../../../features/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Warehouse } from "lucide-react";
import RotatingVisual from "../../../Components/page-components/home/rotating-visual";
import Fieldset from "../../../Components/tools/fieldset";
import { svgIcons } from "../../../utils/svgIcons";
import ThemeChanger from "../../../Components/tools/ThemeChanger";
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, success, error, message, isLoggedIn } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (success) {
      toast.success(message);
      dispatch(clearStatus());
      // navigate("/messages");
    }
    if (error) {
      toast.error(message);
      dispatch(clearStatus());
    }
  }, [success, error]);

  if (isLoggedIn) {
    navigate("/messages");
  }

  const schema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required").label("Full name"),
    email: Yup.string().email().required("Email is required").label("E-mail"),
    password: Yup.string().required("Password is required").label("Password"),
    confirmPassword: Yup.string()
      .test(
        "confirm-password",
        "Confirm password must be same as password",
        (val) => {
          return val === watch("password");
        }
      )
      .required("Confirm password is required")
      .label("Confirm password"),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    dispatch(registerForm(data));
  };
  const onError = (data) => {
    console.log(data);
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2  bg-base-100">
      <div className="absolute end-5 top-5">
        <ThemeChanger />
      </div>
      <div className="hidden lg:flex items-center justify-center flex-col  hero bg-base-200 min-h-screen">
        <RotatingVisual visualSize={500} />
      </div>
      <div className="flex justify-center items-center min-h-screen ">
        <div className="card bg-base-100 w-96 ">
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="card-body flex flex-col gap-6 lg:p-0 h-[700px] lg:h-full"
          >
            <div className="flex flex-col items-center gap-10">
              <Warehouse
                className="self-center hidden lg:block"
                size={60}
                strokeWidth={1}
              />
              <div
                className="lg:hidden"
                role="button"
                onClick={() => navigate("/")}
              >
                <RotatingVisual visualSize={100} />
              </div>
              <h2 className="text-4xl font-bold card-title self-center">
                Register
              </h2>
            </div>
            <h4 className="text-lg text-center">Create an account for free</h4>
            <Fieldset
              type={"text"}
              registerInstance={register}
              name={"fullName"}
              placeholder={"Full name"}
              title={"Full name"}
              icon={svgIcons.user}
              errorsInstance={errors}
            />
            <Fieldset
              type={"text"}
              registerInstance={register}
              name={"email"}
              placeholder={"E-mail"}
              title={"E-mail"}
              icon={svgIcons.mail}
              errorsInstance={errors}
            />
            <Fieldset
              type={"password"}
              registerInstance={register}
              name={"password"}
              placeholder={"Password"}
              title={"Password"}
              icon={svgIcons.password}
              errorsInstance={errors}
            />
            <Fieldset
              type={"password"}
              registerInstance={register}
              name={"confirmPassword"}
              placeholder={"Confirm password"}
              title={"Confirm password"}
              icon={svgIcons.password}
              errorsInstance={errors}
            />

            <div className="card-actions justify-center">
              <button
                type="submit"
                className="btn btn-primary flex gap-2 w-full mb-2"
                disabled={isLoading}
              >
                {isLoading && <span className="loading loading-spinner"></span>}
                <span>Register</span>
              </button>
              <p className="text-center">
                <span>Already have an account?</span>
                <a
                  className="link link-hover"
                  onClick={() => navigate("/auth/login")}
                >
                  {" "}
                  Sign in to get started.
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
