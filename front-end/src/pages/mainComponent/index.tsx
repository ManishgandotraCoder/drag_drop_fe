import React, { useState, useEffect, useRef } from "react";
import { ItemType } from "./types";
import MainContainerComponent from "./index.container";
import "./styles.css";
import * as recordActions from "../../redux/actions/record.actions";
import { useDispatch, useSelector } from "react-redux";

const RecordComponent: React.FC = () => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false); // State to track if saving is in progress
  const [lastSaveTime, setLastSaveTime] = useState<number | null>(null); // Time since last save
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.record);
  const recordsList = user?.recordsList || [];
  const previousItemsRef = useRef<ItemType[]>([]); // To track previous items state for comparison

  // Handle card click to view image
  const handleCardClick = (image: string) => {
    setSelectedImage(image);
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // Handle drag-and-drop sorting
  const handleDragEnd = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  // Fetch records on initial load
  useEffect(() => {
    const fetchData = async () => {
      dispatch(await recordActions.getRecords());
    };
    fetchData();
  }, [dispatch]);

  // Update items when recordsList changes
  useEffect(() => {
    setItems(recordsList);
    previousItemsRef.current = recordsList; // Initialize the previous items reference
  }, [recordsList]);

  // Save records only if there are changes
  const saveRecords = async () => {
    if (JSON.stringify(previousItemsRef.current) !== JSON.stringify(items)) {
      setIsSaving(true);
      await dispatch(await recordActions.updateRecords(items, user.currentId)); // Save the records (assuming saveRecords is an action)
      setIsSaving(false);
      setLastSaveTime(Date.now());
      previousItemsRef.current = items; // Update the previous items reference after saving
    }
  };

  // Trigger saving every 5 seconds if changes were made
  useEffect(() => {
    const interval = setInterval(() => {
      saveRecords();
    }, 5000);
    return () => clearInterval(interval); // Clean up interval on unmount
  }, [items]);

  // Calculate time since last save
  const timeSinceLastSave = lastSaveTime
    ? Math.floor((Date.now() - lastSaveTime) / 1000)
    : null;

  return (
    <div className="App">
      {isSaving && <div className="spinner">Saving...</div>}{" "}
      {/* Loading spinner */}
      {timeSinceLastSave !== null && (
        <div className="save-time">
          Last saved {timeSinceLastSave} seconds ago
        </div>
      )}
      <MainContainerComponent
        items={items}
        handleDragEnd={handleDragEnd}
        selectedImage={selectedImage}
        handleCloseModal={handleCloseModal}
        handleCardClick={handleCardClick}
      />
    </div>
  );
};

export default RecordComponent;
