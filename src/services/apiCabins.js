import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error("Cabins couldnt be loaded");
    throw new Error("Cabins couldnt be loaded");
  }

  return data;
}
//https://kvtbxzlpsjcickdyouji.supabase.co/storage/v1/object/sign/cabin-images/cabin-001.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wMGY1NDJiNS0xMTBhLTRhZmQtOGZmZS0wZTk5OWU0MjljZmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjYWJpbi1pbWFnZXMvY2FiaW4tMDAxLmpwZyIsImlhdCI6MTc1MjY2NjM5NywiZXhwIjoyMDA0OTU0Mzk3fQ.XtAXdPS4Xo5HalFUPD0eQ_FIBMPiMLBhIt0Is2yJfM0
export async function createEditCabin(newCabin, id) {
  const isEditing = Boolean(id);
  const isImageAString = typeof newCabin.image === "string";
  const isImageAFile = newCabin.image instanceof File;

  let imagePath = newCabin.image;
  let imageName;

  // Generate image name & path only if it's a new file (File object)
  if (isImageAFile) {
    imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  // 1. Insert or Update the database entry
  let query = supabase.from("cabins");
  if (!isEditing) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  } else {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();
  if (error) {
    console.error("Cabin could not be created/updated");
    throw new Error("Cabin could not be created/updated");
  }

  // 2. Upload image only if it's a new File
  if (isImageAFile) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      // Clean up the inserted record if image upload failed
      if (!isEditing) {
        await supabase.from("cabins").delete().eq("id", data.id);
      }
      console.error(storageError);
      throw new Error("Image upload failed; cabin not saved");
    }
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error("Cabin couldnt be deleted");
    throw new Error("Cabin couldnt be deleted");
  }
}
