import { supabase } from "../supabase/supabaseClient";

const uploadVideo = async (file: File) => {
  const { data, error } = await supabase.storage
    .from("videos") //Supabase bucket name
    .upload(`uploads/${Date.now()}_${file.name}`, file);

  if (error) throw error;
  return data;
};

const uploadPhoto = async (file: File) => {
  const { data, error } = await supabase.storage
    .from("photos") //Supabase bucket name
    .upload(`uploads/${Date.now()}_${file.name}`, file);

  if (error) throw error;
  return data;
};

export interface Post {
  content: string;
  location: {
    lat: number;
    lng: number;
  };
  vid_url: string;
  pic_url: string;
}
//save to posts table
const savePost = async (post: Post) => {
  const {
    content,
    location: { lat, lng },
    vid_url,
    pic_url,
  } = post;
  const postDataSet = {
    content,
    loc_lat: lat,
    loc_lng: lng,
    pic_url,
    vid_url,
  };
  const { data, error } = await supabase.from("posts").insert(postDataSet);
  if (error) throw error;
  console.log({ data, error });
  return data;
};
export { uploadVideo, uploadPhoto, savePost };
