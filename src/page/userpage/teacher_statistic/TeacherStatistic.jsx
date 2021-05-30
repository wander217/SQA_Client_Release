import { Grid, makeStyles } from "@material-ui/core";
import HistoryTable from "./HistoryTable";
import TeacherList from "./TeacherList";

const useStyle = makeStyles(theme=>({
    left:{
        order:1,
        [theme.breakpoints.down("md")]:{
            order:2
        }
    },
    right:{
        order:2,
        [theme.breakpoints.down("md")]:{
            order:1
        }
    }
}))

export default function TeacherStatistic(){
    //CSS
    const classes = useStyle();

    return (
        <Grid container spacing={4} justify="center">
            <Grid item xs={12} sm={12} md={12} lg={8} className={classes.left}>
                <HistoryTable/>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={4} className={classes.right}>
                <TeacherList/>
            </Grid>
        </Grid>
    )
}