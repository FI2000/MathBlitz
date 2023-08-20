package project.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import project.persistence.model.UserProfile;
import project.persistence.repository.UserRepository;

import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void registerUser(String username, String password) {
        UserProfile userProfile = new UserProfile();
        userProfile.setUserPassword(encoder.encode(password));
        userProfile.setUserName(username);
        this.userRepository.save(userProfile);
    }

    public Optional<UserProfile> getUser(String username, String password) {
        Optional<UserProfile> user = userRepository.findByUserName(username);
        if (user.isPresent() && isValidLogin(user.get().getUserPassword(), password)) {
            return user;
        }
        return Optional.empty();
    }

    private boolean isValidLogin(String hashedPassword, String plainPassword) {
        if (!Objects.isNull(plainPassword)) {
            return encoder.matches(plainPassword, hashedPassword);
        }
        return false;
    }
}
