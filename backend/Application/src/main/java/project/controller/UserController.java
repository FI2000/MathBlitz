package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.persistence.model.UserProfile;
import project.service.UserService;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService service;

    @Autowired
    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestParam("username") String username, @RequestParam("password") String password) {
        service.registerUser(username, password);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUser(@RequestParam("username") String username, @RequestParam("password") String password) {
        Optional<UserProfile> userProfile = service.getUser(username, password);
        if (userProfile.isPresent()) {
            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("id", userProfile.get().getId());
            responseBody.put("username", userProfile.get().getUserName());

            return ResponseEntity.ok(responseBody);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
