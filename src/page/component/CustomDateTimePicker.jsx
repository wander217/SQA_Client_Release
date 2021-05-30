import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core";
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

const useStyles= makeStyles(theme=>({
    root:{
        marginTop:theme.spacing(2),
        marginBottom:theme.spacing(2)
    }
}))

export default function CustomDateTimePicker(props){
    const {
        name,label,initialValue,onChange,
        disabled=false,error=null,...other
    } = props;

    const handleChange = date=>{
        onChange({
            target:{
                name:name,
                value:date
            }
        });
    }

    const classes = useStyles();
    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
                className={classes.root}
                variant="dialog" label={label}
                format={"hh:mm:ss dd/MM/yyyy"} autoFocus
                ampm={false} name={name} inputVariant="outlined"
                value={initialValue} onChange={handleChange}
                disabled={disabled} fullWidth 
                {...(error&&{error:true,helperText:error})} 
                {...other}
            />
        </MuiPickersUtilsProvider>
    );
}