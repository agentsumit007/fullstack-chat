import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

const Fieldset = ({
  registerInstance,
  errorsInstance,
  name,
  placeholder,
  title,
  icon,
  type,
}) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <fieldset className="fieldset">
      <label className="input input-lg validator w-full">
        {icon && icon}
        <input
          type={type === "password" ? (showPass ? "text" : "password") : type}
          placeholder={placeholder}
          title={title}
          {...registerInstance(name)}
        />
        {type === "password" && (
          <div
            className="cursor-pointer"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <Eye size={24} /> : <EyeOff size={24} />}
          </div>
        )}
      </label>
      {errorsInstance?.[name] && (
        <p className="fieldset-label error">
          {errorsInstance?.[name]?.message}
        </p>
      )}
    </fieldset>
  );
};

export default Fieldset;
