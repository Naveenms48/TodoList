import './app.css'
import { useState } from "react"
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { FaSave } from "react-icons/fa";

function App() {

  const[items,setItems] = useState([
    {id : 1,label : 'HTML&CSS',checked:true},
    {id : 2,label : 'CSS&JS',checked:false},
    {id : 3,label : 'JS&React',checked:true}
  ])

  const[newItem,setNewItem] = useState('')

  let handleCheck = (id) => {
    let newlistItem = items.map((item)=>{
      return item.id === id ? {...item,checked : !item.checked} : item 
    })
    setItems(newlistItem)
  }
  
  const[isedit,setIsedit] = useState(false)
  const[currItem,setCurrItem] = useState(null)
  let handleEdit = (id) => {
    let editingItem = items.find((item)=>item.id === id)
    setNewItem(editingItem.label)
    setIsedit(true)
    setCurrItem(id)
  }

  let handleDelete = (id) => {
    let newItems = items
    .filter((item) => item.id!==id)
    .map((item,index)=>{
      return {...item, id : index + 1}
    })
    setItems(newItems)
  }

  let handleSaveOrAdd = () => {
    if(isedit){
      let newlistItems = items.map((item) => {
        return item.id === currItem ? {...item,label : newItem} : item
      })
      setItems(newlistItems)
      setCurrItem(null)
      setNewItem('')
      setIsedit(false)
    }
    else{
      setItems([...items,{id:items.length+1,label:newItem,checked:false}])
      setNewItem('')
    }
  }


  return (
    <>
      <div>
        <h1>ToDo List</h1>
        <main>
          <input type="text"  value={newItem} onChange={(e)=>setNewItem(e.target.value)}/>
          <button onClick={handleSaveOrAdd}>{isedit ? <FaSave id='save'/> : <IoMdAddCircle id='add'/>}</button>
        </main>
        <ul>
          {
            items.map((item)=>{
              return(
                <li key={item.id}>
                  <input type="checkbox" checked={item.checked} onChange={()=>handleCheck(item.id)}/>
                  <label >{item.label}</label>
                  <FaEdit id='edit' onClick={()=>handleEdit(item.id)}/>
                  <RiDeleteBin6Fill id='delete' onClick={()=>handleDelete(item.id)} />
                </li>
              )
            })
          }
        </ul>
      </div>
      
    </>
  )
}

export default App
