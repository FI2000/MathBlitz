package project.persistence.model.enums;

import lombok.Getter;

@Getter
public enum Difficulty {
    Normal("Normal"), Hard("Hard"), Extreme("Extreme");

    private final String name;

    Difficulty(String name) {
        this.name = name;
    }
}
