import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Link} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from "@material-ui/core/Paper";
import CustomTextField from "../component/CustomTextField";
import {CustomForm,useForm} from "../component/CustomForm";
import {ForgotApi} from "../../api/ForgotApi";
import CustomBackDrop from '../component/CustomBackDrop';
import CustomNotification from '../component/CustomNotification';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © Nhóm 18-SQA '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding:theme.spacing(3)
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    link:{
        width:"100%",
        textAlign:"center",
        textDecoration:"none"
    }
}));

const initialData={
    username:""
}

const validateData=[
    {
        name:"username",
        testFunction:item=>(/^[0-9A-Za-z@\.\-_\/]+$/).test(item),
        errorMessage: "Tên đăng nhập chỉ được bao gồm chữ,số hoặc các kí tự như @.-/_ và không được để trống"
    }
]

export default function Login() {
    //Lấy các hàm cần thiết cho form
    const{
        data, error,
        validate, handleInputChange
    } =  useForm(initialData,validateData);

    //Thông báo  
    const [notify,setNotify] = useState({ open:false, message:"", type:""});
    //mở chế độ chờ
    const [openBackDrop,setOpenBackDrop] = useState(false);

    //Mở thông báo
    function openMessage(data){
        setOpenBackDrop(false);
        setNotify({
            open:true,
            message:data.message,
            type:data.state
        })
    }

    //Bắt sự kiện người dùng gửi lên
    const handleSubmit = e=>{
        e.preventDefault();
        if(validate()){
            setOpenBackDrop(true);
            ForgotApi.doForgot(data).then(resp=>{
                console.log(resp.data);
                openMessage({
                    message:resp.data,
                    type:"success"
                });
            })
        }
    }

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper elevation={4} className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOpenOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Quên mật khẩu
                </Typography>
                <CustomForm className={classes.form} onSubmit={handleSubmit}>
                    <CustomTextField
                        id="username" label="Tên đăng nhập" fullWidth
                        name="username" initialValue={data.username}
                        onChange={handleInputChange} error={error.username} 
                    />
                    <Button
                        type="submit" fullWidth
                        variant="contained" color="primary"
                        className={classes.submit}
                    >
                        Gửi mail
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to={"/"} className={classes.link}>
                                <Typography variant="body2"> 
                                    Đăng nhập
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </CustomForm>
                <Box mt={8}>
                    <Copyright />
                </Box>
                <CustomBackDrop open={openBackDrop} />
                <CustomNotification notify={notify} onNotify={setNotify}/> 
            </Paper>
        </Container>
    );
}