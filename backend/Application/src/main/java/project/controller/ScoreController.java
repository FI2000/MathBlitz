package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.service.ScoreService;

import java.util.Map;


@RestController
@RequestMapping("/api/score")
public class ScoreController {

    private final ScoreService service;

    @Autowired
    public ScoreController(ScoreService service) {
        this.service = service;
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submitUserScore(@RequestBody Map<String, Object> requestBody) {
        return service.postUserScore(requestBody);
    }

    @GetMapping("/local")
    public ResponseEntity<?> submitUserScore(@RequestParam("userId") Integer userId) {
        return service.getTopLocalUserScores(userId.longValue());
    }
}
