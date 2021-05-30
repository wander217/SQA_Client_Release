import { makeStyles, TextField } from "@material-ui/core";

const useStyle = makeStyles(theme=>({
    root:{
        marginTop:theme.spacing(2)
    }
}))

export default function CustomTextField(props){
    const {
        label,name,onChange,initialValue,
        disabled=false,error=null,...other
    }  = props;

    const classes =  useStyle();

    return(
        <TextField
            className={classes.root}
            variant="outlined" 
            value={initialValue}
            name={name} 
            label={label} 
            onChange={onChange}
            disabled={disabled}
            {...(error&&{error:true,helperText:error})}
            {...other} 
        />
    );
}