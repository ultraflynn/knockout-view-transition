Feature: Register a configuration which controls the model view that Knockout uses
  In order to start Knockout with a view configuration
  As a knockout website developer
  I want to define a configuration and have determine the view configuration that Knockout uses

  Scenario: Single view step definition
    Given a configuration that has one view:
      """
      TODO Define the configuration here
      """
    When knockout-view-transition is started
    Then Knockout is set up with that view
