
// store a reference to the application object that will be created
// later on so that we can use it if need be
var app;
var listviewDatasource;
var currentPrinterIndex = 1;
var showColumn2 = true;

(function () {

    var printers = [], i;
    for (i = 0; i < 3; i++) {
        printers.push(createPrinter(showColumn2));
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

function createPrinter(showColumn2Arg) {
    var newPrinter1 = {
        id: currentPrinterIndex,
        cellClass: '',
        name: ('printer' + currentPrinterIndex),
        serial: (345678 - currentPrinterIndex) };

    currentPrinterIndex++;

    var cellClassPrinter2 = showColumn2Arg === true ? '' : 'display: none';

    var newPrinter2 = {
        id: currentPrinterIndex,
        cellClass: cellClassPrinter2,
        name: ('printer' + currentPrinterIndex),
        serial: (345678 - currentPrinterIndex) };

    if (showColumn2Arg === true) {
        currentPrinterIndex++;
    }

    var printers = {};
    printers.printer1 = newPrinter1;
    printers.printer2 = newPrinter2;

    return printers;
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
    var index = listviewDatasource.total() - 1;
    var lastItem = listviewDatasource.at(index);
    var newPrinter;
    if (lastItem.printer2.cellClass.indexOf('none') != -1) {
        listviewDatasource.remove(lastItem);
        currentPrinterIndex--;
        newPrinter = createPrinter(true);
        listviewDatasource.add(newPrinter);
    }
    else {
        newPrinter = createPrinter(false);
        listviewDatasource.add(newPrinter);
    }

}


