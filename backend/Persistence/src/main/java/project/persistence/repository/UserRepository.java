package project.persistence.repository;

import org.springframework.data.repository.CrudRepository;
import project.persistence.model.Score;
import project.persistence.model.UserProfile;

import java.util.List;
import java.util.UUID;

public interface UserRepository extends CrudRepository<UserProfile, UUID> {

}
