package org.example.globetrotter.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import javassist.NotFoundException;
import org.example.globetrotter.models.AnswerRequest;
import org.example.globetrotter.models.AnswerResult;
import org.example.globetrotter.models.NewGame;
import org.example.globetrotter.core.City;

import java.io.IOException;
import java.util.*;

public class GameService {
  private final List<City> availableCitiesData;
  private final Map<String, City> activeGames = new HashMap<>();
  private final UserService userService;

  public GameService(UserService userService) throws IOException {
    // Loading destinations from JSON file
    final var mapper = new ObjectMapper();
    this.userService = userService;
    final var inputStream = getClass().getClassLoader().getResourceAsStream("destinations.json");
    this.availableCitiesData = mapper.readValue(inputStream, new TypeReference<List<City>>() {});
  }

  public NewGame generateNewGame() {
    final var chosen = availableCitiesData.get(new Random().nextInt(availableCitiesData.size()));
    final var clues = chosen.getClues().subList(0, Math.min(2, chosen.getClues().size()));
    final var options = new ArrayList<>(chosen.getWrongAnswers());
    options.add(chosen.getCity());
    Collections.shuffle(options);

    final var gameId = UUID.randomUUID().toString();
    activeGames.put(gameId, chosen);

    return new NewGame(gameId, clues, options);
  }

  public AnswerResult validateAnswer(AnswerRequest request) throws NotFoundException {
    final var city = activeGames.get(request.getGameId());
    final var correct = city.getCity().equalsIgnoreCase(request.getUserAnswer());

    final var funFact = city.getFun_fact().get(new Random().nextInt(city.getFun_fact().size()));
    final var trivia = city.getTrivia().get(new Random().nextInt(city.getTrivia().size()));

    activeGames.remove(request.getGameId()); // End game
    final var userProfile = userService.getUserById(request.getUserId());
    if(userProfile == null) {
      throw new NotFoundException("User not found");
    }
    int score = userProfile.getScore();
    if(correct) {
      score++;
    }
    userService.updateScore(request.getUserId(), score, userProfile.getTotalGames() + 1);
    return new AnswerResult(correct, funFact, trivia, city.getCity());
  }
}
