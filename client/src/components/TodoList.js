import React from "react";

function TodoList({ title, description, isCompleted, deleteTask, updateTask, id}) {
  return (
    <div className="bg-white p-4 mb-4 rounded-md shadow-md flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div>
        <input type="checkbox" checked={isCompleted} className="mr-2"  onChange={()=>updateTask(id)}/>
        {/* onClick={() => deleteTask(index)} */}
        <button onClick={()=>deleteTask(id) } className="bg-red-500 text-white font-semibold py-1 px-3 rounded-md focus:outline-none">
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoList;
