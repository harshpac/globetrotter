package org.example.globetrotter.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserProfile {
  private String userId;
  private String username;
  private int score;
  private int totalGames;
}
