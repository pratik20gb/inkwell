package com.raj.inkwell;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    private final List<Post> posts = new ArrayList<>();
    private final AtomicLong idCounter = new AtomicLong(2);

    public PostController() {
        posts.add(new Post(1L, "My first post", "Hello, this is my first blog post."));
        posts.add(new Post(2L, "first post", "this is my first post."));
        posts.add(new Post(3L,"second post by me","this is my second post."));

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

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody CreatePostRequest request) {
        Post post = new Post(idCounter.incrementAndGet(),request.title(),request.content());
        posts.add(post);
        return ResponseEntity.status(HttpStatus.CREATED).body(post);
    }
}
