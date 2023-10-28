import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context, server } from "../index";
import TodoList from "../components/TodoList";
import { deleteModel } from "mongoose";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigation  = useNavigate(); // Initialize useHistory
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [refresh , setRefresh] = useState(false)  
  
  const {isAuthenticated} = useContext(Context)

  console.log(isAuthenticated)
  //create new task
  const todoHandler = async (e) => {
    e.preventDefault();
    console.log(description, title);
    try {
      const data = await axios.post(
        `${server}/task/new`,
        {
          title,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setRefresh(prev=>!prev)
      setTitle("");
      setDescription("");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //update task
  const updateTask = async(id) => {
    alert(id);
    try {
    const {data}=  await axios.put(`${server}/task/${id}`,{},{
        withCredentials:true
      })

      alert(data.message)
      setRefresh(prev=>!prev)
    } catch (error) {
      console.log(error)
    }
  };

  //deleteTask
  const deleteTask = async(id) => {
    alert(id)
    try {
      const {data}=  await axios.delete(`${server}/task/${id}`,{
          withCredentials:true
        })
  
        alert(data.message)
        setRefresh(prev=>!prev)   
      } catch (error) {
        console.log(error)
      }
  };

  //for showing data
  useEffect(() => {
    axios
      .get(`${server}/task/my`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [refresh]);


  //if not authenticated then
  if(!isAuthenticated) return navigation('/login');

  return (
    <div>
      <div className="w-1/2 mx-auto p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Create New Item</h2>
        <form onSubmit={todoHandler}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
              type="text"
              id="title"
              name="title"
              placeholder="Enter a title"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
              id="description"
              name="description"
              placeholder="Enter a description"
              rows="4"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none"
            >
              Create
            </button>
          </div>
        </form>
      </div>

      {/* //task container */}
      <div className="flex justify-center items-center h-screen">
        <div className="w-1/2">
          {tasks.map((task, index) => (
            <div key={index._id}>
              <TodoList
                title={task.title}
                description={task.description}
                isCompleted={task.isCompleted}
                updateTask={updateTask}
                deleteTask={deleteTask}
                id={task._id}
                key={task._id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>

    //task container
  );
};

export default Home;
