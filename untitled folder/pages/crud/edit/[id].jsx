import React from 'react'
import axios from 'axios'
import useSWR from 'swr'
import { Button, Box,Typography ,TextField  } from '@mui/material'
import {useRouter} from "next/router"

const EditPage = () => {
 const router = useRouter()
const {id} = router.query
 


    const crudById = `http://localhost:3000/crud/getbyid/${id}`
    const fetcher = async (url) =>
    await axios.get(url).then((res) => res.data.data);
    const {data , error} = useSWR(crudById , fetcher)



    const submitHandler = (e) => {
      e.preventDefault();
     axios.put(`http://localhost:3000/crud/update?id=${id}`,{
      name: e.target.name.value,
      status: e.target.status.value
     }).then((res)=>{
      if(res.status==200){
        router.push("/crud/list.crud")
      }
     }).catch(error=>{
      console.log(error);
     })
    }


  return (data? 
    <Box
      component="form"
      style={{
        backgroundColor: "white",
        color: "black",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
      }}
      onSubmit={submitHandler}
    >
      <Typography>Edit</Typography>
      <TextField
        label="Name"
        defaultValue={data?.name}
        name="name"
      ></TextField>
      <TextField
        label="Status"
        defaultValue={data?.status}
        name="status"
      ></TextField>
      <Button variant="contained" type="submit">
        Save
      </Button>
    </Box> : null
  )
}

export default EditPage