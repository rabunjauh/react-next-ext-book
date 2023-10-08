import Link from "next/link";

export default function Nav() {
  return (
    // <aside className="menu bg-base-200 w-56 h-full p-0 divide-y mr-10 fixed left-0 top-0">
    <aside className="bg-[#343A40] md:h-screen md:w-56 md:fixed md:p-0 md:divide-y md:mr-1 md:left-0 md:top-0">
      <div className="h-20 mx-auto text-3xl content-center text-[#d6d8d9] text-center">
        Company Logo
      </div>
      <div className="flex justify-center md:block md:pt-4 pb-2">
        <div className="mx-3 text-[#d6d8d9]">
          <Link href={"/position"}>Position</Link>
        </div>
        <div className="mx-3 text-[#d6d8d9]">
          <Link href={"/group"}>Group</Link>
        </div>
      </div>
    </aside>
  );
}
