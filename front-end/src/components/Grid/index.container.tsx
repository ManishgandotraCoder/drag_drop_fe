import React from "react";
import Card from "../Card";
import { GridContainerType } from "./type";

const GridContainer: React.FC<GridContainerType> = ({
  items,
  handleDragStart,
  handleDragOver,
  handleDrop,
  onCardClick,
}) => {
  return (
    <div className="grid">
      {items?.map((item, index) => (
        <div
          key={item.image}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(index, item)}
        >
          <Card item={item} onCardClick={onCardClick} />
        </div>
      ))}
    </div>
  );
};

export default GridContainer;
