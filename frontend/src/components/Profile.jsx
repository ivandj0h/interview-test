"use client";

import React, { useEffect, useRef, useState } from "react";
import PencilIcon from "./PencilIcon";
import Modal from "./Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const avatarRef = useRef("/images/avatar.jpg");
  const [modalOpen, setModalOpen] = useState(false);
  const [photoData, setPhotoData] = useState({ filename: "", description: "" });

  const updateAvatar = async (imgSrc) => {
    const formData = new FormData();
    const responseBlob = await fetch(imgSrc);
    const blob = await responseBlob.blob();

    formData.append("file", blob, "avatar.jpg");
    formData.append("filename", "avatar.jpg");
    formData.append("description", "Updated avatar");

    try {
      const response = await fetch("http://localhost:8000/api/photos/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();

      avatarRef.current = data.photo.filepath;
      toast.success("Avatar updated successfully!");
      setModalOpen(false);
    } catch (error) {
      console.error("Error uploading new avatar:", error);
      toast.error("Failed to update avatar");
    }
  };

  useEffect(() => {
    const fetchPhotoData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/photos/66ea74f13e06e05666cd7944"
        );
        if (!response.ok) throw new Error("Failed to fetch the photo data");
        const data = await response.json();
        setPhotoData({
          filename: data.data.filename,
          description: data.data.description,
        });
        avatarRef.current = data.data.filepath;
      } catch (error) {
        console.error("Error fetching photo data:", error);
        toast.error("Failed to fetch avatar data");
      }
    };

    // fetchPhotoData();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 transition-colors duration-300 ">
        <h3 className="text-gray-900 dark:text-white text-2xl mt-5">
          Upload Your Photos
        </h3>
      </div>

      <div className="flex flex-col items-center pt-12">
        <div className="relative">
          <img
            src={avatarRef.current}
            alt="Avatar"
            className="w-[150px] h-[150px] rounded-full border-2 border-gray-400"
          />
          <button
            className="absolute -bottom-3 left-0 right-0 m-auto w-fit p-[.35rem] rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 border border-gray-400 dark:border-gray-600"
            title="Change photo"
            onClick={() => setModalOpen(true)}
          >
            <PencilIcon className="text-gray-700 dark:text-white" />
          </button>
        </div>
        <h2 className="text-gray-900 dark:text-white font-bold mt-6">
          {photoData.filename}
        </h2>
        <p className="text-gray-500 dark:text-gray-300 text-xs mt-2">
          {photoData.description}
        </p>
        {modalOpen && (
          <Modal
            updateAvatar={updateAvatar}
            closeModal={() => setModalOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default Profile;
