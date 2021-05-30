import { IconButton, makeStyles, Tooltip, Typography } from "@material-ui/core";
import {toggleSideBar} from "../../app/slice/SideBarSlice";
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from "react-router";

const sidebarWidth = 240;

const useStyles = makeStyles((theme) => ({
    appBar: {
        //Luôn ở trên sidebar
        zIndex: theme.zIndex.drawer + 1,
        //Chuyển động khi đóng mở
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        //hiệu ứng khi chuyển
        marginLeft: sidebarWidth,
        width: `calc(100% - ${sidebarWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    button: {
        marginRight: 36,
    },
    title:{
        flexGrow:"1"
    }
}));

export default function CustomAppBar(){
    //CSS
    const classes = useStyles();
    //Lấy dispatch để thực hiện hàm của slice
    const dispatch = useDispatch();
    //Lấy trạng thái của sidebar từ slice
    const state = useSelector(state => state.sideBar);
    //Xử lý đóng mở sideBar
    const handleSideBar = ()=>dispatch(toggleSideBar());
    //Đăng xuất
    const history= useHistory();
    const logout= ()=>{
        sessionStorage.clear();
        history.push("/login");
    }
    return(
        <AppBar position="fixed" 
            className={
                clsx(classes.appBar, {
                [classes.appBarShift]: state.open,
            })
        }>
                <Toolbar>
                    <IconButton
                        edge="start" 
                        color="inherit"
                        aria-label="menu button"
                        onClick={handleSideBar}
                        className={classes.button}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography 
                        variant="h6" noWrap
                        className={classes.title}
                    >
                        PTIT
                    </Typography>
                    <Tooltip title="Đăng xuất"> 
                        <IconButton color="inherit" size="medium" onClick={logout}>
                            <ExitToAppIcon/>
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
    )
}