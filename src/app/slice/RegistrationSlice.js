import {createSlice} from "@reduxjs/toolkit";

//State của sidebar
const initialState = {
    teacherId:0,
    subjectId:0,
    sumGroup:0,
    update:false
}

//Slice của đăng kí
const RegSlice=createSlice({
    name:"registration",
    initialState,
    reducers:{
        //Cài đặt mã môn được chọn
        setSubject:(state,data)=>{
            return{
                ...state,
                subjectId:data.payload,
            }
        },
        //Cài đặt mã giảng viên được chọn
        setTeacher:(state,data)=>{
            return{
                ...state,
                teacherId:data.payload,
            }
        },
        //Cài tổng số nhóm
        setSumGroup:(state,data)=>{
            return{
                ...state,
                sumGroup:data.payload,
            }
        },
        //Cài tổng số nhóm đã đăng kí
        setUpdate:(state,data)=>{
            return{
                ...state,
                update:data.payload,
            }
        },
    }
});

export const { setSubject,setTeacher,setSumGroup,setUpdate} = RegSlice.actions; 
export default RegSlice.reducer;