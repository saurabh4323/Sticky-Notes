import axios from "axios";

const API = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: "https://stikcynotes-backend.onrender.com/api",
  headers: {
    Authorization: `Bearer ${API}`,
  },
});

const CreateSticky = async (title, text, password, image, useremail) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify({ title, text, password, useremail }));

  if (image) {
    formData.append("files.image", image);
  }

  const response = await axiosClient.post("/sticksecrets", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export default CreateSticky;
