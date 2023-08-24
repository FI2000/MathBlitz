package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.service.UserService;

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
        return service.registerUser(username, password);
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUser(@RequestParam("username") String username, @RequestParam("password") String password) {
        return service.getUser(username, password);
    }

    @GetMapping("/top")
    public ResponseEntity<?> getTopUsers() {
        return service.getTopTotalScores();
    }

    @GetMapping("/total")
    public ResponseEntity<?> getUserTotalScore(@RequestParam("userId") Integer userId) {
        return service.getUserTotalScores(userId.longValue());
    }

}
