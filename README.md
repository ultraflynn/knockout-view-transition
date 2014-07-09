knockout-view-transition
========================

I wanted to be able to use Knockout.js for a big single page app and I didn't want
to end up with one massive index.html and a single equally large view model. What
I wanted to do is to split up things into logical views so that I can work on
them separately.

What would be nice would be to seperate different logical groups of HTML.
Something like this:
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
In a full-scale application I wouldn't put these all in the same html page,
I'd put each of these groups into a file on it's own and then import them into the
main html page at build time. A tool like grunt-copy might be useful for that.

Now that I have my html seperated I want to give each of those groups a different
view model. I don't want one huge view model, no, a view model for each group would
be fine:
```
(function (transition) {
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
  })(new KnockoutViewTransition());
```

So the most basic requirement for knockout-view-transition is that it can handle
this modularisation for me. Let's call the combination of a group of html elements
and their associated view model something simple. How about a "view"? Yup. That'll
do.

So the other most basic requirement is to be able to transition from one view to
another.

There are a bunch of other things I think I'm going to need and I'll build into
knockout-view-transition. Here's my current list:
* Validation to ensure that a transition can happen
* Rules that determine whether a transition can happen
* Hooks to allow you to run code before transition, after a successful rule,
  after an unsuccessful rule and after a transition
* Allow transitions to more than one view
* Linear workflows so that just "next" and "previous" are required