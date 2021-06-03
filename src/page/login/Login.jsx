import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Link, useHistory} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from "@material-ui/core/Paper";
import CustomTextField from "../component/CustomTextField";
import CustomPasswordField from "../component/CustomPasswordField";
import CustomCheckBox from "../component/CustomCheckBox";
import CustomBackDrop from "../component/CustomBackDrop";
import CustomNotification from "../component/CustomNotification"
import {CustomForm,useForm} from "../component/CustomForm";
import {LoginApi} from "../../api/LoginApi";

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
    username:"",
    password:"",
    remember:false
}

const validateData=[
    {
        name:"username",
        testFunction:item=>(/^[0-9A-Za-z@\.\-_\\/]+$/).test(item),
        errorMessage: "Tên đăng nhập chỉ được bao gồm chữ,số hoặc các kí tự như @.-/_ và không được để trống"
    },
    {
        name:"password",
        testFunction:item=>(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*_])(?=\S+).{8,}$/).test(item),
        errorMessage: "Mật khẩu phải gồm ít nhất 8 kí tự bao gồm ít nhất 1 chữ cái in thường,"+
        " 1 chữ cái in hoa, 1 số và 1 kí tự đặc biệt !@#$%^&*_"
    }
]

export default function Login() {
    //Nếu có tài khoản thì đăng nhập luôn
    //Tự động chuyển hướng
    const history = useHistory();
    useEffect(() => {
        LoginApi.autoLogin().then(resp=>{
            if(resp!=null){
                history.push("/"+resp);
            }
        })
    }, [history]);
    //Lấy tài khoản đã lưu
    const localAccount = LoginApi.getLocalAccount();
    //Lấy các hàm cần thiết cho form
    const{
        data, error,
        validate, handleInputChange
    } =  useForm(localAccount?localAccount:initialData,validateData);
     //Thông báo  
     const [notify,setNotify] = useState({ open:false, message:"", type:""});
     //mở chế độ chờ
     const [openBackDrop,setOpenBackDrop] = useState(false);

    //Mở thông báo
    function openMessage(state){
        setOpenBackDrop(false);
        setNotify({
            open:true,
            message:state?"Đăng nhập thành công!":"Sai tài khoản hoặc mật khẩu!",
            type:state?"success":"error"
        })
    }

    //Bắt sự kiện người dùng gửi lên
    const handleSubmit = e=>{
        e.preventDefault();
        if(validate()){
            setOpenBackDrop(true);
            LoginApi.doLogin(data).then(resp=>{
                if(!Boolean(resp.data)){
                    openMessage(false);
                    return;
                }
                openMessage(true);
                const account ={
                    id:resp.data.id,
                    username:data.username,
                    password:data.password,
                    role:resp.data.role,
                    remember:data.remember
                };
                const accountJson =JSON.stringify(account);
                localStorage.setItem("account","");
                if(data.remember){
                    localStorage.setItem("account", accountJson);
                }
                sessionStorage.setItem("account",accountJson);
                window.setTimeout(()=>{
                    history.push("/"+resp.data.role.name.toLowerCase());
                },1000);
            });
        }
    }

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper elevation={4} className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Đăng nhập
                </Typography>
                <CustomForm className={classes.form} onSubmit={handleSubmit}>
                    <CustomTextField
                        id="username" label="Tên đăng nhập" fullWidth
                        name="username" initialValue={data.username}
                        onChange={handleInputChange} error={error.username} 
                    />
                    <CustomPasswordField
                        id="password" label="Mật khẩu" fullWidth
                        name="password" initialValue={data.password}
                        onChange={handleInputChange} error={error.password}
                    />
                   <CustomCheckBox
                        title={""} label={"Ghi nhớ"} 
                        name={"remember"} initialValue={data.remember}
                        onChange={handleInputChange}
                    />
                    <Button
                        type="submit" fullWidth
                        variant="contained" color="primary"
                        className={classes.submit}
                        id={"login-button"}
                    >
                        Xác nhận
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to={"/forgot"} className={classes.link}>
                                <Typography variant="body2"> 
                                    Quên mật khẩu?
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </CustomForm>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Paper>
            <CustomBackDrop open={openBackDrop} />
            <CustomNotification notify={notify} onNotify={setNotify}/> 
        </Container>
    );
}