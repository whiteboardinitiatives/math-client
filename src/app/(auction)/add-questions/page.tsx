"use client";

import Input from "@/components/Input";
import axios from "axios";
import { Loader2 } from "lucide-react";

import { useState } from "react";
import toast from "react-hot-toast";

interface CloudinaryUploadResponse {
  secure_url: string;
  // You can add more fields if needed
}

const AddQuestion = () => {
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setPreviewImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      toast("Please give a valid Image");
      setPhoto(null);
      setPreviewImage(null);
    }
  };
  const uploadImage = async (file: File) => {
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET!);

    try {
      const response = await axios.post<CloudinaryUploadResponse>(
        process.env.NEXT_PUBLIC_CLOUDINARY_URL!,
        formdata
      );
      const imageURL: string = response.data?.secure_url;

      if (imageURL) {
        return imageURL;
      } else {
        throw new Error("No secure_url returned from Cloudinary");
      }
    } catch (e) {
      console.error(e);
      throw new Error("Image upload failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formComponent = e.currentTarget;
    const form = new FormData(formComponent);
    const name = form.get("name") as string;
    const mode = form.get("mode") as string;
    const questionNumber = form.get("questionNumber") as string;

    if (!name || !mode || !photo || !questionNumber) {
      toast.error("Please fill all the fields including photo");
      setLoading(false);
      return;
    }

    try {
      const imageUrl = await uploadImage(photo);
      const questionData = {
        name,
        mode,
        image: imageUrl,
        number: questionNumber,
      };
      console.log(questionData);

      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/member`,
        questionData,
        { withCredentials: true }
      );

      toast.success("Added Successfully!");

      formComponent.reset();
    } catch (error) {
      console.error(error);
      toast.error("something went wrong");
    } finally {
      setLoading(false);
      setPhoto(null);
      setPreviewImage(null);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="my-24 border max-w-2xl border-gray-200 px-4 pt-10 pb-4 rounded-md md:w-[80%] mx-auto">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <h1 className="text-2xl sm:text-4xl text-center font-bold mb-4">
            Add Question
          </h1>
          <div className="w-full flex flex-col sm:flex-row gap-4">
            <Input
              label={"Question Title"}
              placeholder={"Question Title"}
              type={"text"}
              name="name"
            />
          </div>

          <div className="w-full flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label
                htmlFor="mode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Question Mode
              </label>
              <select
                name="mode"
                className="flex-1 w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 "
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="w-full flex gap-4">
            <Input
              label="Question number"
              placeholder="Question number"
              name="questionNumber"
              type="text"
            />
          </div>

          <div className=" max-w-fit mx-auto flex items-center justify-center gap-4 flex-col">
            <label
              className="font-arial font-semibold flex items-center justify-center gap-3 px-3 py-2 hover:bg-primary hover:text-white text-black border border-primary rounded-md text-lg transition-all duration-200 cursor-pointer"
              htmlFor="upload-property"
            >
              Question Photo
            </label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="upload-property"
              onChange={handleImageChange}
            />
            {previewImage && (
              <img
                alt="team image"
                src={previewImage}
                className=" max-w-56  object-cover border-2 border-btncol"
              />
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="group cursor-pointer relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-primary/70 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Question"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
