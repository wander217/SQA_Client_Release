import React, { useEffect, useState } from "react";
import { 
    FormGroup,
    IconButton,
    InputAdornment, makeStyles, Paper,
    TableBody, TableCell, TableRow, Toolbar, Typography
} from "@material-ui/core";
import { SearchOutlined} from "@material-ui/icons";
import {HistoryApi} from "../../../api/HistoryApi";
import {useTable} from "../../component/CustomTable";
import CustomTextField from "../../component/CustomTextField";
import CustomSelect from "../../component/CustomSelect";
import { useSelector } from "react-redux";

const useStyles=makeStyles((theme)=>({
    root:{
        width:"100%",
        padding:theme.spacing(3),
        paddingTop:theme.spacing(3)
    },
    title:{
        width:"100px",
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
    searchBox:{
        width:"80%"
    },
    tableCell:{
        minWidth:"50px",
        maxWidth:"200px",
        overflow: "hidden",
        textOverflow:"ellipsis",
        whiteSpace:"nowrap"
    },
}));

const headerCells=[
    {title:"id",disableSorting:false,name:"id"},
    {title:"Mã nhóm",disableSorting:false,name:"subjectGroup.code"},
    {title:"Tên môn",disableSorting:false,name:"subjectGroup.termSubject.subject.name"},
    {title:"Ngày đăng kí",disableSorting:false,name:"regTime"},
    {title:"Trạng thái",disableSorting:false,name:"isEnable"}
]

function getRegisterTime(data){
    const date =  new Date(data);
    const h =date.getHours()>9?date.getHours():("0"+date.getHours());
    const m =date.getMinutes()>9?date.getMinutes():("0"+date.getMinutes());
    const s =date.getSeconds()>9?date.getSeconds():("0"+date.getSeconds());
    const d =date.getDate()>9?date.getDate():("0"+date.getDate());
    const mh =date.getMonth()>8?(date.getMonth()+1):("0"+(date.getMonth()+1));
    return h+":"+m+":"+s+" "+d+"/"+mh+"/"+date.getFullYear();
}

const showLabels = item=>[
    item.id,
    item.subjectGroupCode,
    item.subjectName,
    getRegisterTime(item.regTime),
    item.enable?"Còn hiệu lực":"Đã hủy"
]

const searchData=[
    {value:0,title:"Mã nhóm"},
    {value:1,title:"Tên môn"}
]

export default function HistoryTable(){
    //Lấy state
    const state = useSelector(state => state.dashBoard);
    //Dữ liệu bảng
    const [record, setRecord] = useState([]);
    //Tổng số phần tử
    const [total,setTotal] = useState(0);
     //Dữ liệu nhập vào
     const [dataInput, setdataInput] = useState({
        input:"",
        type:0
    });
    //Xử lý chuyển trang
    const handlePage=(pageNumber,recordPerPage,title,sortOrder)=>{
        if(state.id===0)return;
        setPageNumber(pageNumber);
        HistoryApi.getByTeacher(state.id,pageNumber,recordPerPage,title
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
    //Cập nhật
    useEffect(()=>{
        handlePage(0,5,headerCells[0].name,"asc");
        setdataInput({ input:"", type:0});
    },[state.id,setPageNumber])

    //Xử lý khi nhập
    const handleInputChange=e=>{
        const {name,value} = e.target;
        setdataInput({
           ...dataInput,
           [name]:value
        });
    }
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

    useEffect(()=>{
        handlePage(0,5,headerCells[0].name,sortOrder);
        setPageNumber(0);
    },[dataSearch.type,dataSearch.input])

    //CSS
    const classes = useStyles();

    return (
        <Paper elevation={3} className={classes.root}>
            <Toolbar>
                <FormGroup row className={classes.search}>
                    <CustomSelect
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
                {"Lịch sử đăng kí"}
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
                            </TableRow>
                        ))
                    }
                </TableBody>
            </CustomTable>
            <CustomPagination/>
        </Paper>
    )
}