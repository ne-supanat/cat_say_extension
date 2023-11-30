# CAT SAYS

#### Video Demo: https://youtu.be/kh4Lwhx6yiY

#### Description:

A chrome extension that adds a cute cat on webpage. Users can select one from 7 cats and can interact by clicking on the cat to reveal humorous or motivational messages.

**static folder**
contain all static resource of cat images and data in json format

**mainfest.json**
contain configuraions of the extention

**popup.html**
contain html element for popup of the extension including name, image of selected cat, buttons of change selected cat (next, previous) and a button to how and hide cat in webpage

**popup.js**
contain javascript to control and add event of element in popup which will fetch data from data.json. then it will call event handler like on click on each interactable element then everytime selected cat update and render it will save indext of selected cat and display status to storage so the data will be saved when open a new tab

**style.css**
contain css of elements using in popup.html

**content.js**
contain javascript to control and add event of element in webpage which will fetch data from data.json. then it will call event handler which can divide to 2 part.

1. from background that keep sent event of what should appear and disappear like which cat is selected and should it display
2. from users. user can click on cat image in webpage and it will show text bubble over cat's head and will disappear after 3 seconds

**background.js**
contain javascript to support event trigger through tabs using message listener
