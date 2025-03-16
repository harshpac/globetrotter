package org.example.globetrotter.models;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NewGame {
  private String gameId;
  private List<String> clues;
  private List<String> options;
}
