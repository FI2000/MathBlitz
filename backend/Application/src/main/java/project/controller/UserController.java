package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.persistence.model.UserProfile;
import project.service.UserService;

import java.util.Optional;

@RestController
@RequestMapping("/api/player")
public class UserController {

    private final UserService service;

    @Autowired
    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public void registerUser(@RequestBody UserProfile userProfile) {
        System.out.println("Here register");
        service.registerUser(userProfile);
    }

    @GetMapping("/{userId}/profile")
    public ResponseEntity<?> getUser(@PathVariable Long userId) {
        System.out.println("Player id retrieved - " + userId);
        Optional<UserProfile> userProfile = service.getUser(userId);

        if (userProfile.isPresent()) {
            return ResponseEntity.ok(userProfile.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
