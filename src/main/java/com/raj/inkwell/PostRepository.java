package com.raj.inkwell;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class PostRepository {
    private final List<Post> posts = new ArrayList<>();
    private final AtomicLong idCounter = new AtomicLong();

    public PostRepository() {
        posts.add(new Post(2L, "first post", "this is my first post."));
        posts.add(new Post(3L, "second post", "this is my second post."));
        posts.add(new Post(4L, "third post", "this is my third post."));
    }

    public List<Post> findAll(){
        return posts;
    }
    public Post findById(Long id) {
        for (Post post : posts) {
            if (post.getId().equals(id)) {
                return post;
            }
        }
        return null;
    }
    public Post create(String title, String content) {
        Post post = new Post(idCounter.incrementAndGet(), title, content);
        posts.add(post);
        return post;
    }
    public void delete(Post post) {
        posts.remove(post);
    }
}
