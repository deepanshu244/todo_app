package com.deepanshu.todo_app.repositiory;

import com.deepanshu.todo_app.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepositiory extends JpaRepository<Todo,Long> {

}
