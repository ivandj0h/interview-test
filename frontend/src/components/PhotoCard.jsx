import { FaTrash } from "react-icons/fa";

const PhotoCard = ({ photo, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this photo?")) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/photos/${photo.id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          onDelete(photo.id);
          alert("Photo deleted successfully!");
        } else {
          throw new Error("Failed to delete the photo");
        }
      } catch (error) {
        console.error("Error deleting photo:", error);
        alert("Error deleting photo");
      }
    }
  };

  return (
    <div
      className="photo-card bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden m-4"
      style={{ maxHeight: "400px", overflowY: "auto" }}
    >
      <img
        src={photo.filepath}
        alt={photo.filename}
        className="w-full object-cover" // Maintain aspect ratio
        style={{ height: "200px" }} // Fixed height for images
      />
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
          {photo.filename}
        </h3>
        <p className="text-gray-700 dark:text-gray-300">{photo.description}</p>
        <button
          onClick={handleDelete}
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          title="Delete Photo"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PhotoCard;
