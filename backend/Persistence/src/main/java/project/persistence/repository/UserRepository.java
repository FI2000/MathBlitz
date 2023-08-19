package project.persistence.repository;

import org.springframework.data.repository.CrudRepository;
import project.persistence.model.UserProfile;

public interface UserRepository extends CrudRepository<UserProfile, Long> {

}
