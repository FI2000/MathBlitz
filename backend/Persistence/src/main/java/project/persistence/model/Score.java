package project.persistence.model;

import jakarta.persistence.*;
import lombok.Data;
import project.persistence.model.enums.Mods;

import java.util.List;
import java.util.UUID;

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
    private Long scorePoints;

    @ElementCollection(targetClass = Mods.class)
    @Enumerated(EnumType.STRING)
    @Column(name = "score_mods")
    private List<Mods> scoreMods;

    @Column(name = "score_user_id")
    private Long userId;
}
