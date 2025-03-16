package org.example.globetrotter.service;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import org.example.globetrotter.models.UserProfile;

public class UserService {
  private Map<String, UserProfile> users = new ConcurrentHashMap<>();

  public UserProfile registerUser(String username) {
    String userId = UUID.randomUUID().toString();
    UserProfile user = new UserProfile(userId, username, 0, 0);
    users.put(userId, user);
    return user;
  }

  public UserProfile getUserById(String userId) {
    return users.getOrDefault(userId, null);
  }

  public void updateScore(String userId, int score, int totalCount) {
    UserProfile user = users.get(userId);
    if (user != null) {
      user.setScore(score);
      user.setTotalGames(totalCount);
    }
  }
}
