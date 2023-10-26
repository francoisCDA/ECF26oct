import { v4 as uuidv4 } from "uuid"

export class Project {
    constructor(titre, description,statut, dateFin = 'non déterminée') {
        this.id = uuidv4();
        this.titre = titre ;
        this.description = description ;
        this.statut = statut ;
        this.dateFin = dateFin ;
    }
}