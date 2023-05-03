import { useState, useEffect } from 'react';
import '../App.css';
import Addtodo from './addtodo';


let featch = async (url, page) => {
  console.log('hii')

  let res = await fetch(`http://localhost:3000/todos`);
  console.log(res)
  let data = await res.json()
  return data.todos;
}
const Todo = () => {
  let [todos, settodos] = useState([]);
  let [loding, setLoding] = useState(true)
  let [err, setErr] = useState(false);
  let [btn, setBtn] = useState(1);
  let [url, setUrl] = useState([`http://localhost:3000/todos`])
  useEffect(() => {
    setTimeout(() => {
      featch(url, btn).then((res) => {
        setErr(false)
        setLoding(true)
        settodos([...res])
        setErr(false)
        setLoding(false)
        console.log(res);
      }).catch((err) => {
        setLoding(false);
        setErr(true);
      })
    }, 1000)
  }, [url, btn])

  async function handelClick(id, status) {
    console.log(`${url}/${id}`);
    let obj = {
      completed: !status
    }

    const response = await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(obj),
    });

    const data = await response.json();

    setUrl([...url])

  }

  async function dlt(id) {
    console.log(`${url}/${id}`);
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data)
    setUrl([...url])

  }



  return (
    <div>
      <h2>TO-DOS</h2>
      <Addtodo url={url} setUrl={setUrl} />
      <table >
        <thead>
          <tr>
            <th>Sl. No.</th>
            <th>To-Do</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            todos.map((el, ind) => {
              return <tr key={ind}>
                <td>{ind + 1}</td>
                <td>{el.title}</td>
                {el.completed ? <td style={{ cursor: "pointer" }} onClick={() => { handelClick(el.id, el.completed) }}>✅</td>
                  : <td style={{ cursor: "pointer" }} onClick={() => { handelClick(el.id, el.completed) }}>❌</td>}
                <td onClick={() => { dlt(el.id) }} style={{ color: "red", fontWeight: "bolder", cursor: "pointer" }}>⌫</td>
              </tr>
            })
          }
        </tbody>
      </table>
      {
        loding ? <h2>loding.....</h2> : ""
      }
      {
        err ? <h2 style={{ color: "red" }}>Something Error....</h2> : ""
      }
      {
        loding ? "" : <div>
          <button onClick={() => {
            setBtn(btn - 1);
          }} disabled={btn == 1} style={{ backgroundColor: btn == 1 ? "rgb(95, 214, 95)" : "green" }}>Previous</button>
          <button onClick={() => {
            setBtn(btn + 1)
          }} disabled={todos.length < 20} style={{ backgroundColor: todos.length < 20 ? "rgb(95, 214, 95)" : "green" }}>Next</button>
        </div>
      }
    </div>
  );
}

export default Todo;
