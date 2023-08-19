package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.persistence.model.UserProfile;
import project.service.UserService;

import java.util.UUID;

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
        service.registerUser(userProfile);
    }

    @GetMapping("/{playerId}/profile")
    public UserProfile getUser(@PathVariable UUID userId) {
        return service.getUser(userId).get();
    }

}
