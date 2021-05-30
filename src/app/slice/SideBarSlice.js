import {createSlice} from "@reduxjs/toolkit";

//State của sidebar
const initialState = {
    open:false,
    role:""
}

//Slice của sidebar
const SideBarSlice=createSlice({
    name:"SideBar",
    initialState,
    reducers:{
        //Bật tắt sidebar
        toggleSideBar:state=>{
            return {
                ...state,
                open:!state.open
            };
        },
        //Cài đặt role
        setUpRole:(state,data)=>{
            return{
                ...state,
                role:data.payload
            }
        }
    }
});

export const { toggleSideBar,setUpRole } = SideBarSlice.actions; 
export default SideBarSlice.reducer;