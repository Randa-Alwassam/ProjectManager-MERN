const ProjectController = require("../controllers/project.controller")

function projectRoutes(app) {
    app.get("/api/projects", ProjectController.getAllProjects)
    app.post("/api/projects/new", ProjectController.createNewProject)
    app.get("/api/projects/:projectId", ProjectController.getProject)
    app.put("/api/projects/edit/:projectId", ProjectController.changeState)
    app.delete("/api/projects/delete/:projectId", ProjectController.deleteProjectById)
}

module.exports = projectRoutes