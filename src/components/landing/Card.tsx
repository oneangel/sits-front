import React from 'react';

interface CardProps {
  imgSrc: string;
  altText: string;
  text: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ imgSrc, altText, text, className = '' }) => {
  return (
    <div className={`shadow-lg shadow-amber-500/30 col-span-1 w-full h-[380px] rounded-3xl flex hover:scale-110 transition ${className}`}>
      <div className="flex flex-col mx-auto my-auto">
        <img src={imgSrc} alt={altText} className="size-48" />
        <p className="font-bold w-[195px] text-2xl">{text}</p>
      </div>
    </div>
  );
};

export default Card;
