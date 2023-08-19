package project.persistence.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "user_name")
    private String userName;

    @Column(name= "user_password", nullable = false)
    private String userPassword;

    @Column(name="user_total_score", nullable = false)
    private Long totalScore;

    @OneToMany
    @JoinColumn(name = "score_user_id",referencedColumnName = "user_id")
    private List<Score> userScores;

}
