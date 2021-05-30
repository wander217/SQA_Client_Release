import { makeStyles, Snackbar } from "@material-ui/core"
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles(theme=>({
    root:{
        top:theme.spacing(9)
    }
}))

export default function CustomNotification(props){
    const {notify,onNotify} = props;
    //CSS
    const classes = useStyles();

    //Xử lý khi đóng
    const handleClose = (event,reason)=>{
        if(reason === "clickaway")return;
        onNotify({
            ...notify,
            open:false
        })
    }

    return (
        <Snackbar
            open={notify.open}
            autoHideDuration={3000}
            anchorOrigin={{
                vertical:"top",
                horizontal:"center"
            }}
            className={classes.root}
            onClose={handleClose}
        >
            <Alert 
                severity={notify.type}
                onClose={handleClose}
            >
                {notify.message}
            </Alert>
        </Snackbar>
    );
}