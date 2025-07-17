import supabase from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error("Cabins couldnt be loaded");
    throw new Error("Cabins couldnt be loaded");
  }

  return data;
}
export async function createCabin(newCabin) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([newCabin])
    .select();
  if (error) {
    console.error("Cabins couldnt be created");
    throw new Error("Cabins couldnt be created");
  }
}
export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error("Cabin couldnt be deleted");
    throw new Error("Cabin couldnt be deleted");
  }
}
