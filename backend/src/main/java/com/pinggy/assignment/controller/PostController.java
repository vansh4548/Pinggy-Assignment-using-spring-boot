package com.pinggy.assignment.controller;

import com.pinggy.assignment.dto.PostRequest;
import com.pinggy.assignment.dto.PostResponse;
import com.pinggy.assignment.filter.AuthFilter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class PostController {

    private static final List<PostResponse> posts = new ArrayList<>();

    @PostMapping("/post")
    public ResponseEntity<Map<String, Object>> createPost(@RequestBody PostRequest request) {
        String authValue = AuthFilter.authHeader.get();
        PostResponse newPost = new PostResponse(request.getTitle(), request.getBody(), authValue);
        posts.add(newPost);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Post created successfully");
        response.put("post", newPost);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/list")
    public ResponseEntity<List<PostResponse>> getAllPosts() {
        return ResponseEntity.ok(posts);
    }
}