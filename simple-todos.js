Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function() {
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.events({
  	"submit .new-task": function(event) {
  		// Prevent default browser form submit
  		event.preventDefault();

  		// Get value from form event
  		var text = event.target.text.value;

  		// Insert a task into the collection
  		Tasks.insert({
  			text: text,
  			createdAt: new Date()
  		});

  		// Clear form
  		event.target.text.value = "";
  	}
  });

  // Make UI elements do something
  Template.task.events({
  	"click .toggle-checked": function() {
  		// Set the checked property to the opposite of its current val
  		Tasks.update(this._id, {
  			$set: {checked: ! this.checked}
  		});
  	},
  	"click .delete": function() {
  		Tasks.remove(this._id);
  	}
  });
}