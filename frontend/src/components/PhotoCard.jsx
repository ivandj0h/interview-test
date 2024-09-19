import { useState } from "react";
import { FaTrash } from "react-icons/fa";

const PhotoCard = ({ photo, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/photos/${photo.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        onDelete(photo.id);
        setIsModalOpen(false); // Tutup modal setelah sukses
      } else {
        throw new Error("Failed to delete the photo");
      }
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  return (
    <>
      <div
        className="photo-card bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden m-4"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        <img
          src={photo.filepath}
          alt={photo.filename}
          className="w-full object-cover"
          style={{ height: "200px" }}
        />
        <div className="p-4">
          <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
            {photo.filename}
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            {photo.description}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            title="Delete Photo"
          >
            <FaTrash className="inline-block mr-2" />
            Delete
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {/* Modal */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg z-60">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Confirm Delete
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Are you sure you want to delete this photo?
            </p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoCard;
