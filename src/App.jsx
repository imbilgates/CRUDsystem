import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import ListOfEmp from './component/ListOfEmp';
import Header from './pages/Header';
import AddEmp from './component/AddEmp';
import EditEmp from './component/EditEmp';
import { listEmployees } from './service/EmpService';

const PING_API_URL = "https://springempapi.onrender.com/"; // Lightweight ping endpoint

function App() {
  const [isWakingUp, setIsWakingUp] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(true);

  useEffect(() => {
    // Step 1: Ping the server to wake it up
    fetch(PING_API_URL)
      .then(() => {
        console.log("Server is awake!");
        // Step 2: Fetch employees after the server wakes up
        return listEmployees();
      })
      .then(() => {
        setIsWakingUp(false);
        setLoading(false);
        setShowInfo(false);
      })
      .catch((error) => {
        console.error("Error waking up server or fetching employees:", error);
        setIsWakingUp(false);
        setLoading(false);
        setShowInfo(false); // Hide message even on error
      });
  }, []);

  return (
    <>
      <Header />
      {showInfo && (
        <div style={{ marginBottom: '1em', color: 'gray', textAlign: 'center' }}>
          ⚠️ The API is hosted on a free backend service. <br />
          It may take a few seconds for the first load due to server cold start. Thank you for your patience!
        </div>
      )}
      {isWakingUp && (
        <div style={{ textAlign: 'center', color: 'gray' }}>
          ⚡ Waking up the server... Please wait.
        </div>
      )}
      {!isWakingUp && (
        <Routes>
          <Route path='/CRUDsystem' element={<ListOfEmp loading={loading} />} />
          <Route path='/CRUDsystem/add-employee' element={<AddEmp />} />
          <Route path='/CRUDsystem/edit-employee/:id' element={<EditEmp />} />
        </Routes>
      )}
    </>
  );
}

export default App;
