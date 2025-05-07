package com.dynac.plantation.service;

import com.dynac.plantation.exception.ResourceNotFoundException;
import com.dynac.plantation.model.Comment;
import com.dynac.plantation.model.Post;
import com.dynac.plantation.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public List<Post> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc();
    }

    public Post getPostById(String id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + id));
    }

    public Post createPost(Post post) {
        post.setCreatedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());
        return postRepository.save(post);
    }

    public Post incrementLike(String postId, String userId) {
        Post post = getPostById(postId);
        if (!post.getLikes().contains(userId)) {
            post.getLikes().add(userId);
            post.setUpdatedAt(LocalDateTime.now());
            postRepository.save(post);
        }
        return post;
    }

    public Post addComment(String postId, Comment comment) {
        Post post = getPostById(postId);
        comment.setId(UUID.randomUUID().toString());
        comment.setCreatedAt(LocalDateTime.now());
        post.getComments().add(comment);
        post.setUpdatedAt(LocalDateTime.now());
        return postRepository.save(post);
    }

    public void deletePost(String id) {
        if (!postRepository.existsById(id)) {
            throw new ResourceNotFoundException("Post not found");
        }
        postRepository.deleteById(id); // Use deleteById instead of delete
    }

    @Transactional
    public Post updatePost(String id, Post postDetails) {
        return postRepository.findById(id)
                .map(existingPost -> {
                    if (postDetails.getTitle() != null) {
                        existingPost.setTitle(postDetails.getTitle());
                    }
                    if (postDetails.getDescription() != null) {
                        existingPost.setDescription(postDetails.getDescription());
                    }
                    if (postDetails.getImage() != null) {
                        existingPost.setImage(postDetails.getImage());
                    }
                    existingPost.setUpdatedAt(LocalDateTime.now());
                    return postRepository.save(existingPost);
                })
                .orElseThrow(() -> new ResourceNotFoundException("Post not found"));
    }
}
