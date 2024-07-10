// import axios from "axios";

// const API = import.meta.env.VITE_STRAPI_API_KEY;

// const axiosClient = axios.create({
//   baseURL: "http://localhost:1337/api",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${API}`,
//   },
// });

// const CreateSticky = (title, text, stripid) => {
//   const data = {
//     data: {
//       title,
//       text,
//       stripid,
//     },
//   };

//   return axiosClient.post("/stickies", data).then((res) => {
//     console.log(res.data);
//   });
// };

// export default CreateSticky;
import axios from "axios";

const API = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
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
