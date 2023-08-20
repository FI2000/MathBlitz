package project.persistence.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;

@Entity
@Data
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "randomLongIdGenerator")
    @Column(name = "user_id")
    private Long id;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "user_password", nullable = false)
    private String userPassword;

    @Column(name = "user_total_score", columnDefinition = "BIGINT DEFAULT 0")
    private Long totalScore = 0L;

    @CreationTimestamp
    @Temporal(TemporalType.DATE)
    @Column(name = "user_creation_date", nullable = false)
    private Date creationDate;

    @OneToMany
    @JoinColumn(name = "score_user_id", referencedColumnName = "user_id")
    private List<Score> userScores;

    @Builder
    public UserProfile() {
    }
}
