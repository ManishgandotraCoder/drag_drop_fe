import LoaderComponent from "../Loader";
import { CardContainerType } from "./type";
import "./styles.css";
const Cardcontainer = ({
  onCardClick,
  item,
  isLoading,
  handleImageLoaded,
}: CardContainerType) => {
  return (
    <div className="card" onClick={() => onCardClick(item.image)}>
      {isLoading && <LoaderComponent />}
      <img
        src={`/images/${item.image}`}
        alt={item.title}
        onLoad={handleImageLoaded}
        style={{ display: isLoading ? "none" : "block" }}
      />
      <h3>{item.title}</h3>
    </div>
  );
};

export default Cardcontainer;
