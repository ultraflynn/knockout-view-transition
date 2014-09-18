knockout-view-transition
========================

I wanted to be able to use Knockout.js for a big single page app and I didn't want to end up with one massive index.html and a single equally large view model. What I wanted to do is to split up things into logical views so that I can work on them separately.

What would be nice would be to seperate different logical groups of HTML. Something like this:
```
<script type="text/html" id="home">
  <p data-bind="text: surname"></p>
  <input type="button" value="Login User" data-bind="click: loginUser"></input>
</script>

<script type="text/html" id="login">
  <p data-bind="text: surname"></p>
  <input type="button" value="Return Home" data-bind="click: displayHome"></input>
</script>

<div data-bind='template: { name: view.template, data: view.model }'> </div>

<script src="js/knockout.js/knockout.debug.js"></script>
<script src="js/app.js"></script>
```
In a full-scale application I wouldn't put these all in the same html page, I'd put each of these groups into a file on it's own and then import them into the main html page at build time. A tool like grunt-copy might be useful for that.

Now that I have my html seperated I want to give each of those groups a different view model. I don't want one huge view model, no, a view model for each group would be fine:
```
var transition = require("knockout-view-transition");
transition.initConfig({
  home: {
    model: {
      surname: "",
      loginUser: function () {
        transition.toView("login");
      }
    }
  },

  login: {
    model: {
      forename: "View Model Two - FORENAME",
      displayHome: function () {
        transition.toView("home");
      }
    }
  }
});

transition.start("viewOne");
```
So the most basic requirement for knockout-view-transition is that it can handle this modularisation for me. Let's call the combination of a group of html elements and their associated view model something simple. How about a "view"? Yup. That'll do.

So the other most basic requirement is to be able to transition from one view to another.

View Transitions
----------------
knockout-view-transition provides a method named 'toView' which allows a transition to another view. This function has this signature:
'''
transition.toView = function(view,
    {
      "allowed": function() {
      },
      
      "denied": function() {
      },
      
      "data": function() {
        return "something useful to the allowed function"
      }
    });
'''
The parameters to this function do the following:
* "view" - this is the view being transitioned to it contains a string that is the view name defined in the configuration. In the example above the view names are "home" and "login".
* "allowed" - called when both the "leaving" and "entering" transition hooks have allowed the transition.
* "denied" - called when either the "leaving" or "entering" transition hooks have denied the transition. This function has one parameter named "reason" which is provided by the transition hook that issued the denial.

Transition Hooks
----------------
Often you want something to happen during the transition period between views. Maybe you want to trigger a UI framework refresh each time so that the front-end is rendered correctly when the model changes.

knockout-view-transition supports the follow transition hooks:
* "leaving" - a transition has been triggered and the view is about to be "left". Two callbacks are defined, "allow" and "deny" which takes an optional argument named "reason" to provide context for the denial.
* "left" - a transition has been triggered, the "leaving" hook has allowed it and the view is about to be changed.
* "entering" - a view is about to be transitioned to. Two callbacks are defined, "allow" and "deny" which takes an optional argument named "reason" to provide context for the denial.
* "entered" - a view is being transition to and the "entering" hook has allowed it. Should the toView() have been given "data" it will be passed to this hook.

The hooks are defined to the configuration like this:
```
transition.initConfig({
  home: {
    model: { ... },

    leaving: function(deny) {
      deny("reason");
    },

    left: function() {
    }
  },

  login: {
    model: { ... },

    entering: function(deny) {
      deny("reason");
    },

    entered: function(data) {
    }
  }
});
```
"leaving" and "entering" both are provided with a callback which allows them to deny the transition.
This "deny" callback takes a parameter called "context" which is handed to the "denied" callback
provided to the 'toView' invocation. Should the "deny" callback not be called then the transition
is permitted.

Knockout.js Version
-------------------
At the moment knockout-view-transition is only compatible with Knockout.js 3.0.0, changes to 3.1.0
stop the switching of views from working. 3.2.0 has now been released and that included a new
modularisation system which knockout-view-transition will adopt.

Backlog
-------
There are a bunch of other things I think I'm going to need and I'll build into
knockout-view-transition. Here's my current list:
* Allow transitions to more than one view
* Linear workflows so that just "next" and "previous" are required
* Support knockout 3.2.0 and modify to use new modularisation features

History
-------
* 0.1.0 Initial release
* 0.2.0 Transition hooks
* 0.3.0 Transition data
* 0.3.1 Move data publication from allowed hook to entered hook
