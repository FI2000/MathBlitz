package project.persistence.repository;

import org.springframework.data.repository.CrudRepository;
import project.persistence.model.Score;

import java.util.List;
import java.util.UUID;

public interface ScoreRepository extends CrudRepository<Score, Long> {
}
