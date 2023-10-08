"use client";
import DataTable from "react-data-table-component";
export default function GroupTable({ groups }) {
  const columns = [
    {
      name: "Group",
      selector: (row) => row.description,
    },
    {
      name: "Action",
      selector: (row) => {
        return <button>Edit</button>;
      },
    },
  ];

  const data = groups;
  return (
    <div>
      <DataTable columns={columns} data={data} pagination selectableRows />
    </div>
  );
}
