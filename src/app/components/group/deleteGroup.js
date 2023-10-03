"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function deleteGroup(group) {
  const [modal, setModal] = useState(false);
  const handleDelete = () => {};

  const toggle = () => {
    setModal(!modal);
  };
  return (
    <div>
      <button className="btn btn-outline btn-sm" onClick={toggle}>
        <FontAwesomeIcon icon={faTrashCan} />
      </button>

      <input
        type="checkbox"
        checked={modal}
        className="modal-toggle"
        onChange={toggle}
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure want to delete {group.description}?
          </h3>
          <div className="modal-action">
            <button
              type="submit"
              className="btn btn-outline btn-sm"
              onClick={handleDelete}
            >
              Delete
            </button>
            <label className="btn btn-outline btn-sm" onClick={toggle}>
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
