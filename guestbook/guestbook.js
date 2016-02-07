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
        
          Messages.insert({message: messageText, name: name, createdOn: Date.now()});
          messageBox.val('');
          nameBox.val('');
        
        //if (nameText.length > 0 &&
       //     messageText.length > 0)
         //  {
          
        //  Messages.insert(              
          //    {
          //      name: nameText,
          //      message: messageText,
          //    createdOn: Date.now()
           //   });        
        
          //    nameBox.val("");
          //    messageBox.val("");
          // }
          // else {
            
          //  console.log(messageBox);
          //  messageBox.classList.add("has-warning");
           
          // }
        
      }    
    });
} 

if (Meteor.isServer) {
 Meteor.startup(function () {
 });   
  Meteor.publish("messages", function (){
    return Messages.find();
  });
}
