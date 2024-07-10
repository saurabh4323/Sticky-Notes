import React, { useState, useEffect } from "react";
import { SquarePlus } from "lucide-react";
import "./st.css"; // Assuming you have your CSS styles defined here
import CreateSticky from "./Route";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const Sticky = () => {
  const [useremail, setUserEmail] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [sticklist, setSticklist] = useState([]);
  const API = import.meta.env.VITE_STRAPI_API_KEY;
  const { user } = useUser();

  const axiosClient = axios.create({
    baseURL: "https://stikcynotes-backend.onrender.com/api",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API}`,
    },
  });

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (!title || !text || !password) {
      alert("Please enter title, text, and password.");
      return;
    }

    try {
      await CreateSticky(title, text, password, image, useremail);
      setTitle("");
      setText("");
      setPassword("");
      setImage(null);
      document.getElementById("fileInput").value = "";
      closeDialog();
      getstick();
    } catch (err) {
      // console.log(err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const getstick = () => {
    axiosClient
      .get("/sticksecrets?populate=*")
      .then((res) => {
        // console.log("Data from API:", res.data);
        if (Array.isArray(res.data.data)) {
          const filterstick = res.data.data.filter(
            (stick) => stick.attributes.useremail === useremail
          );
          setSticklist(filterstick);
        } else {
          // console.error("Expected an array of objects, got:", res.data);
        }
      })
      .catch((error) => {
        // console.error("Error fetching sticksecrets:", error);
      });
  };

  // console.log(sticklist);

  useEffect(() => {
    if (user) {
      setUserEmail(user.primaryEmailAddress.emailAddress);
    } else {
      // console.log("User not logged in");
    }
  }, [user]);

  useEffect(() => {
    if (useremail) {
      getstick();
    }
  }, [useremail]);

  return (
    <div className="whole">
      <div className="content">
        <div className="see">
          <div onClick={openDialog} className="create">
            <SquarePlus />
          </div>
        </div>
        {isOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeDialog}>
                &times;
              </span>
              <h2>Create Sticky Note</h2>
              <input
                className="input-field"
                type="text"
                placeholder="Title (max 100 characters)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
              />
              <textarea
                className="text-area"
                placeholder="Text (max 300 characters)"
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={300}
              />
              <input
                className="input-field"
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="file-input"
                type="file"
                id="fileInput"
                onChange={handleImageChange}
              />
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="sticky-container">
        {sticklist.map((event) => {
          const imageUrl =
            event.attributes.image?.url ||
            (event.attributes.image?.data[0]?.attributes?.url &&
              `https://stikcynotes-backend.onrender.com${event.attributes.image.data[0].attributes.url}`);

          return (
            <div className="card" key={event.id}>
              <div className="card-content">
                <div className="title">{event.attributes.title}</div>
                <div className="text">{event.attributes.text}</div>
                {imageUrl && (
                  <img
                    className="sticky-image"
                    src={imageUrl}
                    alt="Sticky Note"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sticky;
