import { supabase } from "@/lib/supabaseClient";

export interface OrderItem {
  id?: string;
  order_id: string;
  menu_item_id: string;
  quantity: number;
  price: number;
  created_at?: string;
}

export async function createOrderItems(items: OrderItem[]) {
  const { data, error } = await supabase
    .from("order_items")
    .insert(items)
    .select();

  if (error) {
    console.error("Create order items error:", error.message);
    throw error;
  }

  return data;
}