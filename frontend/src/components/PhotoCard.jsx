import Image from "next/image";

const PhotoCard = ({ photo }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 hover:shadow-2xl transition-shadow duration-300 m-4">
      <img
        src={photo.filepath}
        alt={photo.filename}
        className="w-full h-64 object-cover"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
          {photo.filename}
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-base">
          {photo.description}
        </p>
      </div>
    </div>
  );
};

export default PhotoCard;
