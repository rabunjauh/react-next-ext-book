"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useForm, useFieldArray, Control, useWatch } from "react-hook-form";

export default function AddGroup() {
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);
  const router = useRouter();
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      group: [{ description: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "group",
    control,
    rules: {
      required: true,
    },
  });

  const toggle = () => {
    setModal(!modal);
    resetField("description");
  };

  const closeAlert = () => {
    setAlert(false);
  };

  const submit = async (data) => {
    try {
      const createGroups = await postGroup(data);
      setAlert(true);
      setMessage(createGroups);
    } catch (error) {
      console.log(error);
    }
    router.refresh();
    setModal(false);
  };

  const postGroup = (data) => {
    return fetch("http://localhost:3000/group", {
      method: "POST",
      body: JSON.stringify(data.group),
      headers: {
        "Content-Type": "application/json",
      },
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

  return (
    <div>
      {alert ? (
        <div className="mb-3 bg-sky-600 text-white text-lg px-3 py-5 rounded-md h-16 flex justify-between">
          <span className="">{message}</span>
          <button
            className="btn btn-circle btn-info btn-xs text-white"
            onClick={closeAlert}
          >
            x
          </button>
        </div>
      ) : (
        ""
      )}
      <button className="btn btn-outline" onClick={toggle}>
        Add Group
      </button>

      <input
        type="checkbox"
        checked={modal}
        className="modal-toggle"
        onChange={toggle}
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Group</h3>
          <form onSubmit={handleSubmit(submit)}>
            <table className="table w-full mt-5">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Group Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => {
                  return (
                    <tr key={field.id}>
                      <td>{index + 1}</td>
                      <td>
                        <input
                          type="text"
                          {...register(`group.${index}.description`, {
                            required: true,
                          })}
                          className="input input-bordered w-full mb-2 mr-2"
                        />
                        <p>
                          {errors.group?.[index]?.description && (
                            <p>This can't be empty</p>
                          )}
                        </p>
                      </td>
                      <td>
                        {index > 0 ? (
                          <button
                            type="button"
                            className="btn btn-outline btn-sm"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </button>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => append()}
              >
                Append
              </button>
            </div>
            <div>
              <button type="submit" className="btn btn-outline btn-sm">
                Submit
              </button>
              <label className="btn btn-outline btn-sm" onClick={toggle}>
                Close
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
