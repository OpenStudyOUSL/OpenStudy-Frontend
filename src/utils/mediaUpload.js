import { createClient } from "@supabase/supabase-js";

export default function UploadMediaUploadtoSupabase(file) {
  return new Promise((resolve, reject) => {
    // Lazy initialize to ensure env vars are loaded
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Supabase credentials missing in .env!");
      reject("Supabase configuration error.");
      return;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    if (!file) {
      reject("Please select a file first!");
      return;
    }

    const fileName = file.name;
    const extension = fileName.split(".").pop().toLowerCase();

    if (extension !== "jpg" && extension !== "png" && extension !== "jpeg") {
      reject("Only JPG, JPEG, and PNG files are allowed!");
      return;
    }

    const timeStamp = new Date().getTime();
    const newFileName = `${timeStamp}.${extension}`;

    console.log("Attempting upload to Supabase:", newFileName);

    supabase.storage
      .from("openstudy")
      .upload(newFileName, file, {
        cacheControl: "3600",
        upsert: false,
      })
      .then((res) => {
        if (res.error) {
          console.error("Supabase Upload Error:", res.error);
          reject(res.error.message || "Upload failed");
          return;
        }

        const { data } = supabase.storage
          .from("openstudy")
          .getPublicUrl(newFileName);
        
        console.log("Upload successful! Public URL:", data.publicUrl);
        resolve({ publicUrl: data.publicUrl });
      })
      .catch((error) => {
        console.error("Supabase Promise Catch:", error);
        reject(error);
      });
  });
}

