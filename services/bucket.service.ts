import { supabase } from "@/lib/supabase";
import { FileObject } from "@/types/db";

const BucketName = process.env.NEXT_PUBLIC_BUCKET_NAME as string
const expiration = process.env.NEXT_PUBLIC_PRESIGNED_EXPIRATION as string
export async function uploadAvenueToBucket(file: File, userId: string) {
  try {
    let ext = file.name.split(".").pop()?.toLowerCase();
    let key = `avenue/${userId}/${self.crypto.randomUUID()}.${ext}`;

    const { data, error } = await supabase.storage
      .from(BucketName)
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

export async function listAvenueFiles(authId: string) {
  try {
    const key = `avenue/${authId}/`;


    const { data, error } = await supabase.storage
      .from(BucketName) // Replace with your actual bucket name
      .list(key, {
        limit: 100, // Adjust as needed
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });
    if (error) throw error;
    return await generateFileUrl(data, key);
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function generateFileUrl(data:FileObject[], key: string) {
  try {
    const signedUrls = await Promise.all(
      data.map(async (file) => {
        const { data: signedUrlData, error: signedUrlError } =
          await supabase.storage
            .from(BucketName)
            .createSignedUrl(`${key}${file.name}`, +expiration);
  
        if (signedUrlError) {
          console.error(
            `Error creating signed URL for ${file.name}:`,
            signedUrlError
          );
          return null;
        }
        return signedUrlData.signedUrl;
      })
    );
  
    return signedUrls.filter(Boolean)
  } catch (error) {
    console.log(error)
    throw error
  }
}
