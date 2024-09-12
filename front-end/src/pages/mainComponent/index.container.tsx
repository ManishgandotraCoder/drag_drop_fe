import Grid from "../../components/Grid";
import Modal from "../../components/Modal";
import { MainContainerType } from "./types";

const MainContainerComponent = ({
  items,
  handleDragEnd,
  selectedImage,
  handleCloseModal,
  handleCardClick,
}: MainContainerType) => {
  return (
    <>
      <Grid
        items={items}
        onCardClick={handleCardClick}
        onDragEnd={handleDragEnd}
      />
      {selectedImage && (
        <Modal image={selectedImage} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default MainContainerComponent;
