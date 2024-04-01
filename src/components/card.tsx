import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface CardProps {
  title: string;
  description: string;
  price: number;
  count: number;
  rating: number;
  color: string;
  numReviews: number;
  images: string[];
}

const Card = ({
  title,
  description,
  price,
  count,
  rating,
  color,
  numReviews,
  images,
}: CardProps) => {
  return (
    <Link href={`#`}>
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <Image
          src={images[0]}
          alt={`${description}`}
          width={500}
          height={500}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <h3 className="text-base font-normal text-black">{title}</h3>
        <p className="text-sm font-normal text-gray-500">
          {description.slice(0, 50)}
          {description.length > 50 && <span> ...</span>}
        </p>
        <p className="text-base font-medium text-black">${price}</p>
      </div>
    </Link>
  );
};

export default Card;
