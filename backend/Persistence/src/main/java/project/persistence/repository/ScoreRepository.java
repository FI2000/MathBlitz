package project.persistence.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import project.persistence.model.Score;

import java.util.List;

public interface ScoreRepository extends CrudRepository<Score, Long> {
    @Transactional
    @Query(value = "SELECT SUM(score_points) FROM score WHERE score_user_id = :user_id ;", nativeQuery = true)
    Integer getTotalUserScore(@Param("user_id") Long userId);

    @Query("SELECT s FROM Score s WHERE s.userId = :user_id ORDER BY s.scorePoints DESC")
    List<Score> findTop25UserScoresOrderByScoreDesc(@Param("user_id") Long userId);
}
