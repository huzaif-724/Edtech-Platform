import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCirclePlus } from "react-icons/ci";
import { deleteSection } from "../../services/courseAPI";
import InstructorSubsection from "./InstructorSubsection";
import { useState } from "react";
import CreateSubsectionModel from "./CreateSubsectionModal";
import { useDispatch } from "react-redux";
import { setSections } from "../../slices/courseSlice";
import { FaPlus } from "react-icons/fa";
import { editSection } from "../../services/courseAPI";

const InstructorSection = ({
  name,
  sectionId,
  subsections,
  onDelete,
  courseId,
  token,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenSection, setModalOpenSection] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const dispatch = useDispatch();

  const deleteHandler = async () => {
    const response = await deleteSection(sectionId, courseId, token);
    onDelete(sectionId);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const openModalSection = () => setModalOpenSection(true);
  const closeModalSection = () => setModalOpenSection(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await editSection(editedName, sectionId, courseId, token);

    if (response.status === 200) {
      //console.log("response section edit :>> ", response);

      dispatch(setSections(response.data.data.courseContent));
    }

    closeModalSection();
  };

  const onChangeHandler = (e) => {
    setEditedName(e.target.value);
  };

  return (
    <>
      <div className=" flex flex-col ">
        <div className=" overflow-hidden h-auto flex flex-col text-center w-[100%] lg:w-[100%] border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0 mt-3">
          <div className=" flex items-center h-[50px] justify-between w-full  ">
            <p className="text-md ml-4 lg:hidden">
              {name.length > 20 ? name.slice(0, 20) + "..." : name}
            </p>

            <p className="text-md ml-4  hidden lg:block">
              {name.length > 40 ? name.slice(0, 40) + "..." : name}
            </p>

            <div className="text-sm font-medium text-richblack-100">
              <button
                className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                onClick={(e) => {
                  e.preventDefault();
                  openModal();
                }}
              >
                <CiCirclePlus size={22} />
              </button>

              <button
                className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                onClick={openModalSection}
              >
                <FiEdit2 size={20} />
              </button>

              <button
                className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                onClick={deleteHandler}
              >
                <RiDeleteBin6Line size={20} />
              </button>
            </div>
          </div>
          <div className=" w-full h-[1px] bg-richblack-400"></div>
          {subsections.map((subSection) => (
            <InstructorSubsection
              key={subSection._id}
              subSectionId={subSection._id}
              title={subSection.title}
              description={subSection.description}
              video={subSection.video}
              sectionId={sectionId}
              token={token}
            />
          ))}
        </div>
      </div>

      {/* Modal Component */}
      <CreateSubsectionModel
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        sectionId={sectionId}
      />

      {isModalOpenSection && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className=" p-6 rounded-xl  text-white bg-black w-[90%] border max-w-lg h-[40vh] relative overflow-hidden">
            <button
              onClick={closeModalSection}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-2">Update Section</h2>

            <form
              onSubmit={submitHandler}
              className="flex flex-col gap-y-6 mt-6  "
            >
              <label>
                <p className="text-sm font-medium text-richblack-5 mb-2">
                  Section Name <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="editedName"
                  name="editedName"
                  value={editedName}
                  onChange={onChangeHandler}
                  placeholder="Add a section to build your course"
                  className="form-input w-full border border-richblack-600 bg-richblack-700 text-richblack-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-50"
                />
              </label>

              <button
                type="submit"
                className="bg-[#161D29] w-[170px] text-[#FFD60A] border border-[#FFD60A] flex justify-between items-center font-medium py-4 px-4 rounded-md  transition-all"
              >
                <FaPlus /> <p>Update Section</p>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default InstructorSection;
