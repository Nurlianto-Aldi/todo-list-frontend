import { MdDelete, MdEdit } from "react-icons/md";

export function TheTask({text}) {
  return (
    <div>

      <div
        className="flex justify-between border-0 bg-[#435663] placeholder-gray-300 rounded-md px-2.5 py-1 hover:bg-[#859199]"
      >
        <span
          className="cursor-pointer"
        >{text}</span>
        <div
          className="flex gap-3"
        >
          <button
            className="cursor-pointer"
          ><MdEdit /></button>
          <button
            className="cursor-pointer"
          ><MdDelete /></button>
        </div>
      </div>

    </div>
  )
}