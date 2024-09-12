import { ModalContainerType } from "./types";

const ModalContainer = ({ onClose, image }: ModalContainerType) => {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <img src={`/images/${image}`} alt={image} />
      </div>
    </div>
  );
};

export default ModalContainer;
