# CAT SAYS

#### Video Demo: https://youtu.be/kh4Lwhx6yiY

#### Description:

A chrome extension that adds a cute cat on webpage. Users can select one from 7 cats and can interact by clicking on the cat to reveal humorous or motivational messages.

## Files

### manifest.json

contain configuraions of the extention such as what name and icon of the extension and what files extension can access.

### static foler

contain all static resource.

**data.json**
data of messages cat will say and a data of cat names and images path in form of dictionary in json format.

**images**
images of cat that will using in extension.

### popup.html

contain html element for popup of the extension including name, image of selected cat, buttons of change selected cat (next, previous) and a button to how and hide cat in webpage

### popup.js

contain javascript to control and add event of element in popup.
with inital variable of empty array cats and cat_index = 0

**loadResource**
will fetch data from data.json then save it in variable name cats then it will call renderCat()

**handleEvents**

handle events of user interaction in popup.html which is change to next or previous cat through cat_index that will back to 0 when reach over max length and go to max length when below 0. Another interaction is render and remove button which can control if cat in webpage should display or not using show_render.

**getFromStorage**

get what is saved in browser's storage (cat_index, show_render). So the data will sync in every tabs.

**renderCat**

will get a cat data from cats using cat_index then render the cat's name and image. Also, it will save cat_index to browser's storage and message of cat_index to background to trigger event in content.js

### style.css

contain css of elements using in popup.html which is next, previous, show/hide buttons

### content.js

contain javascript to control and add event of element in webpage .
with inital variable of empty array of texts and cats and boolean varinable saying = false

**createElement**
will create 2 element and add them to user's webpage

1. cat_image the img tag contain image of currently selected cat
2. bubble_text the div with text inside to show a message the cat says

both of it style with position: fixed and heigh z-index to make them stick on user webpage with a desired position using right and bottom keywords. Also initial value of display is none to hide it first when the extention being used

**loadResource**
will fetch data from data.json then save it in variable name texts and cats then it will check what value of cat_index and show_render saved in browser are. Next, it will render image using renderCat(cat_index)

**handleEvents**

will listen to events from background.js using message and handle them. When show_render is sent it will check should it display or hide cat_image, then it will check if cat_index has been updated. So it can trigger renderCat to update cat_image. Finally, it will add onClickSay as an on click event of cat_image

**here**
contain javascript to control and add event of element in webpage which will fetch data from data.json. then it will call event handler which can divide to 2 part.

1. from background that keep sent event of what should appear and disappear like which cat is selected and should it display
2. from users. user can click on cat image in webpage and it will show text bubble over cat's head and will disappear after 3 seconds

**renderCat**

will get a cat image from cats using cat_index and update src attribute of cat_image. Since it block to directly access static folder, it has to call with chrome.runtime.getURL("path/image.png") to make it work

**onClickSay**
this function will only run if variable saying is false which is it will get a message from generateText() and add it to bubble_text using innerHTML, then set saying to true. So, users can't trigger it again while it running. then it will display bubble_text and hide again after 3 seconds.

**generateText**
will return a random message from texts.

### background.js

contain javascript to support event triggering using message. It will listen to every message send from popup.js and send new message back to every tabs to trigger further events
