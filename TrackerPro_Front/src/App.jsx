

import { Button, Container, Dialog, Typography } from "@mui/material" 
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { axiosGetAllProjects, selectProject } from "./slices/TrackerSlice";
import ProjectShort from "./components/ProjectShort";
import SelectStatut from "./components/SelectFiltre";
import FormProject from "./components/FormProject";

//import './App.css'

function App() {

  const dispatch = useDispatch();
  const allProjects = useSelector(state => state.trackerpro.projects)
  const filtreMode = useSelector(state => state.trackerpro.filtreMode)
  const selectedProject = useSelector( state => state.trackerpro.projectSelected)

  const [filtreActif, setFiltreActif] = useState(0);

  useEffect( () => {
    dispatch(axiosGetAllProjects());
  },[])


  return (
    <>
      <Container sx={{mt:'1.5rem', p:'1.5em', borderRadius: '20px', backgroundColor:"#F5F9E5", height:"100vh"}}>
        <header>
          <Typography variant="h1" sx={{textAlign:'center'}}>Project Tracker Pro</Typography>
        </header>
        <Container sx={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}>

       
          {
            selectedProject ?

            <FormProject projet={selectedProject} />
            :
            <>
              <SelectStatut label={'Filtre'} etat={filtreActif} callback={(val) => setFiltreActif(val)} CSS={{fontWeight:'bold', mb:"2em", textAlign:'center', boxShadow: 3}} ></SelectStatut>
              <Container><Button variant='contained' color='success' sx={{width:'100%', mb:"1em" }} onClick={()=>dispatch(selectProject(true))}>Ajouter un projet</Button></Container> 
              {allProjects.map( (pro,i) => <ProjectShort key={i} projects={pro} filtre={filtreMode[filtreActif]} /> )}
            </>
            
          }
                

        </Container>
      
      </Container>
    </>
  )
}

export default App
