package com.raj.inkwell;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
private final PostRepository postRepository;
public PostService(PostRepository postRepository) {
	this.postRepository = postRepository;
}
public List<Post> getAllPosts() {
	return postRepository.findAll();
}
public Post getPostById(Long id) {
    return postRepository.findById(id);
}
public Post createPost(PostRequest request) {
    return postRepository.create(request.title(), request.content());
}
public Post updatePost(Long id,PostRequest request) {
    Post post = postRepository.findById(id);
    if(post==null) {
        return null;
    }
    post.setTitle(request.title());
    post.setContent(request.content());
    return post;
}

public boolean deletePost(Long id) {
    Post post = postRepository.findById(id);
    if(post==null) {
        return false;
    }
    postRepository.delete(post);
    return true;
}
}
