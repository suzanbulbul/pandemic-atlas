import React, { useState } from "react";
import { useForm } from "react-hook-form";

//Components
import Card from "../../components/card";
import Modal from "../../components/modal";
import Input from "../../components/input";

//Icons
import { MdProductionQuantityLimits } from "react-icons/md";

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
  const [addProduct, setAddProduct] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData: any) => {
    console.log(formData);
  };
  return (
    <>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => setAddProduct(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
        >
          Ürün Ekle
        </button>
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
      <Modal
        show={addProduct}
        onClose={() => setAddProduct(false)}
        onSave={handleSubmit(onSubmit)}
        icon={<MdProductionQuantityLimits />}
        title={"Test Modal"}
        desc={"Test Modal"}
        closeTitle={"Close"}
        saveTitle={"Save"}
      >
        <form
          name="add-drone-form"
          className="flex w-full flex-col gap-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full">
            <Input
              label="Ürün İsmi"
              type="text"
              {...register("productName", { required: true })}
            />
          </div>
          <div className="w-full">
            <Input
              label="Ürün Açıklaması"
              type="text"
              {...register("productDescription", { required: true })}
            />
          </div>
          <div className="w-full">
            <Input
              label="Ürün Açıklaması"
              type="number"
              {...register("productPrice", { required: true })}
            />
          </div>
          <div className="w-full">
            <Input
              label="Ürün Rengi"
              type="text"
              {...register("productColor", { required: true })}
            />
          </div>
          <div className="w-full">
            <Input
              label="Ürün Resmi"
              type="file"
              {...register("productImage", { required: true })}
              onChange={() => handleImageUpload}
            />
            {selectedImage && (
              <div>
                <h3>Seçilen Görsel:</h3>
                <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
              </div>
            )}
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Home;
