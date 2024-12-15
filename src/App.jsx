import ListOfEmp from './component/ListOfEmp';
import Header from './pages/Header';
import { Route, Routes } from 'react-router-dom';
import AddEmp from './component/AddEmp';
import EditEmp from './component/EditEmp';

function App() {
  
  return (
    <>
      <Header />
      <Routes>
        <Route path='/CRUDsystem' element={<ListOfEmp />}></Route>
        <Route path='CRUDsystem/add-employee' element={<AddEmp />}></Route>
        <Route path='CRUDsystem/edit-employee/:id' element={<EditEmp />}></Route>
      </Routes>
    </>
  )
}

export default App
