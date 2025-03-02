import { useEffect, useState } from 'react';
import { deleteById, listEmployees } from '../service/EmpService';
import { useNavigate } from 'react-router-dom';

import Website from '../assets/gif/Website.gif';

const ListOfEmp = () => {
  const [employees, setEmployees] = useState([]);
  const [serverOffline, setServerOffline] = useState(null); // Track server status
  const navigate = useNavigate();

  // Fetch employees when the component mounts
  useEffect(() => {
    listEmployees()
      .then((res) => {
        setEmployees(res.data);
        setServerOffline(false); // Server is online
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
        setServerOffline(true); // Server is offline
      });
  }, []);

  const handleAddEmployeeClick = () => {
    navigate('add-employee');
  };

  const updateEmployee = (id) => {
    navigate(`edit-employee/${id}`);
  };

  const deleteEmployee = (id) => {
    deleteById(id)
      .then(() => {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.id !== id)
        );
      })
      .catch((error) => {
        console.error('Error deleting employee:', error);
      });
  };

  if (serverOffline === null) return;

  return (
    <div className="container mt-5">
      {/* Server Offline Message */}
      {serverOffline ? (
        <div className='container'>
          <div className="alert alert-danger" role="alert">
            Server is offline. Please try again later.
          </div>
          <img src={Website} alt="Cool GIF" className='d-block mx-auto' style={{width: '50%', height: '50%'}}/>
        </div>
      ) : (
        <>
          <button
            className="btn btn-primary mb-2"
            onClick={handleAddEmployeeClick}
          >
            Add Employee
          </button>
          <table className="table table-hover table-dark table-bordered border-primary">
            <thead>
              <tr>
                <th scope="col">Employee ID</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <th scope="row">{employee.id}</th>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => updateEmployee(employee.id)}
                    >
                      Update
                    </button>{' '}
                    &nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteEmployee(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ListOfEmp;
