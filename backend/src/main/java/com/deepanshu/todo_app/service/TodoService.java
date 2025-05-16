package com.deepanshu.todo_app.service;

import com.deepanshu.todo_app.model.Todo;
import com.deepanshu.todo_app.repositiory.TodoRepositiory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {
    @Autowired
  private final   TodoRepositiory todoRepositiory;

    public TodoService(TodoRepositiory todoRepositiory) {
        this.todoRepositiory = todoRepositiory;
    }

    public List<Todo> getAllTodos() {
        return todoRepositiory.findAll();
    }

    public Todo addTodo(Todo todo) {
       return todoRepositiory.save(todo);
    }

    public void deleteTodo(Long id) {
        todoRepositiory.deleteById(id);
    }


    public Todo updateTodo(Long id, Todo todo) {
        Optional<Todo> todo1 =todoRepositiory.findById(id);
        if(todo1.isPresent()){
            Todo existingTodo = todo1.get();
            if(todo.getTitle() != null) {
                existingTodo.setTitle(todo.getTitle());
            }
            if(todo.getDescription() != null) {
                existingTodo.setDescription(todo.getDescription());
            }
            return todoRepositiory.save(existingTodo);
        }
        else return null;
    }
}
