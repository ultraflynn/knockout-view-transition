Feature: Allow data to be transferred to a view during start up

  Scenario: Allow data to be included in initial start up
    Given an initial view called "viewOne"
    And "viewOne" has a "entered" transition hook called "entered-notification"
    When transition is started using "viewOne" as the starting view passing "view-data"
    Then template should be set to "viewOne"
    And model for "viewOne" should be active
    And "viewOne" should have received "view-data" during the transition
