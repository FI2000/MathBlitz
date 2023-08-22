package project.persistence.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import project.persistence.model.Score;

public interface ScoreRepository extends CrudRepository<Score, Long> {
    @Transactional
    @Query(value = "SELECT SUM(score_points) FROM score WHERE score_user_id = :user_id ;", nativeQuery = true)
    Integer getTotalUserScore(@Param("user_id") Long userId);
}
