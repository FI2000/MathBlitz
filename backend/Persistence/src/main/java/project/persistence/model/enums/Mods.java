package project.persistence.model.enums;

import lombok.Getter;

@Getter
public enum Mods {
    None("None"), Memory("Memory"), PeekABoo("Peek-A-Boo");

    private final String identifier;

    Mods(String identifier) {
        this.identifier = identifier;
    }
}
