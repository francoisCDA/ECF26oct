import express from "express"
import { ProjectDAO } from "./dao/ProjectDAO.js";
import cors from "cors"
 

const projectDao = new ProjectDAO();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/projects', (req,res) => {
    res.json(projectDao.getAllProjects())
})

app.post('/projects', (req,res) => {
    res.json(projectDao.createProject(req.body))
})

app.get('/projects/:idProject', (req,res) => {
    res.json(projectDao.getProjectByID(req.params.idProject))
})


app.delete('/projects/:idProject', (req,res) => {

    if (projectDao.rmProject(req.params.idProject)) {
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }

})


app.put('/projects/:idProject', (req,res) => {
    res.json(projectDao.updProject(req.body))
})


app.listen(3030, () => {
    projectDao.initProjects();
    console.log('http://127.0.0.1:3030');
}) 