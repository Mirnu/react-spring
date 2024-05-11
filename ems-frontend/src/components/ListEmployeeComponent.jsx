import { useEffect, useState } from "react";
import { deleteEmployee, listEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

export function ListEmployeeComponent() {
    const [employees, setEmployees] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, [])

    const getAllEmployees = () => {
        listEmployees().
            then((repsonse) => setEmployees(repsonse.data))
            .catch((error) => console.log(error))
    }

    const addNewEmployeeHandler = () => {
        navigator("/add-employee");
    }

    const updateEmployeeHandler = (employeeId) => {
        navigator("/update-employee/" + employeeId);
    }

    const deleteEmployeeHandler = (employeeId) => {
        deleteEmployee(employeeId)
        .then(() => {
            getAllEmployees();
        })
        .catch((error) => console.log(error))
    }

    return (
        <div className="container">
            <h2 className="text-center">Employee List</h2>
            <button type="button" className="btn btn-primary mb-2"
            onClick={addNewEmployeeHandler}> Add Employee</button>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => 
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className="btn btn-info" onClick={
                                    () => updateEmployeeHandler(employee.id)
                                }>Update</button>
                                <button className="btn btn-danger" onClick={
                                    () => deleteEmployeeHandler(employee.id)
                                }>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
