import { FormControl, FormHelperText, InputLabel, NativeSelect } from "@material-ui/core";

export default function CustomSelect(props){
    const {id,name,title,initialValue,data,error="",onChange,...other} = props;
    return(
        <FormControl error={Boolean(error)} {...other}>
            <InputLabel htmlFor={id}>
                {title}
            </InputLabel>
            <NativeSelect
                variant={"outlined"}
                defaultValue={initialValue}
                inputProps={{
                    name: name,
                    id: id,
                }}
                onChange={onChange}
            >
                {
                    data.map((item,index)=>(
                        <option key={index} value={item.value}>
                            {item.title}
                        </option>
                    ))
                }
            </NativeSelect>
            <FormHelperText error>
                {error}
            </FormHelperText>
        </FormControl>
    )
}