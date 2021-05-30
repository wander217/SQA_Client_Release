import { 
    Accordion, AccordionActions, AccordionDetails,
    AccordionSummary,Button, Divider, IconButton, InputAdornment, List, 
    ListItem, ListItemText, ListSubheader,makeStyles, Paper, Typography 
} from "@material-ui/core";
import { ExpandMoreOutlined, SearchOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {TeacherApi} from "../../../api/TeacherApi";
import {useForm,CustomForm} from "../../component/CustomForm";
import CustomTextField from "../../component/CustomTextField";
import {setChooseButton} from "../../../app/slice/DashboardSlice";
var _ = require("lodash");

const useStyle = makeStyles(theme=>({
    root:{
        maxHeight:"70vh",
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
    fullname:"",
}


const validateData=[
    {
        name:"fullname",
        testFunction:item=>(/^[\p{L}\d\s]*$/u).test(item),
        errorMessage: "Tên giảng viên chỉ được bao gồm chữ,số,khoảng trắng"
    }
]

export default function TeacherList(){
    //Thiết lập form
    const{
        data, error,validate, handleInputChange
    } =  useForm(initialData,validateData);
    //Lấy trạng thái của sidebar từ slice
    const state = useSelector(state => state.dashBoard);
    //Lấy dữ liệu giảng viên
    const [teacherList, setTeacherList] = useState([]);
    //Lấy dispatch để thực hiện hàm của slice
    const dispatch = useDispatch();
    const handleList = ()=>{
        TeacherApi.getAllTeacher(data.fullname).then(resp=>{
            const arr = _.sortBy(resp,["fullname"]);
            setTeacherList(arr);
        })
    }
    useEffect(() => {
      handleList();
    }, []);
    //Xử lý khi chọn nút
    const handleSelect = item=>{
        dispatch(setChooseButton(item.id));
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
                    id="fullname" label="Tìm kiếm theo họ và tên"
                    name="fullname" initialValue={data.fullname}
                    onChange={handleInputChange} error={error.fullname} 
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
                    {"Danh sách giảng viên"}
                </ListSubheader>
                <Divider/>
                {
                    teacherList.length===0?(
                        <ListItem>
                            <ListItemText>
                                {"Không có dữ liệu cần tìm!"}
                            </ListItemText>
                        </ListItem>
                    ):teacherList.map((item,index)=>(
                        <ListItem key={index}>
                            <Accordion  className={classes.accordion}>
                                <AccordionSummary expandIcon={<ExpandMoreOutlined/>}>
                                    {"Họ và tên :"+item.fullname}
                                </AccordionSummary>
                                <Divider/>
                                <AccordionDetails className={classes.detail}>
                                    <Typography 
                                        component="div" 
                                        variant="body2"
                                        className={classes.typography}
                                    >
                                        {"Số môn đăng kí đủ: "+item.remember}
                                    </Typography>
                                    <Typography
                                         component="div" 
                                         variant="body2"
                                         className={classes.typography}
                                    >
                                        {"Số môn đăng kí thiếu: "+item.forgot}
                                    </Typography>
                                </AccordionDetails>
                                <AccordionActions>
                                    <Button 
                                        variant="contained" 
                                        color={"primary"}
                                        disabled={item.id===state.id}
                                        onClick={()=>handleSelect(item)}
                                    >
                                        Xem lịch sử
                                    </Button>
                                </AccordionActions>
                            </Accordion>
                        </ListItem>
                    ))
                }
           </List>
        </Paper>
    )
}