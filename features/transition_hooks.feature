Feature: Provide hooks into the transitions between views

  Scenario: Provide a hook when leaving a transition which allows the transition
    Given an initial view called "viewOne"
    And "viewOne" has a "leaving" transition hook called "allowed-leaving"
    And a view called "viewTwo"
    When transition is started using "viewOne" as the starting view
    And a view transition is requested to "viewTwo"
    Then template should be set to "viewTwo"
    And model for "viewTwo" should be active
    And calls should include "leaving"
    And allow callback on toView should have been called "1" times

 Scenario: Provide a hook when leaving a transition which denies the transition with no context
    Given an initial view called "viewOne"
    And "viewOne" has a "leaving" transition hook called "denied-leaving"
    And a view called "viewTwo"
    When transition is started using "viewOne" as the starting view
    And a view transition is requested to "viewTwo"
    Then template should be set to "viewOne"
    And model for "viewOne" should be active
    And calls should include "leaving"
    And denied callback on toView should have been called "1" times
    And last denied callback should have no reason

  Scenario: Provide a hook when leaving a transition which denies the transition with a context
    Given an initial view called "viewOne"
    And "viewOne" has a "leaving" transition hook called "denied-leaving-with-reason"
    And a view called "viewTwo"
    When transition is started using "viewOne" as the starting view
    And a view transition is requested to "viewTwo"
    Then template should be set to "viewOne"
    And model for "viewOne" should be active
    And calls should include "leaving"
    And denied callback on toView should have been called "1" times
    And last denied callback should have "denied-leaving-reason" reason

  Scenario: Provide a hook when a transition is left
    Given an initial view called "viewOne"
    And "viewOne" has a "left" transition hook called "left-notification"
    And a view called "viewTwo"
    When transition is started using "viewOne" as the starting view
    And a view transition is requested to "viewTwo"
    Then template should be set to "viewTwo"
    And model for "viewTwo" should be active
    And calls should include "left"

  Scenario: Provide a hook when entering a transition which allows the transition
    Given an initial view called "viewOne"
    And a view called "viewTwo"
    And "viewTwo" has a "entering" transition hook called "allowed-entering"
    When transition is started using "viewOne" as the starting view
    And a view transition is requested to "viewTwo"
    Then template should be set to "viewTwo"
    And model for "viewTwo" should be active
    And calls should include "entering"
    And allow callback on toView should have been called "1" times

  Scenario: Provide a hook when entering a transition which denies the transition with no context
    Given an initial view called "viewOne"
    And a view called "viewTwo"
    And "viewTwo" has a "entering" transition hook called "denied-entering"
    When transition is started using "viewOne" as the starting view
    And a view transition is requested to "viewTwo"
    Then template should be set to "viewOne"
    And model for "viewOne" should be active
    And calls should include "entering"
    And denied callback on toView should have been called "1" times
    And last denied callback should have no reason

  Scenario: Provide a hook when entering a transition which denies the transition with a context
    Given an initial view called "viewOne"
    And a view called "viewTwo"
    And "viewTwo" has a "entering" transition hook called "denied-entering-with-reason"
    When transition is started using "viewOne" as the starting view
    And a view transition is requested to "viewTwo"
    Then template should be set to "viewOne"
    And model for "viewOne" should be active
    And calls should include "entering"
    And denied callback on toView should have been called "1" times
    And last denied callback should have "denied-entering-reason" reason

  Scenario: Provide a hook when a transition is entered
    Given an initial view called "viewOne"
    And a view called "viewTwo"
    And "viewTwo" has a "entered" transition hook called "entered-notification"
    When transition is started using "viewOne" as the starting view
    And a view transition is requested to "viewTwo"
    Then template should be set to "viewTwo"
    And model for "viewTwo" should be active
    And calls should include "entered"
