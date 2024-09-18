"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import PhotoCard from "@/components/PhotoCard";

const PhotosPage = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/photos");
        setPhotos(response.data.data);
      } catch (error) {
        console.error("Error fetching photos", error);
      }
    };

    fetchPhotos();
  }, []);

  const handleDeletePhoto = (id) => {
    setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== id));
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 transition-colors duration-300 ">
        <h3 className="text-gray-900 dark:text-white text-2xl mt-5">
          Lists Of Photos
        </h3>
      </div>

      <div className="photos-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-gray-100 dark:bg-gray-800 transition-colors duration-300 min-h-screen">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onDelete={handleDeletePhoto}
          />
        ))}
      </div>
    </>
  );
};
export default PhotosPage;
