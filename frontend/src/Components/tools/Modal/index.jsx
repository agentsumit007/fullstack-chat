import { useRef } from "react";

const Modal = ({ isOpen, onClose, data, children }) => {
  const modalRef = useRef(null);

  if (modalRef.current) {
    if (isOpen) {
      !modalRef.current.open && modalRef.current.showModal();
    } else {
      modalRef.current.open && modalRef.current.close();
    }
  }

  return (
    <dialog
      ref={modalRef}
      className="modal modal-bottom sm:modal-middle"
      onClose={onClose}
    >
      <div className="modal-box flex flex-col gap-4">
        <h3 className="font-bold text-lg">{data?.title || ""}</h3>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
