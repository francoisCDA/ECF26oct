import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const PORT = process.env.PORT_API || 3030 ;
const IP = process.env.IP_API || "127.0.0.1";

const URL_TrackerProAPI = `http://${IP}:${PORT}/projects`;


export const axiosGetAllProjects = createAsyncThunk(
    "trackerpro/axiosGetAllProjects",
    async () => {
        try {
            const reponse = await axios.get(`${URL_TrackerProAPI}`);
            return reponse.data
        } catch (error) {
            console.error(error.message);
        }
    }
)

export const axiosPostProject = createAsyncThunk(
    "trackerpro/axiosPostProject",
    async (newProject) => {
        try {
            const reponse = await axios.post(`${URL_TrackerProAPI}`,newProject)
            return reponse.data;
        } catch (error) {
            console.error(error.message);
        }
    }
)

export const axiosDelProject = createAsyncThunk(
    "trackerpro/axiosDelProject",
    async (id) => {
        try {
            const reponse = await axios.delete(`${URL_TrackerProAPI}/${id}`)
            return id ;
        } catch (error) {
            console.error(error.message);
        }
    }
)

export const axiosGetProjectById = createAsyncThunk(
    "trackerpro/axiosGetProjectById",
    async (id) => {
        try {
            const reponse = await axios.get(`${URL_TrackerProAPI}/${id}`)
            return reponse.data ;
        } catch (error) {
            console.error(error.message);
        }
    }
)

export const axiosUpdProject = createAsyncThunk(
    "trackerpro.axiosUpdProject",
    async ({id,project}) => {
        try {
            const reponse = await axios.put(`${URL_TrackerProAPI}/${id}`,project)
            return reponse.data ;
        } catch (error) {
            console.error(error.message);
        }
    }
)


const trackerSlice = createSlice({
    name:"trackerpro",
    initialState: {
        projects:[],
        projectSelected: false,
        formMode: '',
        filtreMode: [false,"Non débuté", "En cours", "En attente", "Terminé"]
    },
    reducers:{
        selectProject: (state, action) => {
            state.projectSelected = action.payload ;
        },
        setFormMode: (state,action) => {
            state.formMode = action.payload ;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(axiosGetAllProjects.fulfilled, (state, action) => {
            state.projects = action.payload;
            
        })
        builder.addCase(axiosPostProject.fulfilled, (state, action) => {
            state.projects.push(action.payload);
        })
        builder.addCase(axiosDelProject.fulfilled, (state,action) => {
            state.projects = state.projects.filter( pr => pr.id != action.payload);
        })
        builder.addCase(axiosUpdProject.fulfilled, (state, action) => {
            const idx = state.projects.findIndex( pr => pr.id == action.payload.id);
            state.projects[idx] = action.payload ;
        })
    }
})

export const { selectProject, setFormMode } = trackerSlice.actions
export default trackerSlice.reducer