Messages = new Mongo.Collection('messages');

Router.route('/', function () {
  this.render('guestBook'); 
  this.layout('layout');    
  });

Router.route('/about', function () {
  this.render('about');
  this.layout('layout');
});

Router.route('/messages/:_id', function () {
  this.render('message', {
    data: function (){
      return Messages.findOne({_id: this.params._id});
    }
  });  
    this.layout('layout');
    },
    {
    name: 'message.show'
  });

if (Meteor.isClient) {  
  Meteor.subscribe("messages"); 
  
  Template.guestBook.helpers({ 
    'messages':function () {
      return Messages.find({}, {sort: {createdOn: -1}}) || {};
      }
    });  
  
  Template.guestBook.events({  
      'submit form': function(event) {
          event.preventDefault();
          
          var messageBox =
          $(event.target).find('textarea[name=guestBookMessage]');       
          var messageText = messageBox.val();
        
          var nameBox = $(event.target).find('input[name=guestName]');
          var name = nameBox.val();
        
          messageBox.val('');
          nameBox.val('');
          
          Tasks.remove(this_id);
      }    
    });  
} 

if (Meteor.isServer) {
 Meteor.startup(function() {
  });  
  
  Meteor.publish("messages", function (){
    return Messages.find();
  });
}
