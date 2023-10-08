"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useFieldArray, Control, useWatch } from "react-hook-form";
import Button from "@/app/components/button";
import MessageAlert from "@/app/components/messageAlert";

export default function AddGroup() {
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);
  const router = useRouter();
  const {
    register,
    reset,
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
    reset({
      group: [{ description: "" }],
    });
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
        <MessageAlert messageValue={message} onClick={closeAlert} />
      ) : null}

      <Button
        style="border-2 border-black rounded-lg px-2 hover:border-2 hover:border-white hover:bg-black hover:text-white"
        value="Add Group"
        onClick={toggle}
      />

      {modal ? (
        <div className="fixed inset-0 flex justify-center items-center transition-colors visible bg-black/70">
          <div className="bg-white p-5 rounded-lg">
            <h3 className="font-bold text-lg">Add New Group</h3>
            <div>
              <Button
                style="text-xs border-2 border-black rounded-full px-2 hover:border-2 hover:border-white hover:bg-black hover:text-white"
                value="Append"
                onClick={() => append()}
              />
            </div>
            <form onSubmit={handleSubmit(submit)}>
              <table className="table-auto border-collapse border border-slate-300 w-full my-2 shadow-md">
                <thead>
                  <tr className="bg-gray-400">
                    <th className="border border-slate-300 px-2">#</th>
                    <th className="border border-slate-300 px-2">
                      Group Description
                    </th>
                    <th className="border border-slate-300 px-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((field, index) => {
                    return (
                      <tr className="bg-gray-200" key={field.id}>
                        <td className="border border-slate-300 px-2">
                          {index + 1}
                        </td>
                        <td className="border border-slate-300 p-2">
                          <input
                            type="text"
                            {...register(`group.${index}.description`, {
                              required: true,
                            })}
                            className="w-full mb-2 mr-2"
                          />
                          <p>
                            {errors.group?.[index]?.description && (
                              <p>This can't be empty</p>
                            )}
                          </p>
                        </td>
                        <td className="border border-slate-300 px-2">
                          {index > 0 ? (
                            <Button
                              style="text-xs border-2 px-2 border-black rounded-full hover:border-2 hover:border-white hover:bg-black hover:text-white"
                              value="Remove"
                              onClick={() => remove(index)}
                            />
                          ) : null}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="text-xs border-2 border-black rounded-full px-2 hover:border-2 hover:border-white hover:bg-black hover:text-white"
                >
                  Submit
                </button>

                <Button
                  style="text-xs border-2 border-black rounded-full px-2 hover:border-2 hover:border-white hover:bg-black hover:text-white"
                  value="Close"
                  onClick={toggle}
                />
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
