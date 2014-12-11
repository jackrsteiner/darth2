Ideas = new Mongo.Collection("ideas");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    ideasF: function() {
      return Ideas.find({},{sort: {upvote: -1}});
    }
  });
  
  Template.body.events({
    "submit .new-idea": function (event) {
      // This function is called when the new task form is submitted

      var text = event.target.text.value;

      Ideas.insert({
        text: text,
        createdAt: new Date(), // current time
        upvote: 1,
        downvote: 0,
        author: Meteor.userId()
      });

      // Clear form
      event.target.text.value = "";

      // Prevent default form submit
      return false;
    }
  });

  Template.individual_ideas.events({
  "click .upvote": function () {
    Ideas.update(this._id, {$inc: {upvote: 1}});
  },
  "click .downvote": function () {
    Ideas.update(this._id, {$inc: {downvote: -1}});
  },
  "click .delete": function () {
    if (this.author == Meteor.userId()) {
      Ideas.remove(this._id);
    }
  }
});
}