import { MoonStar, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../../features/settingsSlice";
import { themes } from "../../../../config";
import { useEffect } from "react";

const ThemeChanger = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.settings);
  useEffect(() => {
    const currTheme = localStorage.getItem("theme-var") || themes[1];
    setThemeValue(currTheme);
  }, []);
  const handleChangeTheme = (type) => {
    if (type) {
      setThemeValue(themes[1]);
    } else {
      setThemeValue(themes[0]);
    }
  };
  const setThemeValue = (val) => {
    dispatch(setTheme(val));
    localStorage.setItem("theme-var", val);
    document.documentElement.setAttribute("data-theme", val);
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
