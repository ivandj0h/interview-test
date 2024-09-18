"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";

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

  return (
    <>
      <Navbar />
      <div className="photos-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-gray-100 dark:bg-gray-800 transition-colors duration-300 min-h-screen">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="photo-card bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden transition-colors duration-300"
          >
            <img
              src={`http://localhost:8000/uploads/${photo.id}.jpg`}
              alt={photo.filename}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {photo.filename}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {photo.description}
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                {new Date(photo.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default PhotosPage;
