import { supabase } from "@/lib/supabaseClient";
import { createOrderItems } from "./orderItems.helper";

export interface Order {
  id?: string;
  user_id?: string;
  total_amount: number;
  status?: string;
  payment_status?: string;
  created_at?: string;
}

// Get All order
export async function getOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}


// Get All order Items using Joins
export async function getOrderWithItems(orderId: string) {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items (
        id,
        quantity,
        price,
        menu_items (
          name,
          image_url
        )
      )
    `,
    )
    .eq("id", orderId)
    .single();

  if (error) {
    console.error("Fetch order error:", error.message);
    throw error;
  }

  return data;
}


// Create order
export async function createOrder(order: Order) {
  const { data, error } = await supabase
    .from("orders")
    .insert([order])
    .select()
    .single();

  if (error) {
    console.error("Create order error:", error.message);
    throw error;
  }

  return data;
}

// Make order confirmation
export async function placeOrder(cartItems: any[], user_id?: string) {
  try {
    const total_amount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const order = await createOrder({
      total_amount,
      user_id,
      status: "pending",
      payment_status: "unpaid",
    });

    const orderItems = cartItems.map((item) => ({
      order_id: order.id,
      menu_item_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    await createOrderItems(orderItems);

    return order;
  } catch (error) {
    console.error("Checkout error:", error);
    throw error;
  }
}

export async function updateOrderStatus(
  orderId: string,
  status: string,
  payment_status?: string,
) {
  const { data, error } = await supabase
    .from("orders")
    .update({
      status,
      ...(payment_status && { payment_status }),
    })
    .eq("id", orderId)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteOrder(orderId: string) {
  const { error } = await supabase.from("orders").delete().eq("id", orderId);

  if (error) throw error;

  return true;
}
