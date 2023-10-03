// import Link from "next/link";

// async function getPositions() {
//   const res = await fetch("http://localhost:3000/position");

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

export default async function Position() {
  // const data = await getPositions();
  // const positions = data.positions;
  return (
    <div>
      <h1 className="text-5xl mb-10">Position</h1>
      {/* <Link
          className="bg-cyan-300 px-5 py-3 border-solid border-white border-2 rounded-lg shadow-md"
          href="/position/addPosition"
        >
          Add Position
        </Link>
        <table className="table-auto mt-5">
          <thead>
            <tr>
              <th className="border border-black ...">No</th>
              <th className="border border-black ...">Position Name</th>
              <th className="border border-black ...">Action</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position, index) => (
              <tr key={position.id}>
                <td className="border border-black ...">{index + 1}</td>
                <td className="border border-black ...">{position.name}</td>
                <td className="border border-black ...">Edit | Delete</td>
              </tr>
            ))}
          </tbody>
        </table> */}
    </div>
  );
}
