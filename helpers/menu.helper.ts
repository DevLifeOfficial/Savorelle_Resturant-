import { supabase } from "@/lib/supabaseClient";

export interface MenuItemsProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  is_available?: boolean;
}

export const ProductUploadImage = async (file: File) => {
  const filename = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("product-image")
    .upload(filename, file);

  if (error) throw error;

  const { data: publicUrl } = supabase.storage
    .from("product-image")
    .getPublicUrl(filename);
  return publicUrl.publicUrl;
};


export async function createProduct(formData: Omit<MenuItemsProps , "id">) {
  const { data, error } = await supabase
    .from("menu_items")
    .insert([formData])
    .select()
    .single();

  if (error) {
    console.error("Create error:", error.message);
    throw error;
  }

  return data;
}

export async function getProducts() {
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }

  return data;
}

export async function getProductById(id: string) {
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Fetch single error:", error.message);
    throw error;
  }

  return data;
}

export async function updateProduct(
  id: string,
  updates: Partial<MenuItemsProps>,
) {
  const { data, error } = await supabase
    .from("menu_items")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Update error:", error.message);
    throw error;
  }

  return data;
}

export async function deleteProduct(id: string) {
  const { error } = await supabase.from("menu_items").delete().eq("id", id);

  if (error) {
    console.error("Delete error:", error.message);
    throw error;
  }

  return true;
}

export async function getByCategory(category: string) {
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .eq("category", category);

  if (error) throw error;

  return data;
}
