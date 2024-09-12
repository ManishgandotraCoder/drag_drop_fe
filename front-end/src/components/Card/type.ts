// Define the interface for props
export interface ItemType {
  image: string;
  title: string;
  position: number;
}

export type CardContainerType = {
  onCardClick: (image: string) => void;
  item: ItemType;
  isLoading?: boolean;
  handleImageLoaded?: () => void;
};
