import React from "react";
import { makeStyles } from "@material-ui/core";

function useForm(initialData,validateData=[]){
    //Cài đặt giá trị ban đầu
     const [data,setData] = React.useState(initialData);
     const [error,setError] = React.useState({});

     //Bắt sự kiện nhập
     const handleInputChange = e=>{
        const {name,value} = e.target;
        setData({
            ...data,
            [name]:value
        });
     }

    //Reset form
    const resetForm=()=>{
        setData(initialData);
        setError({});
    } 

    //Kiểm tra dữ liệu
    const validate = (fieldValue = data)=>{
        let errorChecking={...error};
        for(let item of validateData){
            if(item.name in fieldValue){
                errorChecking[item.name] = item
                    .testFunction(fieldValue[item.name])?"":item.errorMessage; 
            }
        }
        setError({
            ...errorChecking
        })
        return Object.values(errorChecking).every(x=>x==="");
    }

    return {
        data,error,validate,setData,
        resetForm,handleInputChange,setError
    };
}

const useStyles=makeStyles((theme)=>({
    root: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
}));

function CustomForm(props){
    //CSS
    const classes = useStyles();
    //Lấy thông tin
    const {children,...other} = props;

    return(
        <form className={classes.root} autoComplete="off" noValidate {...other}>
            {children}
        </form>  
    );
}

export {useForm,CustomForm};