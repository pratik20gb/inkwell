package com.raj.inkwell;


import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController{
private final PostService postService;
public PostController(PostService postService){
    this.postService = postService;
}

@GetMapping
public List<Post> getAllPosts(){
    return postService.getAllPosts();
}

@GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id){
    Post post = postService.getPostById(id);
    if(post == null){
        return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(post);
}

@PostMapping
public ResponseEntity<Post> createPost(@Valid @RequestBody PostRequest request){
    Post post =  postService.createPost(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(post);
}

@PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @Valid @RequestBody PostRequest request){
    Post post = postService.updatePost(id, request);
    if(post == null){
        return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(post);
}

@DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id){
    boolean deleted = postService.deletePost(id);
    if(!deleted){
        return ResponseEntity.notFound().build();
    }
    return ResponseEntity.noContent().build();
}

}