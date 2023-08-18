package project.services;

import project.persistence.model.Score;
import project.persistence.repository.ScoreRepository;

import java.util.Optional;


public class HttpService {

    private final ScoreRepository repository;

    public HttpService(ScoreRepository repository) {
        this.repository = repository;
    }

    public Optional<Score> getRecord(){
        return repository.findById(4L);
    }
}
