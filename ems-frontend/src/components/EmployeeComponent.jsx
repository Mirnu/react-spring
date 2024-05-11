import { useEffect, useState } from "react"
import { createEmployee, getEmployeeById, updateEmployee } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

export function EmployeeComponent() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");

    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            getEmployeeById(id)
            .then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            })
            .catch((error) => console.log(error))
        }
    }, [id])

    const handleFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const handleLastName = (e) => {
        setLastName(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const checkOnMissingField = () => {
        let result = true;
        if (firstName.length < 2) {
            setFirstNameError("First Name must be at least 3 characters long");
            result = false;
        }
        else {
            setFirstNameError("");
        }
        if (lastName.length < 2) {
            setLastNameError("Last Name must be at least 3 characters long");
            result = false;
        }
        else {
            setLastNameError("");
        }
        if (email.length < 6) {
            setEmailError("Email must be at least 6 characters long");
            result = false;
        }
        else {
            setEmailError("");
        }
        return result;
    }

    const saveEmployee = (e) => {
        e.preventDefault();
        if (!checkOnMissingField()) {
            return;
        }
        if (id) {
            const employee = {firstName, lastName, email};
            updateEmployee(id, employee)
            .then(() => {
                navigate("/employees");
            })
            .catch((error) => console.log(error));
        }
        else {
            const employee = {firstName, lastName, email};
            createEmployee(employee).then(() => {
                navigate("/employees");
            }).catch((error) => console.log(error));
        }
    }

    function pageTitle() {
        if (id) {
            return <h2 className="text-center">Update Employee</h2>;
        }
        else {
            return <h2 className="text-center">Add Employee</h2>
        }
    }

    return (
        <div className="container">
            <br/> <br/>
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {pageTitle()}
                    <div className="card-body">
                        <form action="">
                            <div className="form-group mb-2">
                                <label className="form-label">First Name:</label>
                                <input type="text" className="form-control" 
                                value={firstName} 
                                onChange={handleFirstName} 
                                placeholder="Enter First Name"/>
                                <label className="text-danger">{firstNameError}</label>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Last Name:</label>
                                <input type="text" className="form-control" 
                                value={lastName} 
                                onChange={handleLastName} 
                                placeholder="Enter Last Name"/>
                                <label className="text-danger">{lastNameError}</label>
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Email:</label>
                                <input type="text" className="form-control" 
                                value={email} 
                                onChange={handleEmail} 
                                placeholder="Enter Email"/>
                                <label className="text-danger">{emailError}</label>
                            </div>

                            <button className="btn btn-success"
                            onClick={saveEmployee}>
                                Sumbit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}