import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import CustomAppBar from "../component/CustomAppBar";
import CustomSideBar from '../component/CustomSideBar';
import { useHistory } from 'react-router';
import Registration from "./registration/Registration";
import {LoginApi} from "../../api/LoginApi";
import { useDispatch } from 'react-redux';
import {setUpRole} from "../../app/slice/SideBarSlice";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function TeacherHome() {
    //Tự động chuyển hướng
    const history = useHistory();
    //Lấy dispatch để thực hiện hàm của slice
    const dispatch = useDispatch();
    useEffect(() => {
        LoginApi.autoLogin().then(resp=>{
            if(resp!=="teacher"){
                history.push("/login");
                return;
            }
            dispatch(setUpRole("TEACHER"));
            const id = LoginApi.getSessionAccount().id;
            history.push("/teacher?id="+id);
        })
    }, [history,dispatch]);
    //CSS
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <CustomAppBar/>
            <CustomSideBar/>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Registration/>
            </main>
        </div>
    );
}
