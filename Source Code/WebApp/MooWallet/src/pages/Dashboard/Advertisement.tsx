import React, { useState } from "react";

const images = [
  "/images/Advertisement/HCKConverted.png",
  "/images/Advertisement/Ather.png",
  "/images/Advertisement/HCK.png",
];

const Advertisement: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative mt-[4%] h-[30%] flex items-center justify-center rounded-[15px] overflow-hidden">
      <img
        src={images[currentIndex]}
        alt="carousel"
        className="w-full h-full object-cover"
      />
      <button onClick={prevImage} className="absolute h-[100%] left-[0%] pl-[.5%] bg-transparent text-[#ffffff] border-none cursor-pointer hover:bg-[#000000]/50">◀</button>
      <button onClick={nextImage} className="absolute h-[100%] right-[0%] pr-[.5%] bg-transparent text-[#ffffff] border-none cursor-pointer hover:bg-[#000000]/50" >▶</button>
    </div>
  );
};

export default Advertisement;