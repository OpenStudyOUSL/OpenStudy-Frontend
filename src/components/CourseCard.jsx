import { Link } from "react-router-dom";



export default function CourseCard(props) {
  return (
    <div className="w-80 h-112.5 bg-white rounded-2xl mt-10 mb-10 shadow-lg overflow-hidden 
                    hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">

      {/* Image Section */}
      <div className="h-40 overflow-hidden">
        <img
          src={props.image}
          alt="Course"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content Section */}
      <div className="p-6 text-center flex flex-col justify-between h-70">
        <div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
            {props.title}
          </h2>

          <h3 className="text-sm text-gray-500 mb-3">
            {props.courseId}
          </h3>

          <h3 className="text-sm text-gray-500 mb-3">
            👨‍🏫 {props.instructor}
          </h3>

          <p className="text-gray-600 text-sm">
            {props.description}
          </p>
        </div>

        {/* Button */}
        <Link to="/quizs" className="mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300">
          View Course
        </Link>
      </div>
    </div>
  );
}


