"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import MessageAlert from "@/app/components/messageAlert";
config.autoAddCss = false;

export default function deleteGroup(group) {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const handleDelete = async (id) => {
    const fetchDelete = (id) => {
      return fetch(`http://localhost:3000/group/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((response) => {
          return response.message;
        });
    };

    try {
      const deleteData = await fetchDelete(id);
      setAlert(true);
      setMessage(deleteData);
    } catch (error) {
      console.log(error);
    }
    router.refresh();
    setModal(false);
  };

  const toggle = () => {
    setModal(!modal);
  };

  const closeAlert = () => {
    setAlert(false);
  };

  return (
    <div>
      {alert ? (
        <MessageAlert messageValue={message} onClick={closeAlert} />
      ) : null}
      <button
        className="text-xs border border-black rounded-full px-2 hover:border hover:border-white hover:bg-black hover:text-white"
        onClick={toggle}
      >
        <FontAwesomeIcon icon={faTrashCan} /> Delete
      </button>

      {modal ? (
        <div className="text-center">
          <div className="fixed inset-0 flex justify-center items-center transition-colors visible bg-black/70">
            <div className="bg-white p-5 shadow transition-all scale-opacity-100 rounded-lg">
              <h1 className="font-bold text-lg text-red-500">
                <FontAwesomeIcon icon={faTrashCan} />
              </h1>
              <h3 className="text-lg font-black text-gray-800">
                Confirm Delete
              </h3>
              <p className="text-xs text-gray-500 mb-2">
                Are you sure you want delete {group.description}?
              </p>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="mx-1 border-2 border-red-600 rounded-lg px-2 hover:border-2 hover:border-white hover:bg-red-500 hover:text-white"
                  onClick={() => handleDelete(group.id)}
                >
                  Delete
                </button>
                <label
                  className="mx-1 border-2 border-red-600 rounded-lg px-2 hover:border-2 hover:border-white hover:bg-red-500 hover:text-white"
                  onClick={toggle}
                >
                  Close
                </label>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
