package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.persistence.model.Score;
import project.service.ScoreService;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/score")
public class ScoreController {

    private final ScoreService service;

    @Autowired
    public ScoreController(ScoreService service) {
        this.service = service;
    }

    @PostMapping("/submit")
    public void postPlayerScore(@RequestBody Score playerScore) {
        service.postUserScore(playerScore);
    }

}
