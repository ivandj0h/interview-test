import Profile from "@/components/Profile";
import "react-image-crop/dist/ReactCrop.css";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen p-8 sm:p-20 bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
        <main className="flex flex-col gap-8 items-center sm:items-start text-gray-900 dark:text-white">
          <Profile />
        </main>
      </div>
    </>
  );
}
