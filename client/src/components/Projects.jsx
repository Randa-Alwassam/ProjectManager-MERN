import React, { useState, } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import css from "./style.module.css"
function Projects(props) {

    const history = useHistory()
    const [flag, setFlag] = useState(false);
    const [Backlog, setBacklog] = useState([]);
    const [InProgress, setInProgress] = useState([]);
    const [Completed, setCompleted] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    const updateProject = (id, newState) => {
        console.log("id = ", id)
        axios.put("http://localhost:8000/api/projects/edit/" + id, { state: newState })
            .then(res => {
                setFlag(!flag)
                console.log(res)
                history.push("/projects")
            })
            .catch(err => {
                console.log(err)
            });
    }

    function dueDate(toDue) {
        let today = new Date();
        let pDate = new Date(toDue);
        let tMonth = today.getMonth() + 1
        let pMonth = pDate.getMonth() + 1
        let date = [pDate.getDate() + "/" + pMonth + "/" + pDate.getFullYear(), "black"]
        console.log("today ----------------" + pDate)
        if (today.getFullYear() > pDate.getFullYear()) {
            date[1] = "red"
        }
        if (today.getFullYear() >= pDate.getFullYear()) {
            if (tMonth >= pMonth + 1) {
                date[1] = "red"
            }
        }
        if (today.getFullYear() >= pDate.getFullYear()) {
            if (tMonth >= pMonth) {
                if (today.getDate() > pDate.getDate()) {
                    date[1] = "red"
                }
            }
        }
        return date;
    }

    React.useEffect(() => {
        axios.get("http://localhost:8000/api/projects").then((response) => {

            const projects = response.data.records
            setBacklog(projects.filter(p => p.state === "Start Project"))
            setInProgress(projects.filter(p => p.state === "Move to Completed"))
            setCompleted(projects.filter(p => p.state === "Remove Project"))
            setLoaded(true);

        });
    }, [flag]);


    function projectDelete(projectId) {
        console.log("id = ", projectId)
        axios.delete("http://localhost:8000/api/projects/delete/" + projectId)
            .then(res => {
                console.log(res)
                setFlag(!flag)
            })
            .catch(err => console.log(err))
    }

    return (
        <div style={{ maxWidth: "900px", margin: "auto" }}>
            {!isLoaded ? (
                <div>Loading...</div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", margin: "10px", textAlign: "center" }}>
                    <h1> Project Manager</h1>
                    <div style={{ display: "flex", justifyContent: "space-evenly", textAlign: "center" }}>
                        <div className={css.box} >
                            <h4 style={{ backgroundColor: "#abd5ff", height: "35px" }}>Backlog</h4>
                            {Backlog.map((project) => (
                                <div style={{ border: "solid", margin: "10px", marginBottom: "10px" }} key={project._id}>
                                    <h4>{project.title}</h4>
                                    <p>Due: <span style={{ color: dueDate(project.due)[1] }}>{dueDate(project.due)[0]} </span></p>
                                    <button style={{ backgroundColor: "#feffab", marginBottom: "10px" }} onClick={p => updateProject(project._id, "Move to Completed")}> {project.state} ➤ </button>
                                </div>
                            ))}
                        </div>
                        <div className={css.box} >
                            <h4 style={{ backgroundColor: "#feffab", height: "35px" }}> In Progress </h4>
                            {InProgress.map((project) => (
                                <div style={{ border: "solid", margin: "10px", marginBottom: "10px" }} key={project._id}>
                                    <h4>{project.title}</h4>

                                    <p>Due: <span style={{ color: dueDate(project.due)[1] }}>{dueDate(project.due)[0]} </span></p>
                                    <button style={{ backgroundColor: "#abffb0", marginBottom: "10px" }} onClick={p => updateProject(project._id, "Remove Project")}> {project.state} ➤ </button>
                                </div>
                            ))}
                        </div>
                        <div className={css.box} style={{ border: "solid", width: "300px", margin: "10px" }}>
                            <h4 style={{ backgroundColor: "#abffb0", height: "35px" }}>Completed</h4>
                            {Completed.map((project) => (
                                <div style={{ border: "solid", margin: "10px", marginBottom: "10px" }} key={project._id}>
                                    <h4>{project.title}</h4>
                                    <p>Due: <span style={{ color: dueDate(project.due)[1] }}>{dueDate(project.due)[0]} </span></p>
                                    <button style={{ backgroundColor: "#ffa39e", marginBottom: "10px" }} onClick={p => projectDelete(project._id,)}> {project.state} ➤ </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Link to='/projects/new'><button style={{ backgroundColor: "#abd5ff" }}> ⊕ Add New Project</button></Link>

                </div>
            )}
        </div>
    );
}

export default Projects;
