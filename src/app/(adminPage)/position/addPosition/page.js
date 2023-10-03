"use client";
import { useState } from "react";

export default function AddPosition() {
  const [data, setData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <h1 className="text-5xl mb-10">Add Position</h1>
      <input value={name} onChange={handleAddData} className=" bg-cyan-300" />
      <p>Name: {name}</p>
    </div>
  );
}
