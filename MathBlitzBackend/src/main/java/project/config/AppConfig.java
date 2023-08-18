package project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import project.persistence.repository.ScoreRepository;
import project.services.HttpService;

@Configuration
@EnableJpaRepositories(basePackages = "project.persistence.repository")
public class AppConfig {

    private final ScoreRepository scoreRepository;

    public AppConfig(ScoreRepository scoreRepository) {
        this.scoreRepository = scoreRepository;
    }

    @Bean
    public HttpService httpService() {
        return new HttpService(scoreRepository);
    }
}
