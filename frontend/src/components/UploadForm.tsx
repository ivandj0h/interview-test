"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadForm: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filename, setFilename] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("filename", filename);
    formData.append("description", description);

    try {
      const response = await fetch("http://localhost:8000/photos/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed!");
      }

      await response.json();
      toast.success("Upload picture success");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Upload failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-white text-black">
      <div className="w-full max-w-lg p-10 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Upload File</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="file-upload"
              className="block text-sm font-medium text-gray-700"
            >
              Choose Image
            </label>
            <input
              id="file-upload"
              type="file"
              className="mt-1 block w-full h-12 px-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              File Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full h-12 px-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="Enter file name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              className="mt-1 block w-full h-24 px-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description (optional)"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Upload now!
          </button>
        </form>
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </div>
  );
};

export default UploadForm;
