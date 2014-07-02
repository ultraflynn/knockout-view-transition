Feature: Allow views to be configured which flow linearly

  Scenario: Configure two linear views and start using the first
    Given a view called "viewOne" which transitions to "viewTwo":
    """
    model: {
      field_one: "Field One",
      switchToViewTwo: function () {
        transition.toView("viewTwo");
      }
    }
    """
    And a view called "viewTwo" which does not transition:
    """
    model: {
      field_two: "Field Two"
    }
    """
    When transition is started using "viewOne" as the starting view
    Then template should be set to "viewOne"
    And model should be set to "viewOne"

  Scenario: Transition from one view to another
 ;   Given a view called "viewOne" which transitions to "viewTwo":
    """
    model: {
      field_one: "Field One",
      switchToViewTwo: function () {
        transition.toView("viewTwo");
      }
    }
    """
    And a view called "viewTwo" which does not transition:
    """
    model: {
      field_two: "Field Two"
    }
    """
    When transition is started using "viewOne" as the starting view
    And transition is requested to "viewTwo"
    Then template should be set to "viewTwo"
    And model should be set to "viewTwo"
