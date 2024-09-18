import Image from "next/image";
import { FaTrash } from "react-icons/fa";

const PhotoCard = ({ photo, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this photo?")) {
      try {
        await axios.delete(`http://localhost:8000/api/photos/${photo.id}`);
        onDelete(photo.id);
        alert("Photo deleted successfully!");
      } catch (error) {
        console.error("Error deleting photo:", error);
        alert("Error deleting photo");
      }
    }
  };

  return (
    <div className="photo-card bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 m-7">
      <img
        src={photo.filepath}
        alt={photo.filename}
        className="w-full h-64 object-cover"
      />
      <div className="px-6 py-80">
        <div className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
          {photo.filename}
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-base">
          {photo.description}
        </p>
        <button
          onClick={handleDelete}
          className="mt-4 text-red-500 hover:text-red-700"
          title="Delete Photo"
          aria-label="Delete photo"
        >
          <FaTrash className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default PhotoCard;
