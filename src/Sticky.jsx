import React, { useState } from "react";
import { SquarePlus } from "lucide-react"; // Import SquarePlus directly
import "./st.css";

const Sticky = () => {
  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [isOpen, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
  };
  const handleSave = () => {
    alert(`Created title with  ${title}`);
    alert(`Created stick with  ${text}`);

    setOpen(false);
  };

  return (
    <div className="content">
      <div onClick={openDialog} className="create">
        <SquarePlus />
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
              placeholder="Title (max 300 characters)"
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
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sticky;
