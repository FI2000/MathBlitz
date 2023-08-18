package project.persistence.model;

import jakarta.persistence.*;
import lombok.Data;
import project.persistence.model.enums.Mods;

import java.util.List;

@Entity
@Data
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Makes them generated in a sequential way
    private long scoreId;
    private Integer scoreStreak;
    private Double scorePoints;
    @ElementCollection(targetClass = Mods.class) //The class in the list to follow
    @Enumerated(EnumType.STRING) //How they should be stored in the database
    private List<Mods> scoreMods;

}
