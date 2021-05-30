import React, { useEffect, useState } from "react";
import { 
    FormGroup,IconButton,InputAdornment, makeStyles, Paper,
    TableBody, TableCell, TableRow, Toolbar, Tooltip, Typography
} from "@material-ui/core";
import { SearchOutlined} from "@material-ui/icons";
import {TeacherApi} from "../../../api/TeacherApi";
import {useTable} from "../../component/CustomTable";
import CustomTextField from "../../component/CustomTextField";
import CustomSelect from "../../component/CustomSelect";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { useHistory, useLocation } from "react-router";
var _=require("lodash");

const useStyles=makeStyles((theme)=>({
    root:{
        width:"80%",
        padding:theme.spacing(3),
        paddingTop:theme.spacing(3)
    },
    title:{
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
    {title:"id",disableSorting:false,name:"id"},
    {title:"Mã giảng viên",disableSorting:false,name:"tchCode"},
    {title:"Họ và tên",disableSorting:false,name:"fullname"},
    {title:"Hành động",disableSorting:true}
]

const showLabels = item=>[
    item.id,
    item.code,
    item.fullname
]

const searchData=[
    {value:0,title:"Tên giảng viên"},
    {value:1,title:"Mã giảng viên"}
]


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

export default function SubjectTeacherStatistic(){
    const location = useLocation();
    let id = getId(location.search);
    let type = location.pathname.includes("remember")?"remember":"forgot";
    //Lưu trữ dữ liệu
    const [record, setRecord] = useState([])
    //Dữ liệu nhập vào
    const [dataInput, setdataInput] = useState({
        input:"",
        type:0
    });
    //Tổng số phần tử
    const [total,setTotal] = useState(0);
    //Xử lý chuyển trang
    const handlePage=(pageNumber,recordPerPage,title,sortOrder)=>{
        setPageNumber(pageNumber);
        TeacherApi.getAllAssigned(id,type,pageNumber,recordPerPage,title
                        ,sortOrder,dataSearch.type,dataSearch.input)
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

    //Dữ liệu search
    const [dataSearch, setDataSearch] = useState({
        input:"",
        type:0
    });
    //Xử lý tìm kiếm
    const handleSearch = ()=>{
        setDataSearch({
            ...dataSearch,
            ...dataInput
        });
    };
    useEffect(()=>{
        handlePage(0,5,headerCells[0].name,sortOrder);
        setPageNumber(0);
    },[dataSearch.type,dataSearch.input])
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
    const handleRegister = item=>{
        history.push("/admin/stat/modify?id="+item.id);
    }

    //CSS
    const classes = useStyles();

    return (
        <Paper elevation={3} className={classes.root}>
            <Toolbar>
                <FormGroup row className={classes.search}>
                    <CustomSelect
                        className={classes.searchSelect}
                        id={"search"} data={searchData}
                        name={"type"} title={"Loại tìm kiếm"}
                        initialValue={dataInput.type}
                        onChange={handleInputChange}
                    />
                    <CustomTextField
                        label={"Tìm kiếm theo "+searchData[dataInput.type].title.toLowerCase()}
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
                {"Danh sách giảng viên "+(type==="remember"?"đăng kí đủ":"đăng kí thiếu")}
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
                                    <Tooltip title="Chỉnh sửa đăng kí">
                                         <IconButton size="small" 
                                            onClick={()=>handleRegister(item)}
                                        >
                                            <EditOutlinedIcon/>
                                        </IconButton>
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