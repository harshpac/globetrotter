package org.example.globetrotter.service;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import org.example.globetrotter.models.ChallengeInvite;
import org.example.globetrotter.models.UserProfile;

public class ChallengeService {
  private Map<String, ChallengeInvite> invites = new ConcurrentHashMap<>();
  private final UserService userService;
  private final GameService gameService;

  public ChallengeService(UserService userService, GameService gameService) {
    this.userService = userService;
    this.gameService = gameService;
  }

  public ChallengeInvite createChallenge(String inviterId) {
    UserProfile inviter = userService.getUserById(inviterId);
    if (inviter == null) throw new IllegalArgumentException("Invalid user");

    String inviteId = UUID.randomUUID().toString();
    ChallengeInvite invite = new ChallengeInvite(
        inviteId, inviterId, inviter.getUsername(), inviter.getScore(),
        gameService.generateNewGame()
    );
    invites.put(inviteId, invite);
    return invite;
  }

  public ChallengeInvite createNewGameForChallenge(String inviterId) {
    var invite = invites.getOrDefault(inviterId, null);

    if (invite == null) throw new IllegalArgumentException("Invalid invite");
    return ChallengeInvite.builder()
        .newGame(gameService.generateNewGame())
        .build();
  }

}
