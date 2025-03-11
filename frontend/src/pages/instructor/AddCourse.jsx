import React, { useEffect, useState } from "react";
import { fetchCategories, createCourse } from "../../services/courseAPI";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCourse } from "../../slices/courseSlice";

const AddCourse = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [thumbnailImage, setThumbnail] = useState(null);
  const [preview, setPreview] = useState("");
  const [courseData, setCourseData] = useState({
    title: "",
    tag: "",
    description: "",
    price: "",
    category: "",
    whatYouWillLearn: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchCategories();
      // console.log("result :>> ", result);
      setCategories(result);
    };

    fetchData();
  }, []);

  // console.log("categories :>> ", categories);

  const { title, description, tag, price, category, whatYouWillLearn } =
    courseData;

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", courseData.title);
    formData.append("description", courseData.description);
    formData.append("tag", courseData.tag);
    formData.append("price", courseData.price);
    formData.append("category", courseData.category);
    formData.append("whatYouWillLearn", courseData.whatYouWillLearn);
    if (thumbnailImage) {
      formData.append("thumbnail", thumbnailImage);
    }

    const response = await createCourse(token, formData);

    if (response?.success) {
      navigate("/dashboard/add-section");
      dispatch(setCourse(response.data));
    }
  };

  const handleOnChange = (e) => {
    setCourseData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      setThumbnail(file); // Store in state
      setPreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  return (
    <div className=" min-h-screen flex  flex-col h-auto pt-20 mt-12 mx-auto w-[90%]     gap-5  ">
      <div className=" flex items-center  mx-auto w-[90%] lg:w-[50%]  lg:pl-28 ">
        <div className=" flex flex-col">
          <div className=" w-[40px] h-[40px] rounded-full bg-[#251400] border border-[#FFD60A] text-[#FFD60A] text-[18px] flex justify-center items-center">
            1
          </div>
        </div>

        <div className="w-[33%] border-dashed border-b-2 border-[#424854]"></div>

        <div className=" w-[40px] h-[40px] rounded-full bg-[#161D29] border border-[#2C333F] text-[#838894] text-[18px] flex justify-center items-center">
          2
        </div>
        <div className="w-[33%] border-dashed border-b-2 border-[#424854]"></div>
        <div className=" w-[40px] h-[40px] rounded-full bg-[#161D29] border border-[#2C333F] text-[#838894] text-[18px] flex justify-center items-center">
          3
        </div>
      </div>

      <div className=" flex  justify-center gap-4 mt-16  mb-10 ">
        <div className="w-[550px] lg:px-5 pb-5 px-4  bg-richblack-800 rounded-lg">
          {/* Form */}
          <form
            onSubmit={handleOnSubmit}
            className="flex flex-col gap-y-6 mt-6  "
          >
            {/* Email */}
            <label>
              <p className="text-sm font-medium text-richblack-5 mb-2">
                Course Title <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type="title"
                name="title"
                value={title}
                onChange={handleOnChange}
                placeholder="Enter Course Title"
                className="form-input w-full border border-richblack-600 bg-richblack-700 text-richblack-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-50"
              />
            </label>

            {/* Email */}
            <label>
              <p className="text-sm font-medium text-richblack-5 mb-2">
                Course Short Description <sup className="text-pink-200">*</sup>
              </p>
              <textarea
                required
                type="description"
                name="description"
                value={description}
                onChange={handleOnChange}
                placeholder="Enter Description"
                className="form-input input-custom  w-full h-[120px] border border-richblack-600 bg-richblack-700 text-richblack-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-50"
              />
            </label>

            {/* Email */}
            <label>
              <p className="text-sm font-medium text-richblack-5 mb-2">
                Price <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type="number"
                name="price"
                value={price}
                onChange={handleOnChange}
                placeholder="Enter Price"
                className="form-input w-full border border-richblack-600 bg-richblack-700 text-richblack-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-50"
              />
            </label>

            {/* Email */}
            <label>
              <p className="text-sm font-medium text-richblack-5 mb-2">
                Category <sup className="text-pink-200">*</sup>
              </p>
              <select
                required
                name="category"
                value={category}
                onChange={handleOnChange}
                className="form-input w-full border border-richblack-600 bg-richblack-700 text-richblack-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-50"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading categories...</option>
                )}
              </select>
            </label>

            {/* Email */}
            <label>
              <p className="text-sm font-medium text-richblack-5 mb-2">
                Tags <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type="tag"
                name="tag"
                value={tag}
                onChange={handleOnChange}
                placeholder="Enter Tags"
                className="form-input w-full border border-richblack-600 bg-richblack-700 text-richblack-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-50"
              />
            </label>

            {/* Email */}
            <label>
              <p className="text-sm font-medium text-richblack-5 mb-2">
                Course Thumbnail <sup className="text-pink-200">*</sup>
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="form-input w-full border border-richblack-600 bg-richblack-700 text-richblack-200 rounded-md px-4 py-2"
              />
            </label>

            {preview && (
              <img
                src={preview}
                alt="Thumbnail Preview"
                className="w-[300px] h-[150px] mx-auto object-cover mt-2 rounded-md"
              />
            )}

            {/* Email */}
            <label>
              <p className="text-sm font-medium text-richblack-5 mb-2">
                Benefits of the course <sup className="text-pink-200">*</sup>
              </p>
              <textarea
                required
                type="whatYouWillLearn"
                name="whatYouWillLearn"
                value={whatYouWillLearn}
                onChange={handleOnChange}
                placeholder="Enter Benefits of the course"
                className="form-input h-[100px] w-full border border-richblack-600 bg-richblack-700 text-richblack-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-50"
              />
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-yellow-50 text-richblack-900 font-medium py-2 px-4 rounded-md hover:bg-yellow-100 transition-all"
            >
              Next
            </button>
          </form>
        </div>

        <div className=" w-[400px] ml-20 rounded-2xl h-[350px] p-5 bg-richblack-800 hidden lg:block">
          <h1 className=" text-white font-semibold text-xl">
            ⚡Course Upload Tips
          </h1>
          <p className=" text-richblack-100  pl-5 text-[15px] ">
            ‣ Set the Course Price option or make it free.
            <br /> ‣ Standard size for the course thumbnail is 1024x576. <br />‣
            Video section controls the course overview video.
            <br />‣ Course Builder is where you create & organize a course.{" "}
            <br />
            ‣ Add Topics in the Course Builder section to create lessons,
            quizzes, and assignments.
            <br />‣ Information from the Additional Data section shows up on the
            course single page.
            <br />‣ Make Announcements to notify any important
            <br />‣ Notes to all enrolled students at once.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
