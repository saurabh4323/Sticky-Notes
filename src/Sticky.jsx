import React, { useState, useEffect } from "react";
import { Eye, SquarePlus } from "lucide-react";
import "./st.css"; // Assuming you have your CSS styles defined here
import axios from "axios";
import { SignIn, useUser } from "@clerk/clerk-react";

const Sticky = () => {
  const [useremail, setUserEmail] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [isOpeen, setOpeen] = useState(false);
  const [sticklist, setSticklist] = useState([]);
  const [seepassword, setSeePassword] = useState("");
  const [matchingStick, setMatchingStick] = useState(null);
  const [showMatchingStick, setShowMatchingStick] = useState(false);

  const API = import.meta.env.VITE_STRAPI_API_KEY;
  const { user } = useUser();

  const axiosClient = axios.create({
    baseURL: "http://localhost:1337/api",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API}`,
    },
  });

  const openDialog = () => {
    if (!user) {
      alert("Please Signin first");
    } else {
      setOpen(true);
    }
  };
  const closeDialog = () => {
    setOpen(false);
  };

  const opeenDialog = () => {
    setOpeen(true);
  };

  const closeeDialog = () => {
    setOpeen(false);
    setSeePassword("");
    setMatchingStick(null);
  };

  const handleSave = async () => {
    if (!title || !text || !password) {
      alert("Please enter title, text, and password.");
      return;
    }
    try {
      await axiosClient.post("/sticksecrets", {
        data: { title, text, password, image, useremail },
      });
      setTitle("");
      setText("");
      setPassword("");
      setImage(null);
      document.getElementById("fileInput").value = "";
      closeDialog();
      getstick();
    } catch (err) {
<<<<<<< HEAD
      console.error(err);
    }
  };

  const handleSee = async () => {
    if (!seepassword) {
      alert("Please enter password.");
      return;
    }

    const matchedStick = sticklist.find(
      (stick) => stick.attributes.password === seepassword
    );

    if (matchedStick) {
      setMatchingStick(matchedStick);
      setShowMatchingStick(true);
    } else {
      alert("No sticky note found with the entered password.");
=======
      // console.log(err);
>>>>>>> 1864b1b7c6ad19fdf0c8c6fadc25d9ed03613bc6
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
<<<<<<< HEAD
=======
        // console.log("Data from API:", res.data);
>>>>>>> 1864b1b7c6ad19fdf0c8c6fadc25d9ed03613bc6
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

<<<<<<< HEAD
  useEffect(() => {
    if (user) {
      setUserEmail(user.primaryEmailAddress.emailAddress);
=======
  // console.log(sticklist);

  useEffect(() => {
    if (user) {
      setUserEmail(user.primaryEmailAddress.emailAddress);
    } else {
      // console.log("User not logged in");
>>>>>>> 1864b1b7c6ad19fdf0c8c6fadc25d9ed03613bc6
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
          <div onClick={opeenDialog} className="create">
            <Eye />
          </div>
        </div>

        {isOpen && user && (
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
                type="password"
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

        {isOpeen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeeDialog}>
                &times;
              </span>
              <h2>See Your Note</h2>
              <input
                className="input-field"
                type="password"
                placeholder="Password"
                value={seepassword}
                onChange={(e) => setSeePassword(e.target.value)}
              />
              <button className="save-button" onClick={handleSee}>
                See
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="sticky-container">
        {showMatchingStick && matchingStick && (
          <div className="card">
            <div className="card-content">
              <div className="title">{matchingStick.attributes.title}</div>
              <div className="text">{matchingStick.attributes.text}</div>
              {matchingStick.attributes.image && (
                <img
                  className="sticky-image"
                  src={`http://localhost:1337${matchingStick.attributes.image.data[0].attributes.url}`}
                  alt="Sticky Note"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sticky;
