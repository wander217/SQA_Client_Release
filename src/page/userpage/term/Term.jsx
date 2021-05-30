import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import AccessAlarmOutlinedIcon from '@material-ui/icons/AccessAlarmOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from "@material-ui/core/Paper";
import CustomBackDrop from "../../component/CustomBackDrop";
import CustomNotification from "../../component/CustomNotification"
import {CustomForm,useForm} from "../../component/CustomForm";
import CustomDateTimePicker from "../../component/CustomDateTimePicker";
import {TermApi} from "../../../api/TermApi";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding:theme.spacing(3)
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    title:{
        marginBottom:theme.spacing(5)
    },
    buttonBox:{
        display:"flex",
        width:"100%",
        justifyContent:"space-around",
        alignItems:"center",
        marginTop:theme.spacing(3)
    }
}));

function getStartTime(){
    const now = new Date();
    return now;
}

function getEndTime(){
    const now = new Date();
    now.setHours(now.getHours()+1);
    return now;
}

let start = getStartTime();
let end = getEndTime();

const initialData={
    startDate:start,
    endDate:end,
    startRegTime:start,
    endRegTime:end,
}

export default function Term() {
    //Lấy các hàm cần thiết cho form
    const{
        data,error,setData,setError,
        handleInputChange,resetForm
    } =  useForm(initialData);
    //Cập nhật dữ liệu
    useEffect(() => {
        TermApi.getLast().then(resp=>{
            setData(resp.data);
        }).catch(err=>{
            setNotify({
                open:true,
                message:err.response.data,
                type:"error"
            })
        })
    }, [setData]);
     //Thông báo  
     const [notify,setNotify] = useState({ open:false, message:"", type:""});
     //mở chế độ chờ
     const [openBackDrop,setOpenBackDrop] = useState(false);

    //Bắt sự kiện người dùng gửi lên
    const handleSubmit = e=>{
        e.preventDefault();
        let startReg =new Date(data.startRegTime);
        let endReg = new Date(data.endRegTime);
        let startTermDate = new Date(data.startDate);
        if(startReg<endReg&&endReg<startTermDate){
            setOpenBackDrop(true);
            TermApi.update(data).then(resp=>{
                setOpenBackDrop(false);
                setNotify({
                    open:true,
                    message:resp.data,
                    type:"success"
                })
            }).catch(err=>{
                setOpenBackDrop(false);
                setNotify({
                    open:true,
                    message:err.response.data,
                    type:"error"
                })
            })
        }else{
            setError({
                ...error,
                startRegTime:"Thời gian bắt đầu đăng kí phải nhỏ hơn thời gian kết thúc đăng kí"
            })
            if(startTermDate<endReg){
                setError({
                    ...error,
                    endRegTime:"Thời gian kết thúc đăng kí phải nhỏ hơn thời gian bắt đầu kì học"
                })
            }
        }
    }
    //CSS
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper elevation={4} className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AccessAlarmOutlinedIcon/>
                </Avatar>
                <Typography
                    component="h1" variant="h5"
                    className={classes.title}
                >
                   Thời gian đăng kí kì mới
                </Typography>
                <CustomForm className={classes.form} onSubmit={handleSubmit}>
                    <CustomDateTimePicker
                        name={"startDate"}
                        label={"Thời gian bắt đầu"}
                        initialValue={data.startDate}
                        disabled={true}
                    />
                    <CustomDateTimePicker
                        name={"endDate"}
                        label={"Thời gian kết thúc"}
                        initialValue={data.endDate}
                        disabled={true}
                    />
                    <CustomDateTimePicker
                        name={"startRegTime"}
                        label={"Thời gian bắt đầu đăng kí"}
                        initialValue={data.startRegTime}
                        onChange={handleInputChange}
                        error={error.startRegTime}
                    />
                     <CustomDateTimePicker
                        name={"endRegTime"}
                        label={"Thời gian kết thúc đăng kí"}
                        initialValue={data.endRegTime}
                        onChange={handleInputChange}
                        error={error.endRegTime}
                    />
                    <div className={classes.buttonBox}>
                        <Button
                            type="submit"  variant="contained" 
                            color="primary" className={classes.submit}
                        >
                            Xác nhận
                        </Button> 
                        <Button
                            type="reset"  variant="contained" 
                            color="default" className={classes.submit}
                            onClick={resetForm}
                        >
                            Đặt lại
                        </Button> 
                    </div>
                   
                </CustomForm>
            </Paper>
            <CustomBackDrop open={openBackDrop} />
            <CustomNotification notify={notify} onNotify={setNotify}/> 
        </Container>
    );
}