import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//Firebase
import { uploadDataToFirestore } from "../../api/firebase";
import { dummyData } from "../../api/dummyData";

//Components
import { Card, Modal, Input } from "../../components/index.js";

//Icons
import { MdProductionQuantityLimits } from "react-icons/md";
import { PaginationData } from "../../util/type/ApiResponse";
import { Product } from "./home.type";

const Home = () => {
  const [addProduct, setAddProduct] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [data, setData] = useState<PaginationData<Product>>(
    {} as PaginationData<Product>
  );

  useEffect(() => {
    if (data) {
      setData(dummyData);
    }
  }, []);

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
    if (selectedImage === null) {
      return null;
    }

    formData.image = selectedImage;
    uploadDataToFirestore(formData);
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
          {data?.content?.map((product: any) => (
            <div
              key={product?.id}
              className="flex p-4 flex-col items-end gap-6 w-full rounded-xl bg-white cursor-pointer"
            >
              <Card
                title={product?.name}
                description={product?.description}
                price={product?.price}
                color={product?.color}
                count={product?.countInStock}
                rating={product?.rating}
                numReviews={product?.numReviews}
                images={product?.images}
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
              {...register("name", { required: true })}
            />
          </div>
          <div className="w-full">
            <Input
              label="Ürün Açıklaması"
              type="text"
              {...register("desc", { required: true })}
            />
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Input
                label="Ürün Fiyatı"
                type="number"
                {...register("price", { required: true })}
              />
            </div>
            <div className="w-full">
              <Input
                label="Ürün Adeti"
                type="number"
                {...register("count", { required: true })}
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <Input
              label="Ürün Görseli"
              type="file"
              {...register("image", { required: true })}
              onChange={handleImageUpload}
            />
            {selectedImage && (
              <img
                width={150}
                height={150}
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
              />
            )}
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Home;
