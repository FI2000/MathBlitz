package project.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import project.persistence.model.Score;
import project.persistence.model.enums.Mods;
import project.persistence.repository.ScoreRepository;

import java.util.Map;
import java.util.Objects;

@Service
public class ScoreService {
    private final ScoreRepository scoreRepository;
    private final UserService userService;

    public ScoreService(ScoreRepository scoreRepository, UserService userService) {
        this.scoreRepository = scoreRepository;
        this.userService = userService;
    }

    public ResponseEntity<?> postUserScore(Map<String, Object> requestBody) {
        Score userScore = new Score();
        Long userId = ((Integer) requestBody.get("userId")).longValue();
        userScore.setUserId(userId);
        userScore.setUsername(Objects.requireNonNull(requestBody.get("username")).toString());
        userScore.setScoreStreak(Objects.requireNonNull((Integer) requestBody.get("scoreStreak")));
        userScore.setScoreMod(Objects.requireNonNull(Mods.valueOf(requestBody.get("scoreMod").toString())));
        userScore.setScorePoints(Objects.requireNonNull((Integer) requestBody.get("scorePoints")));
        try {
            saveScoreAndSumUserScore(userScore, userId);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> getTopLocalUserScores(Long id) {
        try {
            return ResponseEntity.ok(scoreRepository.findTop25UserScoresOrderByScoreDesc(id));

        } catch (Exception e) {
            System.err.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    private void saveScoreAndSumUserScore(Score userScore, Long userId) {
        scoreRepository.save(userScore);
        Integer totalUserScore = scoreRepository.getTotalUserScore(userId);
        userService.sumUserScore(totalUserScore, userId);
    }

}
