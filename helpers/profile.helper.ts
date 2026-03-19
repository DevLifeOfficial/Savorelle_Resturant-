import { supabase } from "@/lib/supabaseClient";

interface ProfileProps {
  id: number;
  name: number;
  email: string;
  phone: number;
  address?: number;
  created_at?: string;
}

// Get User by Id
export async function GetProfileById(profileId: number) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", profileId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function UpdateProfile(
  id: number,
  updates: Partial<ProfileProps>,
) {
  const { data, error } = await supabase
    .from("profile")
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
