package project.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import project.persistence.repository.ScoreRepository;
import project.persistence.repository.UserRepository;
import project.service.ScoreService;
import project.service.UserService;


@Configuration
@EnableJpaRepositories(basePackages = "project.persistence.repository")
public class AppConfig {
}
