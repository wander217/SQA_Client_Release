import { IconButton, InputAdornment, makeStyles, TextField } from "@material-ui/core";
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { useState } from "react";

const useStyle = makeStyles(theme=>({
    root:{
        marginTop:theme.spacing(2)
    }
}))

export default function CustomPasswordField(props){
    const {label,name,onChange,initialValue,error=null,...other}  = props;
    //Ẩn hiện mật khẩu
    const [passwordVisible,setPasswordVisible] = useState(false);
    const handlePasswordVisible = ()=>{
        setPasswordVisible(!passwordVisible);
    }

    const classes =  useStyle();

    return(
        <TextField 
            className={classes.root}
            variant="outlined" 
            value={initialValue}
            name={name} 
            label={label} 
            onChange={onChange}
            type={passwordVisible?"text":"password"}
            InputProps={{
                endAdornment:(
                    <InputAdornment position="end">
                        <IconButton onClick={handlePasswordVisible}>
                            {passwordVisible?<VisibilityOutlinedIcon/>:<VisibilityOffOutlinedIcon/>}
                        </IconButton>
                    </InputAdornment>
                )
            }}
            {...(error&&{error:true,helperText:error})}
            {...other}
        />
    );
}