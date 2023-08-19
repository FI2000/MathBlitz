package project.service;

import org.springframework.stereotype.Service;
import project.persistence.model.Score;
import project.persistence.repository.ScoreRepository;

import java.util.List;
import java.util.UUID;

@Service
public class ScoreService {

    private final ScoreRepository scoreRepository;

    public ScoreService(ScoreRepository scoreRepository) {
        this.scoreRepository = scoreRepository;
    }

    public void postUserScore(Score userScore){
        scoreRepository.save(userScore);
    }


}
