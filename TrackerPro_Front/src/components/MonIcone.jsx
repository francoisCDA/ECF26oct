import DateRangeIcon from '@mui/icons-material/DateRange';
import EventIcon from '@mui/icons-material/Event';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';

const MonIcone = ({statut, cbColor}) => {

    // le setimeout est là pour sortir le rendu du parent du flux, apparemment ça ne lui plaisait pas de faire le re-rendu du parent en même temps que de renvoyer l'icône
    setTimeout ( () => {
        switch (statut) {
            case 'Non débuté' :
                cbColor('rgb(151, 190, 12)')
                break;
            case 'En cours' :
                cbColor('rgb(38, 151, 220)')
                break;
            case 'En attente' :
                cbColor('rgb(189, 38, 220)')
                break;
            case 'Terminé' : 
                cbColor('rgb(51, 220, 38)')
                break;
            default :
                cbColor('rgb(230, 198, 114)')
        }
    },0)

    
    switch (statut) {
        case 'Non débuté' :
            
            return <CalendarTodayIcon />
        case 'En cours' :
            
            return <DateRangeIcon />
        case 'En attente' :
            
            return <EventRepeatIcon />
        case 'Terminé' : 
            
            return <EventAvailableIcon />
        default :
            
            return <EventIcon />
    }


    
}
 
export default MonIcone;