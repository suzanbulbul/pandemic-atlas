import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { useQuery } from "@tanstack/react-query";

//Firebase
import {
  uploadDataToFirestore,
  fetchDataFromFirestore,
} from "../../api/firebase";

//Components
import { Card, Modal, Input } from "../../components/index.js";

//Toaster
import toaster from "react-hot-toast";

//Icons
import { MdProductionQuantityLimits } from "react-icons/md";

const Home = () => {
  const [addProduct, setAddProduct] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { isFetching, data, refetch } = useQuery<any>({
    queryKey: ["productData"],
    queryFn: () => fetchDataFromFirestore(),
  });

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const { reset, register, handleSubmit } = useForm();

  const onSubmit = async (formData: any) => {
    if (selectedImage === null) {
      return null;
    }

    formData.image = selectedImage;

    formData.uploadDate = new Date().toISOString();

    toaster.loading(`İşlem gerçekleşiyor. Lütfen bekleyin.`);
    uploadDataToFirestore(formData).then((res: any) => {
      if (!res.error) {
        toaster.dismiss();
        refetch();
        setAddProduct(false);
        reset();
        setSelectedImage(null);
      }
    });
  };

  if (isFetching && !data) {
    return <>Loading</>;
  }
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
          {data.map((product: any) => (
            <div
              key={product?.id}
              className="flex p-4 flex-col items-end gap-6 w-full rounded-xl bg-white cursor-pointer"
            >
              <Card
                title={product?.name}
                description={product?.desc}
                price={product?.price}
                color={product?.color}
                count={product?.count}
                rating={product?.rating}
                numReviews={product?.numReviews}
                images={product?.imageURL}
              />
            </div>
          ))}
        </div>
      </div>
      <Modal
        show={addProduct}
        onClose={() => {
          setAddProduct(false);
          reset();
          setSelectedImage(null);
        }}
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
              // eslint-disable-next-line @next/next/no-img-element
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
