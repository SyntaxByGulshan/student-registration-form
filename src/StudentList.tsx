import { useEffect, useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom'
  type student_data_type={
    name?:string 
    age?:number|undefined
    email?:string 
    course?:string
  }
function StudentList() {
  const [studentData,setStudentData]=useState<student_data_type[]>([])
  const [filterCourse,setFilterCourse]=useState<student_data_type[]>([])
  const [course,setCourse]=useState<string>()
  const navigate=useNavigate()
  useEffect(()=>{
     if(!studentData.length){
      const students:student_data_type[]=JSON.parse(localStorage.getItem('students')||'[]')
     console.log(students)
     setStudentData(students)
     setFilterCourse(students)
     }
     else{
      function chng(){
      const filterData:student_data_type[]=studentData.filter((data)=>data.course==course)
     console.log(course)
     console.log(filterData)
     setFilterCourse(filterData)
     }
     course?chng():(setFilterCourse(studentData))
     }
     
  },[course])


  function changeCourse(e:React.ChangeEvent<HTMLSelectElement>){
     console.log(e.target.value)
     setCourse(e.target.value)
  }
  return (
    <>
      <div className='w-screen  text-sm'>
        <header className='my-1 mx-10 bg-gray-300 '>
       <div className=' p-2 flex justify-between items-center'>
         <div>
          student list
        </div>
        <div className='space-x-2'>
          <button className='bg-blue-700 text-white py-1 px-2 rounded-md' onClick={()=>{
          navigate(`/add/${undefined}`)
          }}>Add</button>
          <select name="course" value={course} onChange={(e)=>{
            
           changeCourse(e)
          }}  className='rounded-md py-1 px-2  bg-white'>
            <option value="">All</option>
            <option value="React">React</option>
            <option value="JavaScript">JavaScript</option>
            <option value="TypeScript">TypeScript</option>
            <option value="CSS">css</option>
          </select>
        </div>
       </div>
      </header>
     <main className=' mx-10 p-2'>
      <div>
      <table className='w-full'>
      <thead className='font-bold'>
        <tr>
        <th className='text-left w-auto '>name</th>
        <th className='text-left w-24'>age</th>
        <th className='text-left  w-auto'>email</th>
        <th className='text-left w-24'>course</th>
        <th className='text-left w-30'>action</th>
        </tr>
      </thead>
     {filterCourse.map((value,index)=>{
        return <tbody key={index} className='even:bg-gray-100 odd:bg-white'>
         <tr className='h-14'>
           <td>
            {value.name}
          </td>
          <td>
            {value.age}
          </td>
          <td>
            {value.email}
          </td>
          <td>
            {value.course}
          </td>
          <td className='space-x-1'>
            <button className='bg-green-700 rounded-sm p-1 w-12 text-white'  onClick={()=>{
              navigate(`/add/${index}`)
            }}>Edit</button>
            <button className='bg-red-700 rounded-sm p-1 text-white w-12' onClick={()=>{
              const newData=studentData.filter((_,ind)=>ind!==index)
              setStudentData(newData)
              setFilterCourse(newData)
              localStorage.setItem('students',JSON.stringify(newData))
            }} >Delete</button>
          </td>
         </tr>
        </tbody>
     })}
     </table>
     </div>
     </main>
      </div>
     
    </>
  )
}

export default StudentList
