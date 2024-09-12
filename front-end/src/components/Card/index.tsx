import React, { useState } from "react";
import "./styles.css";
import { CardContainerType } from "./type";
import Cardcontainer from "./index.container";

const Card: React.FC<CardContainerType> = ({ item, onCardClick }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  return (
    <Cardcontainer
      handleImageLoaded={handleImageLoaded}
      isLoading={isLoading}
      onCardClick={onCardClick}
      item={item}
    />
  );
};

export default Card;
