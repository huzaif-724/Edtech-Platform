import React from "react";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteSubsection } from "../../services/courseAPI";
import { useDispatch } from "react-redux";
import { updateSection } from "../../slices/courseSlice";
import CreateSubsectionModel from "./CreateSubsectionModal";
import { useState } from "react";

const InstructorSubsection = ({
  subSectionId,
  title,
  description,
  video,
  sectionId,
  token,
}) => {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [existingSubsection, setExistingSubsection] = useState(null);

  const deleteHandler = async () => {
    let response = await deleteSubsection(subSectionId, sectionId, token);

    // console.log('response.data.data :>> ', response.data.data);

    if (response.status === 200) {
      dispatch(updateSection(response.data.data));
    }
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const editHandler = () => {
    setExistingSubsection({
      title,
      description,
      video,
      subSectionId,
    });
    openModal();
  };

  return (
    <>
      <div>
        <div className=" w-full h-[50px] flex items-center ml-10  justify-between ">
          <div className=" flex items-center ">
            <span>
              <HiOutlineVideoCamera />
            </span>
            <p className="text-md ml-4 lg:hidden">
              {title.length > 15 ? title.slice(0, 15) + "..." : title}
            </p>

            <p className="text-md ml-4  hidden lg:block">
              {title.length > 40 ? title.slice(0, 40) + "..." : title}
            </p>
          </div>

          <div className="text-sm font-medium text-richblack-100 mr-10">
            <button
              className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
              onClick={editHandler}
            >
              <FiEdit2 size={20} />
            </button>

            <button className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300">
              <RiDeleteBin6Line size={20} onClick={deleteHandler} />
            </button>
          </div>
        </div>
      </div>
      {/* Modal Component */}
      <CreateSubsectionModel
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        sectionId={sectionId}
        existingSubsection={existingSubsection}
      />
    </>
  );
};

export default InstructorSubsection;
