package project.service;

import org.springframework.stereotype.Service;
import project.persistence.model.UserProfile;
import project.persistence.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void registerUser(UserProfile userProfile) {
        this.userRepository.save(userProfile);
    }

    public Optional<UserProfile> getUser(Long userId) {
        return this.userRepository.findById(userId);
    }

}
