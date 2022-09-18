import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import css from "./style.module.css"


const Form = (props) => {
    const { title, due, handleChange, handleSubmit } = props;
    return (
        <>
            <Link style={{ marginLeft: "500px" }} to='/'>Back to Dashboard</Link>

            <div className={css.form} >
                <h3 className={css.formTitle}>Plan a New Project</h3>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <div style={{ display: "flex", justifyContent: "space-evenly" }}>

                                <label>Project Title: </label>

                                <input style={{ width: "300px" }} name="title" value={title} onChange={handleChange} />

                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                                <label>Due Date:</label>

                                <input style={{ width: "300px" }} name="due" value={due} type="date" onChange={handleChange} />

                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <button style={{ backgroundColor: "#abd5ff", width: "500px", marginBottom: "10px" }} type="submit">Plan Project</button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </>
    );
};

export default Form;
