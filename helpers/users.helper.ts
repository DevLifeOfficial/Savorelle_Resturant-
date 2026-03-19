import { supabase } from "../lib/supabaseClient";

export async function getUsers() {
  const { data, error } = await supabase.from("test_table").select("*");

  if (error) {
    console.error(error);
  }

  return data;
}

export const getSlides = async () => {
  const { data, error } = await supabase
    .from("sliders")
    .select("*")
    .eq("is_active", true)
    .order("slide_order");

  if (error) throw error;

  return data;
};

export type SliderInput = {
  title: string;
  description: string;
  image_url: string;
  price: number;
  highlight_text: string;
  button_text: string;
};

export const uploadImage = async (file: File) => {
  const filename = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("slider-image")
    .upload(filename, file);

  if (error) throw error;

  const { data: publicUrl } = supabase.storage
    .from("slider-image")
    .getPublicUrl(filename);
  return publicUrl.publicUrl;
};

export const createSlider = async (formData: SliderInput) => {
  const { data, error } = await supabase
    .from("sliders")
    .insert([formData])
    .select()
    .single();

  if (error) throw error;

  return data;
};

type NewsletterInput = {
  email: string;
};

export const createNewsletter = async (formData: NewsletterInput) => {
  const { data, error } = await supabase
    .from("newsletter")
    .insert([{ email: formData.email }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Failed to subscribe");
  }

  return data;
};
