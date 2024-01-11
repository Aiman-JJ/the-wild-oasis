import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function deleteCabins(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
  return data;
}


export async function createEditCabin(newCabin, id) { 



  const hasImagePath = typeof newCabin.image === 'string' && newCabin.image.startsWith(supabaseUrl);

  // Check if newCabin.image exists
  if (!newCabin.image) {
    throw new Error("Image is required for creating a cabin");
  }
  
  // Generate a unique image name
  const imageName = `${Math.random()}-${hasImagePath ? newCabin.image.replace(/\//g, "") : ''}`;
  
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1 - create /edit cabin
  let query = supabase.from("cabins");

  //A) create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  //B) Edit
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  // 2 - upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3 - delete cabin if error uploading image
  if (storageError) {
    // Handle error
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded, the cabin was not created"
    );
  } else {
    // Handle success
  }

  return data;
}
