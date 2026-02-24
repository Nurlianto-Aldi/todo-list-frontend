import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

function EditIndividualTask({ task, handleSaveEdit, handleSaveEditButton, handleCancelEditButton }) {
  
  return (
    <div
      className="flex bg-blue-900 py-2.5 px-5 rounded-md gap-5 w-full max-w-xl h-full items-center justify-center text-xl"
    >
      
      {/* Text */}
      <div
        className="flex items-center justify-start w-7/8 text-wrap"
      >
        <input
          autoFocus
          type="text"
          className="w-full"
          placeholder={task}
          onChange={(e) => handleSaveEdit(e.target.value)}
          // onBlur={() => handleCancelEditButton()}
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
      <div
        className="flex items-center justify-between gap-2.5 w-1/8"
      >
        <FaCheck 
          // onClick={() => handleSaveEditButton()}
          onMouseDown={(e) => {
            e.preventDefault();
            handleSaveEditButton()
          }}
          className="cursor-pointer"
        />
        <ImCross
          // onClick={() => handleCancelEditButton()}
          onMouseDown={(e) => {
            e.preventDefault();
            handleSaveEditButton()
          }}
          className="cursor-pointer"
        />
      </div>
      
    </div>
  )
}

export default EditIndividualTask;