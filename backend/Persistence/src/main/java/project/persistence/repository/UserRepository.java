package project.persistence.repository;

import org.springframework.data.repository.CrudRepository;
import project.persistence.model.UserProfile;

import java.util.Optional;

public interface UserRepository extends CrudRepository<UserProfile, Long> {
    Optional<UserProfile> findByUserName(String userName);
}
