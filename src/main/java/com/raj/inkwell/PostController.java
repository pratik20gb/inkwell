package com.raj.inkwell;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    private final List<Post> posts = new ArrayList<>();
    private final AtomicLong idCounter = new AtomicLong(3);

    public PostController() {
        posts.add(new Post(1L, "My first post", "Hello, this is my first blog post."));
        posts.add(new Post(2L, "first post", "this is my first post."));
        posts.add(new Post(3L, "second post by me", "this is my second post."));
    }

    private Post findPostById(Long id) {
        for (Post post : posts) {
            if (post.getId().equals(id)) {
                return post;
            }
        }
        return null;
    }

    @GetMapping
    public List<Post> getAllPosts() {
        return posts;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        Post post = findPostById(id);
        if (post == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(post);
    }

    @PostMapping
    public ResponseEntity<Post> createPost(@Valid @RequestBody PostRequest request) {
        Post post = new Post(idCounter.incrementAndGet(), request.title(), request.content());
        posts.add(post);
        return ResponseEntity.status(HttpStatus.CREATED).body(post);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @Valid @RequestBody PostRequest request) {
        Post post = findPostById(id);
        if (post == null) {
            return ResponseEntity.notFound().build();
        }
        post.setTitle(request.title());
        post.setContent(request.content());
        return ResponseEntity.ok(post);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        Post post = findPostById(id);
        if (post == null) {
            return ResponseEntity.notFound().build();
        }
        posts.remove(post);
        return ResponseEntity.noContent().build();
    }
}