import { useState } from "react";
import Modal from "../../tools/Modal";
import RotatingVisual from "../home/rotating-visual";
import StartForm from "./start-form";

const NoChat = () => {
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const openModal = (data) => {
    setModalData(data);
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
    setTimeout(() => {
      setModalData(null);
    }, 200);
  };
  return (
    <div className="h-full flex flex-col gap-4 items-center justify-center">
      <RotatingVisual visualSize={200} />
      <h2>Select a chat</h2>
      <h3>or</h3>
      <button
        className="btn btn-primary"
        onClick={() =>
          openModal({
            title: "Enter e-mail of the user you want to chat",
            component: <StartForm close={closeModal} />,
          })
        }
      >
        Start new conversation
      </button>
      <Modal isOpen={modal} data={modalData}>
        {modalData?.component}
      </Modal>
    </div>
  );
};

export default NoChat;
