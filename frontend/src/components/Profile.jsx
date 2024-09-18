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
    formData.append("filename", photoData.filename || "avatar.jpg");
    formData.append("description", photoData.description || "Updated avatar");

    try {
      const response = await fetch("http://localhost:8000/api/photos/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();

      avatarRef.current = data.photo.filepath;
      toast.success("Avatar updated successfully!");

      // Tutup modal
      setModalOpen(false);

      // Redirect setelah 2 detik
      setTimeout(() => {
        window.location.href = "http://localhost:3000/photos";
      }, 2000); // 2 detik delay
    } catch (error) {
      console.error("Error uploading new avatar:", error);
      toast.error("Failed to update avatar");
    }
  };

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

        {/* Form Section */}
        <div className="mt-6 w-full max-w-xs">
          <div className="mb-4">
            <label
              htmlFor="filename"
              className="block text-gray-900 dark:text-white text-sm font-bold mb-2"
            >
              Filename
            </label>
            <input
              type="text"
              id="filename"
              placeholder="Username"
              value={photoData.filename}
              onChange={(e) =>
                setPhotoData({ ...photoData, filename: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-100 dark:bg-gray-700"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-900 dark:text-white text-sm font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter description"
              value={photoData.description}
              onChange={(e) =>
                setPhotoData({ ...photoData, description: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-100 dark:bg-gray-700"
              rows="3"
            ></textarea>
          </div>
        </div>

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
