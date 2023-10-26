import { readFileSync, writeFileSync } from "fs";
import { Project } from "../classes/Project.js";
import { resolve } from "path";

export class ProjectDAO {
    constructor() {
        this.database = resolve("./DB_TRACKER_PRO/tracker-pro.json");
        this.projects = [];
    }

    initProjects() {
        const DBProjects = readFileSync(this.database, {encoding: "utf-8"})
        this.projects = JSON.parse(DBProjects);
    }

    saveDB() {
        writeFileSync(this.database, JSON.stringify(this.projects))
    }

    getAllProjects() {
        return this.projects;
    }

    createProject({titre, description, statut, dateFin }) {
        const newProject = new Project(titre,description,statut,dateFin);
        this.projects.push(newProject);
        this.saveDB();
        return newProject;
    }

    updProject(proj) {
        const indx = this.projects.findIndex( pr => pr.id == proj.id ) ;
        this.projects[indx] = proj ;
        this.saveDB() ;
        return proj ;
    }

    rmProject(id) {
        this.projects = this.projects.filter( pr => pr.id != id ) ;
        this.saveDB() ;       
        return true ;
    }

    getProjectByID(id) {
        const projectCible = this.projects.find( pr => pr.id == id) ;
        return projectCible ;
    }

}
