import { supabase } from "@/lib/supabase";

export async function uploadAvenueToBucket(file: File, userId: string) {
  try {
    let ext = file.name.split(".").pop()?.toLowerCase();
    let key = `avenue/${userId}/${self.crypto.randomUUID()}.${ext}`;

    const { data, error } = await supabase.storage
      .from("aisle")
      .upload(key, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
