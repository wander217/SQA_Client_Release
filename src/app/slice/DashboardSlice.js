import {createSlice} from "@reduxjs/toolkit";

//State của sidebar
const initialState = {
    id:0
}

//Slice của sidebar
const DashboardSlice=createSlice({
    name:"Dashboard",
    initialState,
    reducers:{
        //Cài nút được chọn
        setChooseButton:(state,data)=>{
            return{
                ...state,
                id:data.payload
            }
        }
    }
});

export const { setChooseButton} = DashboardSlice.actions; 
export default DashboardSlice.reducer;