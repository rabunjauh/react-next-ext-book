import Button from "@/app/components/ButtonComponent";
export default function MessageAlert({ messageValue, onClick }) {
  return (
    <div className="w-56 md:w-72 fixed text-xs md:text-lg top-40 md:top-5 right-5 bg-gray-400 text-white px-2 rounded-md h-10 flex justify-between items-center">
      <span className="">{messageValue}</span>
      <Button style="text-white font-thin pr-2" value="x" onClick={onClick} />
    </div>
  );
}
