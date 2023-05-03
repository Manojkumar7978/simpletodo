import {useState} from 'react';

const Addtodo = ({url,setUrl}) => {
let[input,setInput]=useState();

async function addTodo(){
    let obj={
        "title": input,
        "completed": false
    }
      
      const response = await fetch(`http://localhost:3000/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj),
        });
      
       const data = await response.json();   
       console.log(data)
      setUrl([...url])    
    }

    return (
        <div>
            <input placeholder='input your work...' onChange={(e)=>{setInput(e.target.value)}}></input>
            <button onClick={addTodo}>ADD</button>
        </div>
    );
}

export default Addtodo;
