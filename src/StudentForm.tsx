import { Formik} from "formik";
import { useNavigate,useParams } from "react-router-dom";

export default function StudentRegistrationForm() {
  const {id}=useParams()
  
  console.log(parseInt(id||''))
  const navigate=useNavigate()
 const data:student_data_type[]= JSON.parse(localStorage.getItem('students')||'[]')
 console.log(data)
  const editData:student_data_type|undefined=data[parseInt(id||'')]


  type student_data_type={
    name:string 
    age:string
    email:string 
    course:string
  }
  const initialvalue:student_data_type={
    name:editData?.name||'', 
    age:editData?.age||'',
    email:editData?.email||'', 
    course:editData?.course||'',
  }
  return (
    <Formik 
    initialValues={initialvalue}
    onSubmit={
      (values,{resetForm})=>{
        console.log('submit values')
        console.log(values)
        const students:student_data_type[]=JSON.parse(localStorage.getItem('students')|| '[]' ) 
        if(parseInt(id||'')){
          students[parseInt(id)]=values
        localStorage.setItem('students',JSON.stringify(students))
        resetForm()
        navigate('/')
        }
       else{
        console.log('add new student')
        students.push(values)
        localStorage.setItem('students',JSON.stringify(students))
        resetForm()
        navigate('/')
       }
      }
    }
   
    validate={
      
     (values,)=>{
      console.log(values)
      const errors:Record<string,string> = { 
      }
      if(values.name==''){
        errors.name='plese enter name'
      }
      else if(!/^[A-Za-z]+(?: [A-Za-z]+){0,2}$/.test(values.name)){
        errors.name='plese enter correct name'
      }
      else if(values.name.length>52){
        errors.name='size not should be grater then 50'
      }
      if(values.course==''){
        errors.course='plese select cource'
      }
      if( values.age==undefined || values.age==''){
          errors.age='plese enter valid age'
      }
      else if(parseInt(values.age)<=15 || parseInt(values.age)>=60){
        errors.age='age not grater then 60 and small then 15 '
      }
      if(values.email==''){
        errors.email='plese fill email'
      }
      else if(!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(values.email)){
        errors.email="plese enter valid email"
      }

      // console.log(value)
      return errors
     }  
    }
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit
      })=>(
        <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black ">
      <div className="bg-white costom-shadow rounded-lg p-8 w-full max-w-md">
       
        <form className="space-y-12" onSubmit={handleSubmit} >
          {/* Name */}
          <div>
            <label htmlFor="name" className="block font-medium ">Name</label>
            <input
            onChange={handleChange}
            onBlur={handleBlur}
             value={values.name}
              type="text"
              name="name"
              id='name'
              placeholder="Enter your name"
              className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 p-2"
            />
            {touched.name && errors.name && (<div className="text-red-500 absolute">{errors.name} </div>)}
          </div>


          {/* Age */}
          <div>
            <label htmlFor="age" className="block font-medium">Age</label>
            <input
            onChange={handleChange}
            onBlur={handleBlur}
             value={values.age}
              type="number"
              name="age"
              id='age'
              placeholder="Enter your Age"
              className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 p-2"
            />
             {touched.age && errors.age && (<div className="text-red-500 absolute">{errors.age}</div>)}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-medium">Email</label>
            <input
            onChange={handleChange}
            onBlur={handleBlur}
             value={values.email}
              type="email"
              name="email"
              id='email'
              placeholder="Enter your email"
              className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 p-2"
            />
             {touched.email && errors.email && (<div className="text-red-500 absolute">{errors.email}</div>)}
          </div>

          {/* Course */}
          <div>
            <label htmlFor="course" className="block font-medium">Course</label>
            <select className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 p-2" name="course"
              id='course'
              value={values.course}
              onChange={handleChange}
              onBlur={handleBlur}
              >
              <option value="">Select a course</option>
              <option value="React">React</option>
              <option value="JavaScript">JavaScript</option>
              <option value="TypeScript">TypeScript</option>
              <option value="CSS">CSS</option>
            </select>
            {touched.course && errors.course &&(<div className="text-red-500 absolute">{errors.course}</div>)}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
          <button type="button" 
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          onClick={()=>{
           navigate('/')
          }}>
            cancel
          </button>
        </form>
      </div>
    </div>
      )}
    </Formik>
  );
}
