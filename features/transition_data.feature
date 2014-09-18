Feature: Allow data to be transferred to a view during transition

  Scenario: Allow data to be included in view transition
    Given an initial view called "viewOne"
    And a view called "viewTwo"
    And "viewTwo" has a "entered" transition hook called "entered-notification"
    When transition is started using "viewOne" as the starting view
    Then template should be set to "viewOne"
    And model for "viewOne" should be active
    And a view transition is requested to "viewTwo" passing "view-data"
    And template should be set to "viewTwo"
    And model for "viewTwo" should be active
    And "viewTwo" should have received "view-data" during the transition
