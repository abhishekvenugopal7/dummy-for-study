


import { useState,useEffect } from "react";
import axios from "axios"

function App(){
  // const API="http://127.0.0.1:8000/student/"
  // const API = import.meta.env.VITE_API_URL;
  const API="https://dummy-for-study.onrender.com/student/"
  const[user,SetUser]=useState([])
  const [form,SetForm]=useState({name:"",age:"",email:""})
  const[edit,SetEdit]=useState(null);
  const[search,SetSearch]=useState("")

  const handlechange=(e)=>{
    SetForm({...form,[e.target.name]:e.target.value})
  }

  const fetchdata=async()=>{
    let url=""
    if(search){
      url=`?name=${search}`
    }
    const res=await axios.get(`${API}${url}`)
    SetUser(res.data.results);

  }

  useEffect(() => {
  const delay = setTimeout(() => {
    fetchdata();
  }, 500); // wait 500ms

  return () => clearTimeout(delay);
}, [search]);

  const deletedata=async(id)=>{
    await axios.delete(`${API}${id}/`)
    fetchdata();
  }
  const updatedata=async(u)=>{
    // SetForm({name:u.name,age:u.age,email:u.email});
    SetForm(u);
    SetEdit(u.id)
  }
  const submitform=async(e)=>{
    e.preventDefault();
    if(edit){
      await axios.put(`${API}${edit}/`,form)
      SetEdit(null)
    }
    else{
      await axios.post(API,form)
    }
    fetchdata();
    SetForm({name:"",age:"",email:""})
  }
  return(
    <>
      <form method="POST" onSubmit={submitform}>
        <input type="text" name="name" value={form.name} placeholder="enter name" onChange={handlechange} required/>
        <input type="number" name="age" value={form.age} placeholder="enter age" onChange={handlechange} required/>
        <input type="email" name="email" value={form.email} placeholder="enter email" onChange={handlechange} required/>
        <button type="submit">{edit? "UPDATE":"ADD"}</button>
      </form>


      <div>
        <input type="text" name="search" placeholder="enter search" onChange={(e)=>SetSearch(e.target.value)} />
        {
        user.map((u)=>(
          <p key={u.id}>{u.name}   --   {u.age}   --   {u.email}    <button onClick={()=>updatedata(u)}>UPDATE</button>    <button onClick={()=>deletedata(u.id)}>DELETE</button></p>
        ))
      }
      </div>
    </>
  )
}
export default App;