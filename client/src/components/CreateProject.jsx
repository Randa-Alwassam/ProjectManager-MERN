import { useState } from "react";
import axios from "axios";
import Form from "./Form";
import { useHistory } from "react-router-dom";
import "./style.module.css"

const CreateProject = () => {
    let history = useHistory();

    const [project, setProject] = useState({
        title: "",
        due: "",
        state: "Start Project"
    }
    );


    const [errors, setErrors] = useState([]);

    function handleChange(event) {
        setProject({ ...project, [event.target.name]: event.target.value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        setErrors([]);

        axios
            .post("http://localhost:8000/api/projects/new", project)
            .then((res) => {
                console.log("res ------------------", res)
                history.push("/projects");

            })
            .catch((err) => {
                const data = err.response.data;
                const errorMessages = [];
                if ("errors" in data) {
                    for (let field in data.errors) {
                        const validationError = data.errors[field];
                        errorMessages.push(validationError.message);
                    }
                }
                setErrors(errorMessages);
            });
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", margin: "10px", textAlign: "center" }}>
            <h1>Project Manager</h1>
            {errors.map((errorMessage, index) => (
                <div style={{ color: "red" }} key={index}> Error: {errorMessage}</div>
            ))}

            <Form handleChange={handleChange} handleSubmit={handleSubmit} {...project} />
        </div>
    );
};

export default CreateProject;
