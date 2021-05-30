import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import clsx from 'clsx';
import { IconButton, makeStyles, Tooltip } from '@material-ui/core';
import { useSelector } from 'react-redux';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import AccessAlarmOutlinedIcon from '@material-ui/icons/AccessAlarmOutlined';
import { NavLink } from 'react-router-dom';
import {LoginApi} from "../../api/LoginApi";

const sideBarWidth = 240;

const useStyles = makeStyles((theme) => ({
    sideBar: {
        width: sideBarWidth,
        //Không co lại khi đóng
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    open: {
        width: sideBarWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    close: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    link:{
        width:"100%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        textDecoration:"none",
        color:theme.palette.text.primary
    },
    activeLink:{
        color:"white",
        backgroundColor:theme.palette.primary.light,
        '& .MuiIconButton-root':{
            color:"white"
        }
    }
}));

const adminLink = [
    {text:"Trang chủ",url:"/admin",icon:<DashboardOutlinedIcon/>},
    {text:"Thay đổi gian đăng kí",url:"/admin/regtime",icon:<AccessAlarmOutlinedIcon/>},
    {text:"Thống kê theo môn",url:"/admin/stat",icon:<AssessmentOutlinedIcon/>}
]

const account = LoginApi.getSessionAccount();
const teacherLink = [
    {
        text:"Đăng kí dạy",
        url:account?("/teacher?id="+account.id):"/teacher",
        icon:<AssignmentTurnedInOutlinedIcon/>
    },
]

function getLinkByRole(role){
    switch(role){
        case "ADMIN":{
            return adminLink;
        }
        case "TEACHER":{
            return teacherLink;
        }
        default:{
            return [];
        }
    }
}

export default function CustomSideBar(){
    //Css
    const classes = useStyles();
    //Lấy trạng thái của sidebar từ slice
    const state = useSelector(state => state.sideBar);
    //Thiết lập đường link theo chức vụ
    const links = getLinkByRole(state.role);
    return(
        <Drawer
            variant="permanent"
            className={clsx(classes.sideBar, {
                [classes.open]: state.open,
                [classes.close]: !state.open,
            })}
            classes={{
                paper: clsx({
                    [classes.open]: state.open,
                    [classes.close]: !state.open,
                }),
            }}
        >
            {/* Cách sidebar ra một đoạn bằng appbar */}
            <div className={classes.toolbar}/>
            <Divider />
            <List>
                {links.map((link, index) => (
                    <NavLink 
                        to={link.url} exact
                        activeClassName={classes.activeLink} 
                        key={index} className={classes.link}
                    >
                        <ListItem disableGutters button style={{paddingLeft:"10px"}}>
                            <Tooltip title={link.text} style={{marginRight:"5px"}}>
                                <ListItemIcon>
                                    <IconButton>
                                        {link.icon}
                                    </IconButton>
                                </ListItemIcon>
                            </Tooltip>
                            <ListItemText primary={link.text}/>
                        </ListItem>  
                    </NavLink>
                ))}
            </List>
        </Drawer>
    )
}