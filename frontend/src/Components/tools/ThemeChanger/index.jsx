import { MoonStar, Sun } from "lucide-react";
import { themes } from "../../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../../features/settingsSlice";

const ThemeChanger = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.settings);
  const handleChangeTheme = (type) => {
    if (type) {
      dispatch(setTheme(themes[1]));
      localStorage.setItem("theme-var", themes[1]);
    } else {
      dispatch(setTheme(themes[0]));
      localStorage.setItem("theme-var", themes[0]);
    }
  };
  return (
    <div>
      <label className="toggle toggle-xl text-base-content">
        <input
          checked={theme === themes[1] ? true : false}
          type="checkbox"
          onChange={(e) => handleChangeTheme(e.target.checked)}
        />
        <Sun />
        <MoonStar />
      </label>
    </div>
  );
};

export default ThemeChanger;
