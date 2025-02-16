import React from "react";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { addSubsection } from "../../services/courseAPI"
import { useSelector, useDispatch } from "react-redux";
import { updateSection } from "../../slices/courseSlice";

const CreateSubsectionModel = ({ isModalOpen, closeModal, sectionId}) => {

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const [subSectionData, setSubSectionData] = useState(
    {
        title : "",
        description : "",
    }
  );
  const [video, setVideo] = useState(null);

  const {title, description} = subSectionData;

  const handleFileChange = (event) => {
    const file = event.target.files[0]; 
    if (file) {
      setVideo(file);
    }
  };

  const onChangeHandler = (e) => {
    setSubSectionData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
 
  const submitHandler = async (e)=>{

    e.preventDefault();

    const formData = new FormData();
    formData.append("title", subSectionData.title);
    formData.append("description", subSectionData.description);
    formData.append("sectionId", sectionId)

    if (video) {
        formData.append("video", video);
    }

    const response = await addSubsection(formData, token)

    if(response.data.success)
    {
      dispatch(updateSection(response?.data?.data));
    }

    closeModal();

  }
 


  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className=" p-6 rounded-lg shadow-[0_5px_15px_rgba(255,_255,_255,_0.5)] text-white bg-richblack-900 w-[90%] max-w-lg h-[70vh] relative overflow-hidden">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-2">Editing Lecture</h2>

            <form
              onSubmit={submitHandler}
              className="flex flex-col gap-y-6 mt-6  "
            >
              <label>
                <p className="text-sm font-medium text-richblack-5 mb-2">
                  Lecture Video <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="form-input w-full border border-richblack-600 bg-richblack-700 text-richblack-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-50"
                />
              </label>

              <label>
                <p className="text-sm font-medium text-richblack-5 mb-2">
                  Lecture Title <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="title"
                  name="title"
                  value={title}
                  onChange={onChangeHandler}
                  placeholder="Add a section to build your course"
                  className="form-input w-full border border-richblack-600 bg-richblack-700 text-richblack-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-50"
                />
              </label>

              <label>
                <p className="text-sm font-medium text-richblack-5 mb-2">
                  Lecture Description <sup className="text-pink-200">*</sup>
                </p>

                <textarea
                  required
                  type="description"
                  name="description"
                  value={description}
                  onChange={onChangeHandler}
                  placeholder="Add a section to build your course"
                  className="form-input w-full border border-richblack-600 bg-richblack-700 text-richblack-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-50"
                />
              </label>

              <button
                type="submit"
                className="bg-[#161D29] w-[170px] text-[#FFD60A] border border-[#FFD60A] flex justify-between items-center font-medium py-4 px-4 rounded-md  transition-all"
              >
                <FaPlus /> <p>Create Section</p>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateSubsectionModel;
