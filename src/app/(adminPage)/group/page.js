import AddGroup from "@/app/components/group/addGroup";
// import EditGroup from "@/app/components/group/editGroup";
import DeleteGroup from "@/app/components/group/deleteGroup";

export default async function viewGroup() {
  const getGroups = () => {
    return fetch("http://localhost:3000/group", {
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          return response.status;
        } else {
          return response.json();
        }
      })
      .then((response) => {
        return response;
      });
  };

  const handleDelete = (id) => {
    console.log(id);
  };

  const result = await getGroups();
  const groups = result.data;

  return (
    <>
      <div className="md:ml-56 px-10 mt-5 pb-20">
        <h1 className="text-5xl mb-10">Group</h1>

        <AddGroup />
        <table className="table w-full table-zebra mt-5">
          <thead>
            <tr>
              <th>#</th>
              <th>Group Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {groups ? (
              groups.map((group, index) => (
                <tr key={group.id}>
                  <td>{index + 1}</td>
                  <td>{group.description}</td>
                  <td className="flex">
                    <div className="mr-1">{/* <EditGroup {...group} /> */}</div>
                    <div>
                      <DeleteGroup {...group} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No Data Available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
