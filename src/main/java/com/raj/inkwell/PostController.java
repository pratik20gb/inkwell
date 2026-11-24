package com.raj.inkwell;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    private final List<Post> posts = new ArrayList<>();

    public PostController() {
        posts.add(new Post(1L, "My first post", "Hello, this is my first blog post.","raj"));
        posts.add(new Post(2L, "first post", "this is my first post.","pratik"));
        posts.add(new Post(3L,"second post by me","this is my second post.","raj"));

    }
    @GetMapping
    public List<Post> getContent() {
        return posts;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getContent(@PathVariable Long id) {
        for(Post post:posts){
            if(post.getId().equals(id)){
                return ResponseEntity.ok(post);
            }
        }
        return ResponseEntity.notFound().build();
    }
}
