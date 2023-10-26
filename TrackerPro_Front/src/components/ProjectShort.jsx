import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { selectProject } from "../slices/TrackerSlice";
import MonIcone from "./MonIcone";
import { useState } from "react";

const ProjectShort = ({projects,filtre}) => {

    const dispatch = useDispatch() ;

    const [bgColor,setBgColor] = useState('rgb(200, 198, 114)');

    const CSS = {
        card :{
            display: `${!filtre ?  'flex' : filtre != projects.statut ? 'none' : 'flex'}`,
            flexDirection: 'column',
            maxWidth: 300,
            minWidth: 200,
            borderRadius: '15px',
            m: '0.4rem',
            p:'1rem',
            boxShadow: 3,
            backgroundColor: `${bgColor}`,
            transition: 'transform 0.3s',
            ':hover': {
                cursor:'pointer',
                transform: 'translateX(-2px) translateY(-5px)', 
                backgroundColor:'rgb(230, 198, 114)'
            },
            '& span' : {
                display: 'inline-block',
                color:'white',
                m:'1rem',
                inset:0,
            }
        }
    }

    return ( 
        <Box onClick={() => dispatch(selectProject(projects))} sx={CSS.card} >
            <Box><Typography variant="string" sx={{fontWeight:'bolder'}}>Projet : {projects.titre}</Typography></Box>
            <Box><Typography variant="string"><MonIcone statut={projects.statut} cbColor={(color)=>setBgColor(color)} /> : {projects.statut}</Typography></Box>
        </Box>
     );
}
 
export default ProjectShort;