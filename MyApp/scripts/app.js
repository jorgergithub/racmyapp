
// store a reference to the application object that will be created
// later on so that we can use it if need be
var app;
var listviewDatasource;
var currentPrinterIndex = 1;

(function () {

    var printers = [], i;
    for (i = 0; i < 33; i++) {
        printers.push(createPrinter());
    }

    // create an object to store the models for each view
    window.APP = {
      models: {
        home: {
          title: 'Home'
        },
        settings: {
          title: 'Settings'
        },
        contacts: {
          title: 'Contacts',
          ds: new kendo.data.DataSource({
            data: printers
          }),
          alert: function(e) {
            alert(e.data.name);
          }
        }
      }
    };
    
    listviewDatasource = window.APP.models.contacts.ds;

    // this function is called by Cordova when the application is loaded by the device
    document.addEventListener('deviceready', function () {  
      
      // hide the splash screen as soon as the app is ready. otherwise
      // Cordova will wait 5 very long seconds to do it for you.
      navigator.splashscreen.hide();

      app = new kendo.mobile.Application(document.body, {
        
        // you can change the default transition (slide, zoom or fade)
        transition: 'slide',
        
        // comment out the following line to get a UI which matches the look
        // and feel of the operating system
        skin: 'flat',

        // the application needs to know which view to load first
        initial: 'views/contacts.html'
      });

    }, false);



}());

function createPrinter() {
    var newPrinter = { id: currentPrinterIndex, name: ('printer' + currentPrinterIndex), serial: (345678 - currentPrinterIndex) };
    currentPrinterIndex++;
    return newPrinter;
}

function onSelect(e) {
    var index = this.current().index();
    if (index === 0) {
        app.navigate("views/home.html");        
    }
    else {
        app.navigate("views/contacts.html");        
    }
}

// jorges comment
function addPrinter(e) {
    var newPrinter = createPrinter();
    listviewDatasource.add(newPrinter);
}


