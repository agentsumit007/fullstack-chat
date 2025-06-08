import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../../features/authSlice";
import RotatingVisual from "../../page-components/home/rotating-visual";
import { LogOut } from "lucide-react";
import { assets } from "../../../assets/assets-path";
import Modal from "../../tools/Modal";
import EditProfile from "../../page-components/profile/edit-profile";
import ThemeChanger from "../../tools/ThemeChanger";
import { config } from "../../../../config";

const Header = () => {
  const { isLoggedIn, profilePicture } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const openModal = (data) => {
    setModalData(data);
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
    setTimeout(() => {
      setModalData(null);
    }, 250);
  };

  const { visibleScreen } = useSelector((state) => state.settings);
  const location = useLocation();
  const hideHeader =
    location.pathname === "/messages" && visibleScreen === "chat";

  return (
    <div
      className={`!bg-base-200 navbar mb-2 lg:mb-4 ${
        hideHeader ? "hidden lg:flex" : "flex"
      }`}
    >
      <Link to={"/"} className="lg:ps-4 flex items-center gap-3 cursor-pointer">
        <RotatingVisual visualSize={50} />
        <span className="text-lg font-bold hidden lg:block">
          {config.websiteName}
        </span>
      </Link>
      <div className="hidden lg:flex grow justify-end px-2 ">
        <div className="flex items-center">
          <a
            className="btn btn-ghost rounded-field"
            onClick={() =>
              openModal({
                title: "Your profile",
                component: <EditProfile onClose={closeModal} />,
              })
            }
          >
            <img
              className="h-[40px] w-[40px] rounded-full"
              src={profilePicture || assets.DP_PLACEHOLDER}
              alt=""
            />
          </a>
          <div className="px-2">
            <ThemeChanger />
          </div>
          <a
            className="btn btn-ghost rounded-field flex items-center gap-3"
            onClick={(e) => handleLogout()}
          >
            <LogOut />
            Logout
          </a>
        </div>
      </div>
      <a className="text-lg font-bold  lg:hidden w-full text-center">
        {config.websiteName}
      </a>

      <div className="flex lg:hidden grow justify-end ">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="h-[40px] w-[40px]">
            <img
              className="rounded-full  h-[40px] w-[40px] object-cover"
              src={profilePicture || assets.DP_PLACEHOLDER}
              alt=""
            />
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm"
          >
            <li
              onClick={() =>
                openModal({
                  title: "Your profile",
                  component: <EditProfile onClose={closeModal} />,
                })
              }
            >
              <a>You</a>
            </li>
            <li onClick={(e) => handleLogout()}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>

      <Modal isOpen={modal} onClose={closeModal} data={modalData}>
        {modalData?.component}
      </Modal>
    </div>
  );
};

export default Header;
