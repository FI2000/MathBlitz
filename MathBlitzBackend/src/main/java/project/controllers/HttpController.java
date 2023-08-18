package project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.persistence.model.Score;
import project.services.HttpService;

@RestController
@RequestMapping("/api")
public class HttpController {

    private final HttpService service;

    @Autowired
    public HttpController(HttpService service) {
        this.service = service;
    }

    @GetMapping("/top")
    public void getTopScores() {
        System.out.println(service.getRecord().get());
    }

    @GetMapping("/top/json")
    public Score getTopJSONScores() {
        Score score = service.getRecord().get();
        System.out.println(score);
        return service.getRecord().get();
    }
}
