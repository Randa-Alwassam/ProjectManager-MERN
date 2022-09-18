const Project = require("../models/project.model");

function getAllProjects(req, res) {
  Project.find()
    .then((allProjects) =>
      res.json({
        success: true,
        records_count: allProjects.length,
        records: allProjects,
      })
    )
    .catch((err) => res.json({ errorMsg: "Failed to fetch all projects", error: err }));
}

function createNewProject(req, res) {

  Project.create(req.body)
    .then((newProject) => res.json(newProject))
    .catch((err) => res.status(400).json(err));
}

function changeState(req, res) {
  Project.findByIdAndUpdate({ _id: req.params.projectId }, req.body)
    .then(ProjectUpdate => res.json(ProjectUpdate))
    .catch(err => res.json({ message: "Failed to update project", error: err }))

}

function getProject(req, res) {
  Project.findById({ _id: req.params.projectId })
    .then((project) => res.json(project))
    .catch((err) => res.json({ error: "Failed to fetch the project", error: err }));
}

function deleteProjectById(req, res) {
  Project.deleteOne({ _id: req.params.projectId })
    .then((result) => res.json(result))
    .catch((err) =>
      res.json({ error: true, message: "Failed to delete project", error: err })
    );
}


module.exports = {
  getAllProjects,
  createNewProject,
  getProject,
  deleteProjectById,
  changeState
};
