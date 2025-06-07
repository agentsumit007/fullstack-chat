import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { clearStatus, login } from "../../../features/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Warehouse } from "lucide-react";
import RotatingVisual from "../../../Components/page-components/home/rotating-visual";
import Fieldset from "../../../Components/tools/fieldset";
import { svgIcons } from "../../../utils/svgIcons";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, success, error, message, isLoggedIn } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if(isLoggedIn) {
      navigate('/messages')
    }
    if (success) {
      toast.success(message);
      dispatch(clearStatus());
      navigate("/messages");
    }
    if (error) {
      toast.error(message);
      dispatch(clearStatus());
    }
  }, [success, error, isLoggedIn]);

  const schema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    dispatch(login(data));
  };
  const onError = (data) => {
    console.log(data);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 bg-base-100">
      <div className="hidden lg:flex items-center justify-center flex-col  hero bg-base-200 min-h-screen">
        <RotatingVisual visualSize={500} />
      </div>
      <div className="flex justify-center items-center min-h-screen">
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
                Login
              </h2>
            </div>
            <h4 className="text-lg text-center">
              Login with your existing account
            </h4>
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

            <div className="card-actions justify-center">
              <button
                type="submit"
                className="btn btn-primary flex gap-2 w-full mb-2"
                disabled={isLoading}
              >
                {isLoading && <span className="loading loading-spinner"></span>}
                <span>Login</span>
              </button>
              <p className="text-center">
                <span>Don't have an account?</span>
                <a
                  className="link link-hover"
                  onClick={() => navigate("/auth/sign-up")}
                >
                  {" "}
                  We'll help you create one.
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
