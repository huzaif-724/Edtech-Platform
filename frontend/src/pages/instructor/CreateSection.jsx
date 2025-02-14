import React, { useEffect } from "react"
import { useSelector } from "react-redux";

const CreateSection = () => {

  const courseDetails = useSelector((state)=> state.course.course)

  useEffect(()=>{

    console.log('courseDetails :>> ', courseDetails);
    console.log('courseDetails :>> ');

  }, [])
  return (
    <div>
      
    </div>
  )
};

export default CreateSection;
