// Define the interface for props
export interface ItemType {
  image: string;
  title: string;
  position: number;
  id: string;
}

export interface GridType {
  items: ItemType[];
  onCardClick: (image: string) => void;
  onDragEnd: (fromIndex: number, toIndex: number) => void;
}
export type GridContainerType = {
  items: ItemType[];
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (index: number, item: ItemType) => void;
  onCardClick: (image: string) => void;
  handleDragStart: (index: number) => void;
};
