import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

function EditIndividualTask({ task, newInput, handleSaveEdit, handleSaveEditButton, handleCancelEditButton }) {
  
  return (
    <div
      className="flex bg-[#2C2824] py-1 px-2.5 sm:py-2.5 sm:px-5 rounded-md gap-5 w-full max-w-xl h-full items-center justify-center text-xl transition-all duration-200"
    >
      
      {/* Text */}
      <div className="flex items-center justify-start w-7/8 text-wrap">
        <input
          autoFocus
          type="text"
          className="w-full bg-transparent text-[#DCC9A9] outline-none placeholder-[#DCC9A9]/40 transition-colors text-sm sm:text-base"
          value={newInput}
          placeholder={task}
          onChange={(e) => handleSaveEdit(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              handleCancelEditButton()
            } else if (e.key === "Enter") {
              handleSaveEditButton()
            }
          }}
        />
      </div>
      
      {/* Edit and Delete Button*/}
      <div className="flex items-center justify-between gap-3 w-1/8">
        <FaCheck 
          onMouseDown={(e) => {
            e.preventDefault();
            handleSaveEditButton()
          }}
          className="cursor-pointer text-[#4E6851] hover:text-[#DCC9A9] transition-colors"
        />
        <ImCross
          onMouseDown={(e) => {
            e.preventDefault();
            handleCancelEditButton()
          }}
          className="cursor-pointer text-[#B83A2D] hover:text-[#8C2C22] transition-colors text-sm"
        />
      </div>
      
    </div>
  )
}

export default EditIndividualTask;