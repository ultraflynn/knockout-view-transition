Feature: Allow views to be configured which flow linearly

  Scenario: Configure two linear views and start using the first
    Given an initial view called "viewOne"
    And a view called "viewTwo"
    When transition is started using "viewOne" as the starting view
    Then template should be set to "viewOne"
    And model for "viewOne" should be active

  Scenario: Transition from one view to another
    Given an initial view called "viewOne"
    And a view called "viewTwo"
    When transition is started using "viewOne" as the starting view
    Then template should be set to "viewOne"
    And model for "viewOne" should be active
    Then a view transition is requested to "viewTwo"
    And template should be set to "viewTwo"
    And model for "viewTwo" should be active
