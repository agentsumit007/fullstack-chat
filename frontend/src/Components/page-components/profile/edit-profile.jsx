import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Fieldset from "../../tools/fieldset";
import { svgIcons } from "../../../utils/svgIcons";
import { PencilRuler } from "lucide-react";
import { assets } from "../../../assets/assets-path";
import {
  updateProfile,
  uploadFileToStorage,
} from "../../../utils/api-functions";
import toast from "react-hot-toast";
import { setProfileData } from "../../../features/authSlice";

const EditProfile = ({ onClose }) => {
  const { fullName, email, profilePicture, additionalData } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        fullName: Yup.string().required().label("Full name"),
      })
    ),
    defaultValues: {
      fullName: fullName,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (profilePic) {
        const formData = new FormData();
        formData.append("file", profilePic);
        const {
          data: { data: uploadedFile },
        } = await uploadFileToStorage(formData);
        data["profilePicture"] = uploadedFile.secure_url;
        data["additionalData"] = {
          ...additionalData,
          uploadedPicture: uploadedFile,
        };
      }
      const {
        data: { data: updatedProfileData },
      } = await updateProfile(data);

      localStorage.setItem("user", JSON.stringify(updatedProfileData));
      dispatch(setProfileData(updatedProfileData));
      onClose();
    } catch (e) {
      toast.error(e.message);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  const onError = (data) => {
    console.log(data);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
  };

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div className="flex justify-center ">
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
            <img
              src={
                profilePic
                  ? URL.createObjectURL(profilePic)
                  : profilePicture || assets.DP_PLACEHOLDER
              }
            />
          </div>
          <input
            type="file"
            id="profile-pic-upload"
            onChange={handleFileChange}
            hidden
          />
          <label htmlFor="profile-pic-upload" className=" cursor-pointer">
            <PencilRuler
              strokeWidth={2.5}
              className="absolute bottom-0 end-0 text-primary"
            />
          </label>
        </div>
      </div>
      <h3 className="font-semibold text-center text-md opacity-75">{email}</h3>
      <Fieldset
        type={"text"}
        name={"fullName"}
        placeholder={"Full name"}
        title={"Full name"}
        registerInstance={register}
        errorsInstance={errors}
        icon={svgIcons.user}
      />
      <div className="flex justify-end gap-3">
        <button
          type="button"
          className="btn btn-outline btn-primary px-2 w-1/6"
          onClick={() => onClose()}
        >
          Close
        </button>
        {(watch("fullName") !== fullName || profilePic) !== null && (
          <button
            type="submit"
            className="btn btn-primary px-2 w-fit"
            disabled={loading}
          >
            {loading && <span className="loading loading-spinner"></span>}
            <span>Submit</span>
          </button>
        )}
      </div>
    </form>
  );
};

export default EditProfile;
