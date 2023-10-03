"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, useFieldArray, Control, useWatch } from "react-hook-form";

export default function AddGroup() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    resetField,
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
  });
  const submit = async (data) => {
    try {
      const createGroups = await postGroup(data);
      alert(createGroups);
      router.push("/group");
    } catch (error) {
      alert(error);
    }
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
    <div className="w-6/12">
      <h1 className="text-5xl mb-10">Add New Group</h1>
      <Link href={"/group"} className="btn btn-outline">
        Back
      </Link>
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
                        required: "Description can not be empty!",
                      })}
                      className="input input-bordered w-full mb-2 mr-2"
                    />
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
        <div className="flex flex-row justify-between ... my-5">
          <div>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => append()}
            >
              Append
            </button>
          </div>
          <div>
            <button type="submit" className="btn btn-outline">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
