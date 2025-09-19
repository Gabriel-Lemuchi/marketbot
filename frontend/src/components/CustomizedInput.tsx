import TextField from '@mui/material/TextField'

type Props = {
  name: string
  type: string
  label: string

}

const CustomizedInput = (props : Props) => {
  return <TextField name={ props.name } label={props.label} type={props.type} sx={{
    mt: 2,
    mb: 2,
    input: { color: "rgb(0, 111, 6)" },
    label: { color: "rgb(0, 111, 6)" },
  }}/>;
}

export default CustomizedInput;
