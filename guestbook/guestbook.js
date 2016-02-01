Messages = new Mongo.Collection('messages');


if (Meteor.isClient) {
  
  Meteor.subscribe("messages"); //every client created will subscribe
  
  Template.guestBook.helpers({ //go to the Template called guestBook
    "messages":function () {
      return Messages.find({}, {sort: {createdOn: -1}}) || {};
      }
    });
  
  
  Template.guestBook.events(
    {   //events takes an object, this is an object
      "submit form": function(event)
      {
        event.preventDefault();
        //alert('You clicked submit!');
        
        //find the textarea with jQuery
        var messageBox =
        $(event.target).find('textarea[name=guestBookMessage]');
        
        
        var messageText = messageBox.val();
        
        var nameBox = $(event.target).find('input[name=guestName]');
        var name = nameBox.val();
        
        Messages.insert({message: messageText, name: name, createdOn: Date.now()});
        messageBox.val('');
        nameBox.val('');
        
        if (nameText.length > 0 &&
            messageText.length > 0)
           {
          
          Messages.insert(              
              {
                name: nameText,
                message: messageText,
                createdOn: Date.now()
              });        
        
              nameBox.val("");
              messageBox.val("");
           }
           else {
            //alert("Name and Message are both required.");
            console.log(messageBox);
            messageBox.classList.add("has-warning");
           }
        
      }
    
    }
  );
}
  


if (Meteor.isServer) {
 Meteor.startup(function () {
 });
   
  Meteor.publish("messages", function (){
    return Messages.find();
  });
}
