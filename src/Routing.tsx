import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import StudentForm from './StudentForm'
import StudentList from './StudentList'
export default function Routing() {
  return (
    <div>
       <BrowserRouter>
       <Routes>
        <Route path='/' element={<StudentList/>} />
        <Route  path='/add/:id' element={<StudentForm/>}/>
       </Routes>
       </BrowserRouter>
    </div>
  )
}
