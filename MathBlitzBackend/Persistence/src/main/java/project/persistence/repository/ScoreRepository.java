package project.persistence.repository;

import org.springframework.data.repository.CrudRepository;
import project.persistence.model.Score;

public interface ScoreRepository extends CrudRepository<Score, Long> {
}
