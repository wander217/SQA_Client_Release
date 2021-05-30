import { 
    makeStyles, Table, TableCell,
    TableHead, TableRow, TablePagination, 
    TableSortLabel, TableContainer, Paper
} from "@material-ui/core"
import { ControlPointSharp } from "@material-ui/icons";
import { useEffect, useState } from "react";

const useStyles=  makeStyles(theme=>({
    table:{
        overflowX:"auto",
        minWidth:"600px",
        '& thead th':{
            fontWeight:'600',
            color:"white",
            backgroundColor:theme.palette.primary.light,
            minWidth:"50px",
            maxWidth:"250px",
            overflow: "hidden",
            textOverflow:"ellipsis",
            whiteSpace:"nowrap"
        },
        '& tbody':{
            fontWeight:'300'
        }
    }
}));

function useTable(labels,handlePage,total){
    //Css
    const classes = useStyles();
    //Trang được hiển thị
    const [pageNumber,setPageNumber] = useState(0);
    //Số phần tử in ra được chọn
    const [recordPerPage,setRecordPerPage] = useState(5);
    //Nhãn để sắp xếp
    const [sortLabel,setSortLabel] =  useState(labels[0].name);
    //Thứ tự sắp xếp
    const [sortOrder,setSortOrder] = useState("asc");

    //Xử lý khi click vào nút chuyển trang hoặc nút đổi số trang hiển thị
    useEffect(()=>{
       handlePage(pageNumber,recordPerPage,sortLabel,sortOrder);
    },[pageNumber,recordPerPage,sortLabel,sortOrder]);

    //Tạo bảng
    const CustomTable = props=>(
       <TableContainer component={Paper}>
           <Table className={classes.table} >
                {props.children}
            </Table>
       </TableContainer> 
    )

    //Sắp xếp phần tử của bảng
    const handleSortRecord = label=>{
        const isAsc = sortLabel === label && sortOrder ==="asc";
        setSortOrder(isAsc?"desc":"asc");
        setSortLabel(label);
    }

    //Tạo đầu của bảng
    const CustomHeader = ()=>(
        <TableHead>
            <TableRow>
                {
                    labels.map((label,index)=>(
                        <TableCell
                            align="center" key={index}
                            sortDirection={sortLabel === label.name?sortOrder:false}
                        >
                            {
                                label.disableSorting
                                ?label.title
                                :(
                                    <TableSortLabel
                                        active={label.name === sortLabel}
                                        direction = {label.name === sortLabel?sortOrder:"asc"}
                                        onClick={()=>handleSortRecord(label.name)}
                                    >
                                        {label.title}  
                                    </TableSortLabel>
                                )
                            }
                        </TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    );

    //Xử lý chuyển trang
    const handlePageChange = (e,newPageNumber)=>{
        setPageNumber(newPageNumber);
    }

    //Xử lý số bảng ghi hiển thị
    const handleRowsPerPageChange = e=>{
        setRecordPerPage(parseInt(e.target.value,10));
        setPageNumber(0);
    }


    //Tạo phần chuyển trang
    const CustomPagination = ()=>(
        <TablePagination
            component={"div"}
            page = {pageNumber}
            rowsPerPageOptions={[5,10,25]}
            rowsPerPage={recordPerPage}
            count={ total }
            onChangePage={handlePageChange}
            onChangeRowsPerPage= {handleRowsPerPageChange}
        />
    );

    return{
        CustomTable,
        CustomHeader,
        CustomPagination,
        pageNumber,setPageNumber,
        sortOrder
    }
}

export {useTable}