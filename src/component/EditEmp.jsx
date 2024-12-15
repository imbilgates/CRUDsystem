import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { employeeGetById, updateEmployees } from '../service/EmpService';

const EditEmp = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            employeeGetById(id).then((responce) => {
                setFormData(responce.data)
                console.log(responce.data)
            }).catch((err) => {
                console.log(err);
            });

        } else {
            navigate("/CRUDsystem")
        }
    }, [])

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        updateEmployees(id, formData).then((responce) => {
            console.log(responce.data);
            navigate('/CRUDsystem')
        }).catch((err) => {
            console.log(err.message);
        });
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Edit Employee</h2>
            <form onSubmit={handleSubmit}>
                {/* First Name Field */}
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                        First Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        required
                    />
                </div>

                {/* Last Name Field */}
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                        Last Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        required
                    />
                </div>

                {/* Email Field */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary">
                    Update Employee
                </button>
            </form>
        </div>
    );
};

export default EditEmp;
