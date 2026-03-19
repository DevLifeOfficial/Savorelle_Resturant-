"use client";

import { useEffect, useState } from "react";
import Slider from "@/components/ui/slider";
import FormBuilder from "@/components/ui/form";
import { sliderFields } from "@/config/sliderFields";
import { createSlider, getSlides, uploadImage } from "@/helpers/users.helper";
import Modal from "@/components/ui/model";
import Footer from "@/components/ui/footer";
import ChatUI from "@/components/ui/ChatUI";
import MenuCard from "@/components/layout/menucard";

type Slide = {
  id: number;
  title: string;
  description: string;
  highlight_text: string;
  button_text: string;
  image_url: string;
  price: number;
};

export default function HomeDetailsPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  console.log(open, "Slider");

  const loadSlides = async () => {
    const data = await getSlides();
    setSlides(data);
  };

  useEffect(() => {
    loadSlides();
  }, []);

  const handleSubmit = async (values: Record<string, string | File>) => {
    setLoading(true);

    const file = values.image_url as File;
    if (!file) {
      setLoading(false);
      throw new Error("Image file is required");
    }

    const imageUrl = await uploadImage(file);

    try {
      const newSlide = await createSlider({
        title: values.title as string,
        description: values.description as string,
        image_url: imageUrl,
        price: Number(values.price),
        highlight_text: values.highlight_text as string,
        button_text: values.button_text as string,
      });

      setSlides((prev) => [...prev, newSlide]);
      setOpen(false);
      loadSlides();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="relative">
        <button
          title="Add slider"
          type="button"
          onClick={() => setOpen(true)}
          className="absolute bottom-10 right-5 z-50 bg-gradient-to-r from-orange-500 to-orange-600    text-white px-3 py-1 rounded-md text-xs font-semibold tracking-wide shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:from-orange-600 hover:to-orange-700 transition-all duration-300 active:scale-95"
        >
          + Add Slider
        </button>

        <Modal open={open} onClose={() => setOpen(false)}>
          <div className="p-4 w-full max-w-lg mx-auto">
            <h2 className="text-xl font-semibold text-white mb-4 tracking-wide">
              Create Slider
            </h2>

            <FormBuilder
              fields={sliderFields}
              onSubmit={handleSubmit}
              buttonText={loading ? "Creating..." : "Create Slider"}
              direction="grid"
              size="max-w-2xl"
            />
          </div>
        </Modal>

        <Slider slides={slides} />
      </div>
      <div>
        <MenuCard/>
      </div>
      <ChatUI />
      <Footer />
    </div>
  );
}
