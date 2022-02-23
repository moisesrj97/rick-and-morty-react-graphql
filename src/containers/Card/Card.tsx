import React from 'react';

interface CardPropsI {
  image: string;
  title: string;
}

export function Card({ image, title }: CardPropsI): JSX.Element {
  return (
    <div className="w-[300px] flex flex-col gap-4 p-4 rounded-md border-2 border-white bg-[#121212] cursor-pointer hover:scale-110 hover:shadow-green-400 hover:shadow-lg transition-all">
      <img src={image} alt={`${title}`} />
      <h3 className="text-white text-center text-xl">{title}</h3>
    </div>
  );
}
