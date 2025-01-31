import React from "react";
import Image from "next/image";

interface TaskPictureProps {
  labelText: string;
  imageSrc: string;
  altText?: string;
  imageKey: string;
  onImageChange?: (file: File) => void;  // Updated type to match parent component
}

const TaskPicture: React.FC<TaskPictureProps> = ({
  labelText,
  imageSrc,
  altText = "Image",
  onImageChange,
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImageChange) {
      onImageChange(file);  // Now just passing the file
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full text-center mb-2">
        <label className="block text-sm font-bold text-black-five">{labelText}</label>
      </div>

      {/* Circular Frame with Upload Button */}
      <div className="relative w-20 h-20 md:w-48 md:h-48 rounded-full border-4 overflow-hidden">
        {/* Image inside the circle */}
        <div className="relative w-full h-full rounded-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={altText}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        {/* Upload Button inside the Frame */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute inset-0 p-2 bg-blue-500 text-white rounded-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default TaskPicture;