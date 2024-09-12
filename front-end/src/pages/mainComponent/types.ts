export interface ItemType {
  image: string;
  title: string;
  position: number;
  id: string;
}
export interface MainContainerType {
  handleDragEnd: (fromIndex: number, toIndex: number) => void;
  selectedImage: string | null;
  handleCloseModal: () => void;
  handleCardClick: (image: string) => void;
  items: ItemType[];
}
