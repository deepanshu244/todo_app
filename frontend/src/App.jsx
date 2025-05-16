import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/todo");
      setTodos(res.data);
    } catch (error) {
      console.error("Failed to fetch todos", error);
      setTodos([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.title || !form.description) {
      alert("Title and description are required");
      return;
    }

    try {
      if (editMode) {
        await axios.put(`http://localhost:8080/api/todo/${editId}`, form);
      } else {
        await axios.post("http://localhost:8080/api/todo", form);
      }
      
      setForm({ title: "", description: "" });
      setEditMode(false);
      setEditId(null);
      fetchTodos();
    } catch (error) {
      console.error("Error saving todo", error);
      alert(error.response?.data?.message || "Failed to save todo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/todo/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo", error);
      alert("Failed to delete todo");
    }
  };

  const handleEdit = (todo) => {
    setForm({
      title: todo.title,
      description: todo.description
    });
    setEditMode(true);
    setEditId(todo.id);
  };

  const cancelEdit = () => {
    setForm({ title: "", description: "" });
    setEditMode(false);
    setEditId(null);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-bold text-xl">Todo App</div>
            <div className="flex items-center space-x-4">ICON</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {editMode ? "Edit Todo" : "Add Todo"}
          </h2>
          
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="grid grid-cols-1 gap-4 mb-6"> 
              <input
                type="text"
                placeholder="Title"
                className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              <textarea
                placeholder="Description"
                className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full min-h-[100px]"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 text-white rounded-md shadow-sm transition-colors duration-200 cursor-pointer"
              >
                {editMode ? "Update" : "Add"}
              </button>
              
              {editMode && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="bg-gray-500 hover:bg-gray-600 px-6 py-2 text-white rounded-md shadow-sm transition-colors duration-200 cursor-pointer"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* Todo List */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Todo List</h2>
            
            {todos.length === 0 ? (
              <p className="text-gray-500 text-center">No todos found. Add one above!</p>
            ) : (
              <div className="space-y-4 max-w-2xl mx-auto">
                {todos.map((todo) => (
                  <div 
                    key={todo.id} 
                    className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg text-gray-800 mb-1">{todo.title}</h4>
                        <p className="text-gray-600">{todo.description}</p>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => handleEdit(todo)}
                          className="text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors"
                          title="Edit"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </button>
                        
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Todo App. Build with Spring Boot and React.
        </div>
      </footer>
    </div>
  );
}

export default App;