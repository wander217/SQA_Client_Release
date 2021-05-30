import { 
    Accordion, AccordionActions, AccordionDetails,
    AccordionSummary,Button, Divider, IconButton, InputAdornment, List, 
    ListItem, ListItemText, ListSubheader,makeStyles, Paper, Typography 
} from "@material-ui/core";
import { ExpandMoreOutlined, SearchOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {SubjectApi} from "../../../api/SubjectApi";
import {useForm,CustomForm} from "../../component/CustomForm";
import CustomTextField from "../../component/CustomTextField";
import {setSubject,setTeacher,setSumGroup} from "../../../app/slice/RegistrationSlice";
import { useLocation } from "react-router";
import CustomNotification from "../../component/CustomNotification";
var _ = require("lodash");

const useStyle = makeStyles(theme=>({
    root:{
        height:"65vh",
        overflowX:"auto",
        paddingTop:theme.spacing(0)
    },
    header:{
        background:"white"
    },
    accordion:{
        width:"100%"
    },
    typography:{
        width:"100%"
    },
    form:{
        width:"100%",
        padding:theme.spacing(1)
    },
    detail:{
        display:"flex",
        flexDirection:"column"
    }
}))

const initialData={
    name:"",
}

const validateData=[];

//Dữ liệu bảng
const getId= data=>{
    if(data){
        const searchObject= {};
        _.split(data,/\?| /).forEach(query=>{
            const arr = _.split(query,"=");
            if(arr.length!==2) return;
            searchObject[arr[0]]=arr[1];
        });
        return parseInt(searchObject["id"]);
    }
    return 0;
};

export default function SubjectList(){
    //Lấy state
    const state = useSelector(state => state.reg);
    //Lấy dispatch để thực hiện hàm của slice
    const dispatch = useDispatch();
    //Lấy id
    const location = useLocation();
    let id = getId(location.search);
    const [subjectList, setSubjectList] = useState([]);
    //Thông báo  
    const [notify,setNotify] = useState({ open:false, message:"", type:""});
    //Thiết lập form
    const{
        data, error,validate, handleInputChange
    } =  useForm(initialData,validateData);
    //Tìm kiếm dữ liệu theo tên
    const handleList = ()=>{
        if(id===0) return;
        SubjectApi.getAllSubject(id,data.name)
        .then(resp=>{
            const arr = _.sortBy(resp.data,["name"]);
            setSubjectList(arr);
        })
        .catch(err=>{
            setNotify({
                open:true,
                message:err.response.data,
                type:"error"
            })
        })
    }
    //Cập nhật dữ liệu
    useEffect(()=>{
        handleList();
    },[id]);
    
    //Xử lý khi chọn nút
    const handleSelect = item=>{
        dispatch(setSubject(item.id));
        dispatch(setTeacher(id));
        dispatch(setSumGroup(item.numberOfGroup));
    }
    //Khi nhấn nút tìm kiếm
    const handleSubmit = e=>{
        e.preventDefault();
        if(validate()){
            handleList(); 
        }
    }

    //CSS
    const classes =useStyle();

    return (
        <Paper elevation={3} onSubmit={handleSubmit}>
            <CustomForm className={classes.form}>
                <CustomTextField
                    id="name" label="Tìm kiếm theo tên môn học"
                    name="name" initialValue={data.fullname}
                    onChange={handleInputChange} error={error.name} 
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton type="submit">
                                   <SearchOutlined/> 
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    fullWidth
                />  
            </CustomForm>
           <List className={classes.root}>
                <ListSubheader className={classes.header}>
                    {"Danh sách môn học"}
                </ListSubheader>
                <Divider/>
                {
                    subjectList.length===0?(
                        <ListItem>
                            <ListItemText>
                                {"Không có dữ liệu cần tìm!"}
                            </ListItemText>
                        </ListItem>
                    ):subjectList.map((item,index)=>(
                        <ListItem key={index}>
                            <Accordion  className={classes.accordion}>
                                <AccordionSummary expandIcon={<ExpandMoreOutlined/>}>
                                    {"Tên môn :"+item.name}
                                </AccordionSummary>
                                <Divider/>
                                <AccordionDetails className={classes.detail}>
                                    <Typography 
                                        variant="body2"
                                        className={classes.typography}
                                    >
                                        {"Tổng số nhóm cần đăng kí: "+item.numberOfGroup}
                                    </Typography>
                                    <Typography
                                         variant="body2"
                                         className={classes.typography}
                                    >
                                        {"Số nhóm đã đăng kí: "+item.numberOfRegister }
                                    </Typography>
                                </AccordionDetails>
                                <AccordionActions>
                                    <Button 
                                        variant="contained" 
                                        color={"primary"}
                                        disabled={item.id===state.subjectId}
                                        onClick={()=>handleSelect(item)}
                                    >
                                        Xem danh sách
                                    </Button>
                                </AccordionActions>
                            </Accordion>
                        </ListItem>
                    ))
                }
           </List>
           <CustomNotification notify={notify} onNotify={setNotify}/> 
        </Paper>
    )
}