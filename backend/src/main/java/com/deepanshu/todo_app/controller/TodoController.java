package com.deepanshu.todo_app.controller;

import com.deepanshu.todo_app.model.Todo;
import com.deepanshu.todo_app.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/todo")
public class TodoController {

    @Autowired
   private final TodoService todoService;



    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public List<Todo> getAllTodo(){
        return todoService.getAllTodos();
    }

    @PostMapping
    public ResponseEntity<?> addTodo(@RequestBody Todo todo){
    if(todo.getDescription()==null|| todo.getTitle()==null){
        return ResponseEntity.badRequest().body("Field cannpt be empty");
    }
    Todo todo1=todoService.addTodo(todo);
    return ResponseEntity.status(HttpStatus.CREATED).body(todo1);
    }

    @DeleteMapping("{id}")
    public void deleteTodo(@PathVariable Long id){
        todoService.deleteTodo(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateTodo(
            @PathVariable Long id,  // Changed from @RequestParam to @PathVariable
            @RequestBody Todo todo) {

        try {
            Todo updatedTodo = todoService.updateTodo(id, todo);

            if (updatedTodo == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Todo with ID " + id + " not found");
            }

            return ResponseEntity.ok(updatedTodo);

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Error updating todo: " + e.getMessage());
        }
    }
}
