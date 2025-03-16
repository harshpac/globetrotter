package org.example.globetrotter.core;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class City {
  private String city;
  private String country;
  private List<String> clues;
  private List<String> fun_fact;
  private List<String> trivia;
  private List<String> wrongAnswers;
}
