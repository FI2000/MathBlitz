package project.persistence.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import project.persistence.model.UserProfile;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends CrudRepository<UserProfile, Long> {
    Optional<UserProfile> findByUserName(String userName);

    @Transactional
    @Modifying
    @Query("UPDATE UserProfile u SET u.totalScore = :total_score WHERE u.id = :user_id")
        //this is JPQL -> we dont update the names of the table , we update the object model
    void sumUserScore(@Param("total_score") Integer userTotalScore, @Param("user_id") Long userId);

    @Query("SELECT u FROM UserProfile u ORDER BY u.totalScore DESC")
    List<UserProfile> findTop25UsersOrderByTotalScoreDesc();

}
