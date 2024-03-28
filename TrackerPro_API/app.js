import express from "express"
import { ProjectDAO } from "./dao/ProjectDAO.js";
import cors from "cors"
 

const projectDao = new ProjectDAO();
const PORT = process.env.PORT || 3030;
const ORIGIN_REQUEST = process.env.ORIGIN_REQUEST || "http://trackerp-front"

const app = express();


const corsOption ={
    origin : `${ORIGIN_REQUEST}`,
    optionsSuccessStatus: 200
}


app.use(cors(corsOption));
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


app.listen(PORT, () => {
    projectDao.initProjects();
    console.log(`http://127.0.0.1:${PORT}`);
}) 