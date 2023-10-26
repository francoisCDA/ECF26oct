import { Button, Container, TextField, Box } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosDelProject, axiosPostProject, axiosUpdProject, selectProject } from "../slices/TrackerSlice";
import SelectStatut from "./SelectFiltre";


const FormProject = ({projet}) => {

    const dispatch = useDispatch() ;
    const statuts = useSelector( state => state.trackerpro.filtreMode)

    const [etat,setEtat] = useState(projet.statut ? statuts.indexOf(projet.statut) : 0) ;

    const refTitre = useRef();
    const refDesc = useRef();

    const refdate = useRef();

    const CSS = {
        input : {
            mt: '0.5em',
        }
    }
        
    const sendProject = () => {

        const monProject = {}

        if (refTitre.current.value) {
            monProject.titre = refTitre.current.value ;
        } else {
            return
        }

        if (refDesc.current.value) {
            monProject.description = refDesc.current.value ;
        } else {
            return
        }

        if (etat != 0) {
            monProject.statut = statuts[etat];
        } else {
            return
        }
        
        if (refdate.current.value) {
            monProject.dateFin = refdate.current.value
        }
          
       

        if (projet.id) {
            monProject.id = projet.id ;
            dispatch(axiosUpdProject({id:projet.id, project: monProject}))
        } else {
            dispatch(axiosPostProject(monProject))
        }

        dispatch(selectProject(false));
    }

    const rmProject = () => {
        dispatch(axiosDelProject(projet.id))
        dispatch(selectProject(false));
    }

    return (
        <Container>
            <form action="#">
                <TextField sx={CSS.input} label="Titre" fullWidth inputRef={refTitre} defaultValue={ projet.titre ?? ''}/>
                <TextField sx={CSS.input} multiline rows={4} label="Description" fullWidth inputRef={refDesc} defaultValue={ projet.description ?? ''}/>
                <SelectStatut label="Etat" etat={etat} callback={(et) => setEtat(et)} CSS={CSS.input} />
                
                <TextField sx={CSS.input} type="date" fullWidth inputRef={refdate} defaultValue={projet.dateFin} />
                <Container sx={{mt:'1rem', display:"flex", justifyContent:'space-around'}}>
                    <Button variant='contained' color='info' onClick={() => dispatch(selectProject(false))}>Annuler</Button>    
                    <Button variant='contained' color='success' onClick={sendProject} >{!projet.id ? 'Envoyer' : 'Mettre à jour'}</Button>
                    { projet.titre && <Button variant='contained' color='warning' onClick={rmProject}>Supprimer</Button>     }
                </Container>                


            </form>
        </Container> 

     );
}
 
export default FormProject;