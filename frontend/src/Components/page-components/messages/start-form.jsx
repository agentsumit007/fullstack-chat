import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Fieldset from "../../tools/fieldset";
import { svgIcons } from "../../../utils/svgIcons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { accessChatByEmail } from "../../../utils/api-functions";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setSelectedChat } from "../../../features/selectedChatSlice";
import { setVisibleScreen } from "../../../features/settingsSlice";
const StartForm = ({ close }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: accessChatByEmail,
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      dispatch(setSelectedChat(res?.data?.chat));
      dispatch(setVisibleScreen("chat"));
      queryClient.invalidateQueries("chat-users");
      close();
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        email: Yup.string().required().label("E-mail"),
      })
    ),
  });
  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Fieldset
          type={"text"}
          registerInstance={register}
          name={"email"}
          placeholder={"E-mail"}
          title={"E-mail"}
          icon={svgIcons.mail}
          errorsInstance={errors}
        />
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => close()}
            className="btn btn-outline btn-primary px-3"
          >
            Close
          </button>
          <button type="submit" className="btn btn-primary px-3">
            Start chatting
          </button>
        </div>
      </form>
    </>
  );
};

export default StartForm;
