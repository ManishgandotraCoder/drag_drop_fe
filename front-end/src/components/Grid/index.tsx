import React, { useState } from "react";
import "./styles.css";
import { GridType, ItemType } from "./type";
import GridContainer from "./index.container";

const Grid: React.FC<GridType> = ({ items, onCardClick, onDragEnd }) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (index: number, item: ItemType) => {
    if (draggedIndex !== null) {
      onDragEnd(draggedIndex, index);
    }
    setDraggedIndex(null);
  };
  return (
    <GridContainer
      items={items}
      handleDragStart={handleDragStart}
      handleDragOver={handleDragOver}
      handleDrop={handleDrop}
      onCardClick={onCardClick}
    />
  );
};

export default Grid;
