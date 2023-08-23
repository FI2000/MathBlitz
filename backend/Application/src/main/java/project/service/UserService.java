package project.service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import project.persistence.model.TotalScoreBody;
import project.persistence.model.UserProfile;
import project.persistence.repository.UserRepository;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    private Set<String> unauthorizedUsernames;

    public UserService(UserRepository userRepository) {
        loadUnauthorizedUsernames();
        this.userRepository = userRepository;
    }

    public ResponseEntity<?> registerUser(String username, String password) {
        if (userRepository.findByUserName(username).isPresent()) {
            return ResponseEntity.badRequest().body("Username already taken.");
        }
        if (!isUserAuthorized(username)) {
            return ResponseEntity.badRequest().body("Inappropriate username.");
        }

        UserProfile userProfile = new UserProfile();
        userProfile.setUserPassword(encoder.encode(password));
        userProfile.setUserName(username);
        this.userRepository.save(userProfile);
        return ResponseEntity.ok().build();
    }

    public Optional<UserProfile> getUser(String username, String password) {
        Optional<UserProfile> user = userRepository.findByUserName(username);
        if (user.isPresent() && isValidLogin(user.get().getUserPassword(), password)) {
            return user;
        }
        return Optional.empty();
    }

    public void sumUserScore(Integer totalScore, Long userId) {
        userRepository.sumUserScore(totalScore, userId);
    }

    public ResponseEntity<?> getTopTotalScores() {
        try {
            List<TotalScoreBody> requestBody = new ArrayList<>();
            for (UserProfile userProfile : userRepository.findTop25UsersOrderByTotalScoreDesc()) {
                requestBody.add(TotalScoreBody.builder().userName(userProfile.getUserName()).totalScore(userProfile.getTotalScore()).build());
            }
            return ResponseEntity.ok(requestBody);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity<?> getUserTotalScores(Long id) {
        try {
            Optional<UserProfile> userProfile = userRepository.findById(id);
            if (userProfile.isPresent()) {
                return ResponseEntity.ok(TotalScoreBody.builder().userName(userProfile.get().getUserName()).totalScore(userProfile.get().getTotalScore()).build());
            } else {
                return ResponseEntity.badRequest().build();
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private boolean isValidLogin(String hashedPassword, String plainPassword) {
        if (!Objects.isNull(plainPassword)) {
            return encoder.matches(plainPassword, hashedPassword);
        }
        return false;
    }

    public boolean isUserAuthorized(String username) {
        for (String unauthorizedUsername : unauthorizedUsernames) {
            if (username.contains(unauthorizedUsername)) {
                return false;
            }
        }
        return true;
    }

    private void loadUnauthorizedUsernames() {
        unauthorizedUsernames = new HashSet<>();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(new ClassPathResource("unauthorized-users.txt").getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                unauthorizedUsernames.add(line.trim());
            }
        } catch (IOException e) {
            System.err.println(e.getMessage());
        }
    }
}
