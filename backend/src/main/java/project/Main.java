package project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import project.configuration.AppConfig;
import project.configuration.CorsConfig;

@SpringBootApplication
@Import({AppConfig.class, CorsConfig.class})
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}
