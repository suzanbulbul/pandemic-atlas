import React from "react";

//Components
import Card from "../../components/card";

export const dummbyData = {
  content: [
    {
      id: 1,
      name: "Airpods Wireless Bluetooth Headphones",
      description:
        "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
      price: 89.99,
      countInStock: 10,
      rating: 4.5,
      numReviews: 12,
      color: "black",
      images: [
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      ],
    },
    {
      id: 2,
      name: "iPhone 11 Pro 256GB Memory",
      description:
        "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
      price: 599.99,
      countInStock: 7,
      rating: 4.0,
      numReviews: 8,
      color: "black",
      images: [
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      ],
    },
    {
      id: 3,
      name: "Cannon EOS 80D DSLR Camera",
      description:
        "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
      price: 929.99,
      countInStock: 5,
      rating: 3.0,
      numReviews: 12,
      color: "black",
      images: [
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      ],
    },
    {
      id: 4,
      name: "Sony Playstation 4 Pro White Version",
      description:
        "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
      price: 399.99,
      countInStock: 11,
      rating: 5.0,
      numReviews: 12,
      color: "black",
      images: [
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      ],
    },
  ],
};

const Home = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Product
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 self-stretch">
        {dummbyData.content.map((product) => (
          <div
            key={product.id}
            className="flex p-4 flex-col items-end gap-6 w-full rounded-xl bg-white cursor-pointer"
          >
            <Card
              title={product.name}
              description={product.description}
              price={product.price}
              color={product.color}
              count={product.countInStock}
              rating={product.rating}
              numReviews={product.numReviews}
              images={product.images}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
