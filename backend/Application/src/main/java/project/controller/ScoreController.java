package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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

}
