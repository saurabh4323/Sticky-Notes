import React, { useState } from "react";
import { SquarePlus, Eye } from "lucide-react";
import "./st.css";
import CreateSticky from "./Route";

const Sticky = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [stripid, setStripid] = useState("");
  const [isOpen, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (!title || !text || !stripid) {
      alert("Please enter title, text, and stripid.");
      return;
    }

    try {
      const response = await CreateSticky(title, text, stripid);
      console.log("Sticky created successfully:", response.data);
      alert(`Sticky created with title: ${title}`);
      setTitle("");
      setText("");
      setStripid("");
      setOpen(false);
    } catch (error) {
      console.error("Failed to create sticky:", error);
      alert("Failed to create sticky note. Please try again.");
    }
  };

  return (
    <div className="content">
      <div className="see">
        <div onClick={openDialog} className="create">
          <h2>ADD PRIVATE ITEMS IN STORE</h2>
          <SquarePlus />
          {/* <Eye /> */}
        </div>
        <div className="create">
          <h2>SEE YOUR ITEMS FROM STORE</h2>
          {/* <SquarePlus /> */}
          <Eye />
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
              type="text"
              placeholder="Title (max 100 characters)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
            />
            <textarea
              placeholder="Text (max 300 characters)"
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={300}
            />
            <input
              type="text"
              placeholder="Sticky ID"
              value={stripid}
              onChange={(e) => setStripid(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sticky;
