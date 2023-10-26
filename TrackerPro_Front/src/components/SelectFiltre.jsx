import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useSelector } from "react-redux";

const SelectStatut = ({label, etat, callback, CSS}) => {

    const filtres = useSelector(state => state.trackerpro.filtreMode)



    return ( 
        
            <FormControl fullWidth sx={CSS}>
                <InputLabel id="statut">{label}</InputLabel>
                <Select
                    labelId="statut"
                    id="statut"
                    value={etat}
                    label="statut"
                    onChange={(e) => callback(e.target.value)}
                    
                >
                    { filtres.map( (fi,i) => <MenuItem key={i} value={i}>{fi ? fi : label == "Etat" ? "Définir un statut" : "pas de filtre"}</MenuItem> )}
                </Select>
            </FormControl>


     );
}
 
export default SelectStatut;