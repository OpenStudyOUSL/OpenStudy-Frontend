import { createClient } from "@supabase/supabase-js";

const url = "https://wioeainqjclccjyoqhwh.supabase.co";

const key =`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indpb2VhaW5xamNsY2NqeW9xaHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2NjY1MjMsImV4cCI6MjA4NDI0MjUyM30.yRMFhEUtUje01l5rcAzREzt-ndYtQNm63KtrXtky3RM`;


export default function UploadMediaUploadtoSupabase(file){
  return new Promise((resolve, reject) => {
    if (file == null) {
      reject("Please select a file first!");
      return;
    }
    let file_name = file.name;
    const extension = file_name.split('.')[file_name.split('.').length - 1];
    if(extension != "jpg" && extension!="png"){
      reject("Only JPG and PNG files are allowed!");
      return;
    }
    const supabase = createClient(url, key);
    const timeStamp = new Date().getTime();
    file_name = timeStamp + "." + extension;

    supabase.storage.from("openstudy").upload(file_name, file, {
      cacheControl: "3600",
      upsert: false
    }).then((res) => {
      const publicUrl = supabase.storage.from("openstudy").getPublicUrl(file_name).data.publicUrl;
      resolve({publicUrl});
    }).catch((error) => {
      reject(error);
    });
  });
}