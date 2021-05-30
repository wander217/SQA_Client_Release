import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: theme.palette.text.secondary,
    }
  }));

export default function CustomBackDrop(props){
    const {open,color="inherit",...other} = props;

    const classes = useStyles();

    return(
        <Backdrop open={open} className={classes.backdrop} {...other}>
            <CircularProgress color={color}/>
        </Backdrop>
    )
}