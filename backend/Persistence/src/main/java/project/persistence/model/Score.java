package project.persistence.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import project.persistence.model.enums.Mods;

import java.util.Date;

@Entity
@Data
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "score_id")
    private long scoreId;

    @Column(name = "score_streak")
    private Integer scoreStreak;

    @Column(name = "score_points")
    private Integer scorePoints;

    @Enumerated(EnumType.STRING)
    @Column(name = "score_mod")
    private Mods scoreMod;

    @CreationTimestamp
    @Temporal(TemporalType.DATE)
    @Column(name = "score_creation_date", nullable = false)
    private Date creationDate;

    @Column(name = "score_user_id")
    private Long userId;

    @Column(name = "score_user_name")
    private String username;

}
