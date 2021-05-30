import {configureStore} from "@reduxjs/toolkit";
import SideBarReducer from "./slice/SideBarSlice";
import DashBoardReducer from "./slice/DashboardSlice";
import RegReducer from "./slice/RegistrationSlice";

export default configureStore({
    reducer:{
      sideBar: SideBarReducer,
      dashBoard:DashBoardReducer,
      reg:RegReducer
    }
})