import React, { useEffect, useState } from "react";
import { 
    FormGroup,
    IconButton,
    InputAdornment, makeStyles, Paper,
    TableBody, TableCell, TableRow, Toolbar, Tooltip, Typography
} from "@material-ui/core";
import { SearchOutlined} from "@material-ui/icons";
import {StatisticApi} from "../../../api/StatisticApi";
import {useTable} from "../../component/CustomTable";
import CustomTextField from "../../component/CustomTextField";
import CustomSelect from "../../component/CustomSelect";
import EventBusyOutlinedIcon from '@material-ui/icons/EventBusyOutlined';
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import { useHistory } from "react-router";

const useStyles=makeStyles((theme)=>({
    root:{
        width:"80%",
        padding:theme.spacing(3),
        paddingTop:theme.spacing(3)
    },
    title:{
        width:"200px",
        marginTop:theme.spacing(1),
        color:theme.palette.text.secondary,
        paddingBottom:theme.spacing(1)
    },
    search:{
        width:"100%",
        marginBottom:theme.spacing(2),
        display:"flex",
        justifyContent:"space-around",
        alignItems:"flex-end"
    },
    searchSelect:{
        width:"20%"
    },
    searchBox:{
        width:"75%"
    },
    tableCell:{
        minWidth:"50px",
        maxWidth:"200px",
        overflow: "hidden",
        textOverflow:"ellipsis",
        whiteSpace:"nowrap"
    },
    buttonBox:{
        display:"flex",
        justifyContent:"space-around",
        alignItems:"center"
    }
}));

const headerCells=[
    {title:"id",disableSorting:false,name:"termSubject.id"},
    {title:"Tên môn",disableSorting:false,name:"termSubject.subject.name"},
    {title:"Đăng kí đủ",disableSorting:false,name:"remember"},
    {title:"Đăng kí thiếu",disableSorting:false,name:"forgot"},
    {title:"Hành động",disableSorting:true}
]

const showLabels = item=>[
    item.id,
    item.termSubjectName,
    item.remember,
    item.forgot
]

export default function SubjectStatistic(){
    //Load dữ liệu
    const [record, setRecord] = useState([]);
    //Tổng số phần tử
    const [total,setTotal] = useState(0);
    //kiểm tra có phải search ko
    const [isSearch,setSearch] = useState(false);
     //Xử lý chuyển trang
     const handlePage=(pageNumber,recordPerPage,title,sortOrder)=>{
        setPageNumber(pageNumber);
        const tmp = isSearch?dataInput.input:"";
        StatisticApi.getAll(pageNumber,recordPerPage,title
                        ,sortOrder,dataInput.type,tmp)
        .then(resp=>{
            setRecord(resp);
            if(resp.length!==0){
                setTotal(resp[0].totalItem);
            }else{
                setTotal(0);
            }
        }); 
    }
     //Lấy thuộc tính của bảng
     const {
        CustomTable,
        CustomHeader,
        CustomPagination,
        setPageNumber,sortOrder
    }= useTable(headerCells,handlePage,total);
    //Dữ liệu nhập vào
    const [dataInput, setdataInput] = useState({
        input:""
    });
    
    //Xử lý tìm kiếm
    const handleSearch = ()=>{
        setSearch(true);
        handlePage(0,5,headerCells[0].name,sortOrder);
        setPageNumber(0);
    };
    //Xử lý khi nhập
    const handleInputChange=e=>{
        const {name,value} = e.target;
        setdataInput({
           ...dataInput,
           [name]:value
        });
    }
    const history = useHistory();
    //Chuyển hướng sang thống kê đăng kí đủ
    const handleRemember = item=>{
        history.push("/admin/stat/remember?id="+item.id);
    }
    //Chuyển hướng sang thống kê đăng kí thiếu
    const handleForgot = item=>{
        history.push("/admin/stat/forgot?id="+item.id);
    }

    //CSS
    const classes = useStyles();

    return (
        <Paper elevation={3} className={classes.root}>
            <Toolbar>
                <FormGroup row className={classes.search}>
                    <CustomTextField
                        label={"Tìm kiếm theo tên môn"}
                        className={classes.searchBox} name={"input"}
                        InputProps={{
                            endAdornment:(
                                <InputAdornment position="end">
                                    <IconButton onClick={handleSearch}>
                                        <SearchOutlined/>
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        initialValue={dataInput.input}
                        onChange={handleInputChange}
                    />
                </FormGroup>
            </Toolbar>
            <Typography variant="subtitle2" className={classes.title}>
                {"Thống kê đăng kí theo nhóm"}
            </Typography>
             <CustomTable>
                <CustomHeader/>
                <TableBody>
                    {
                        record.length===0
                        ?(
                            <TableRow>
                                <TableCell align="center" colSpan={headerCells.length}>
                                    {"Không có dữ liệu"}
                                </TableCell>
                            </TableRow>
                        )
                        :record.map((item,index)=>(
                            <TableRow key={index}>
                                {
                                    showLabels(item).map((label,index1)=>(
                                        <TableCell 
                                            align="center"
                                            key={index+" "+index1}
                                            className={classes.tableCell}
                                        >
                                            {label}
                                        </TableCell>   
                                    ))
                                }
                                <TableCell 
                                    align="center"
                                    className={classes.buttonBox}
                                >
                                    <Tooltip title="Danh sách đăng kí đủ">
                                         <span>
                                            <IconButton size="small" 
                                                disabled={item.remember===0}
                                                onClick={()=>handleRemember(item)}
                                            >
                                                <EventAvailableOutlinedIcon/>
                                            </IconButton>
                                        </span>    
                                    </Tooltip>
                                    <Tooltip title="Danh sách đăng kí thiếu">
                                        <span>
                                            <IconButton size="small" 
                                                disabled={item.forgot===0}
                                                onClick={()=>handleForgot(item)}
                                            >
                                                <EventBusyOutlinedIcon/>
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </CustomTable>
            <CustomPagination/>
        </Paper>
    )
}