package org.example.globetrotter.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AnswerResult {
  private boolean correct;
  private String funFact;
  private String trivia;
  private String correctAnswer;
}
