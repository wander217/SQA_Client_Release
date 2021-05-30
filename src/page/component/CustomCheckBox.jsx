import { 
    Checkbox, FormControl, FormControlLabel, 
    FormHelperText, makeStyles, FormLabel
} from "@material-ui/core";

const useStyles = makeStyles(theme=>({
    root:{
        width:"100%",
        padding: theme.spacing(1)
    }
}))

export default function CustomCheckBox(props){
    const {
        label,title,name,required=false
        ,onChange,initialValue,error,...other
    }=props;

    //Xử lý khi nhập
    const handleChange = event=>{
        const {checked} = event.target;
        onChange({
            target:{
                name,
                value:checked
            }
        });
    }
    //Css
    const classes = useStyles();

    return(
        <FormControl 
            error={error} required={required} 
            component={"div"}  className={classes.root}
        >
            <FormLabel component="legend">{title}</FormLabel>
            <FormControlLabel
                label={label}
                control={
                    <Checkbox 
                        color={"primary"}
                        checked={initialValue}
                        onChange={handleChange}
                        {...other}
                    />
                }
            />
            <FormHelperText error>{error}</FormHelperText>
        </FormControl>
    );
}