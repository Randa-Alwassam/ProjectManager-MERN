const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator');


const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, "Project already exist"],
        required: [true, "Project title is required"],
        minLength: [3, "Project title should be at least 3 Characters"]
    },
    due: {
        type: Date,
        required: [true, "Project date is required"],
    },
    state: {
        type: String,
    }
}, { timestamps: true }
)

ProjectSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Project", ProjectSchema);
