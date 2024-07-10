import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

const CreateSticky = (ttle, txt, stripid) => {
  const data = {
    data: {
      ttle,
      txt,
      stripid,
    },
  };

  return axiosClient
    .post("/stickies", data)
    .then((response) => {
      console.log("Sticky created:", response.data);
      return response;
    })
    .catch((error) => {
      console.error(
        "Error creating sticky:",
        error.response ? error.response.data : error.message
      );
      throw error;
    });
};

export default CreateSticky;
