package project.persistence.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TotalScoreBody {
    private String userName;
    private Long totalScore;
}
