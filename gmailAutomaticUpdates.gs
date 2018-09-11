/*
Author: @tedsteinmann
Copyright: https://gist.github.com/tedsteinmann/0ee248856de6e75498470db7c98fab09

Modifications : simon57nz 

Original author
fwed (contact@fwed.fr)
https://medium.com/@fw3d/auto-archive-emails-in-gmail-after-2-days-1ebf0e076b1c

### Modifications from:
https://gist.github.com/anonymous/2cca33d376f7f924fdaa67891ad098cc
https://gist.github.com/GabeBenjamin/3ef20889fa37ae97e9492e58e90db892
https://gist.github.com/soxofaan/92fab6776c1bfcac060544ba0c9dd59c
https://gist.github.com/anonymous/2cca33d376f7f924fdaa67891ad098cc#gistcomment-1984293
*/

function automaticGmailUpdates() {
  var prefix = 'auto'; //top level label could be re-named (it is case sensitive);
  var actions = ['delete','archive']; //conditional -- DO NOT CHANGE
  var maxDate = new Date();
  var delayDays = 5;
  var currLabel_parts = ["label","0","sublabel"];
//  var Curr_Date = new Date();
//  var Datecheck = Curr_Date.getDate();
// Get all the threads that are labelled 
  var labels = GmailApp.getUserLabels();
  for (var a = 0; a < labels.length; a++) {  
    var currLabel = labels[a].getName();
    currLabel_parts = currLabel.split("/");
//              Parent label "for short life emails is "auto"
    if (currLabel_parts[0] == "auto") {
//            Second level label after autodelete is number of days to retain email 
      var action = currLabel_parts[1];
      if (action == "archive" || action == "delete") {
        delayDays = +currLabel_parts[2];
        if (delayDays > 0 && delayDays < 2000) {
          _automaticGmailUpdates(currLabel, delayDays, action);
      } 
    }
  }
}
}
function _automaticGmailUpdates(label, days, action) {

  Logger.log('Running automatic ' + action +' for messages labeled %s', label);

  // Threshold for latest message of the thread.
  var thresholdDate = new Date();
  thresholdDate.setDate(thresholdDate.getDate() - days);
  Logger.log('Using threshold date %s', thresholdDate);

  // Get all the threads with the label.
  var label = GmailApp.getUserLabelByName(label);

  if (label) {
    //Logger.log('Found label: %s', label.getName());

  var threads = label.getThreads(0, 400).filter(function(thread) {
    // Only include threads older than the limit we set in delayDays
    return (thread.getLastMessageDate() < thresholdDate);
  });

    if (threads.length == 0){
      Logger.log('Found 0 threads to update');
      return -1;
    }

  var batch_size = 100;
  while (threads.length) {
    //set the batch size to the minimum of 100 or size of threads
    var this_batch_size = Math.min(threads.length, batch_size);
    var this_batch = threads.splice(0, this_batch_size);

    Logger.log('Found %s threads to ' + action, this_batch.length);

    if (action === 'delete') {
      GmailApp.moveThreadsToTrash(this_batch)
    }
    else if (action === 'archive') {
      GmailApp.moveThreadsToArchive(this_batch);
      label.removeFromThreads(this_batch);//when archiving, we need to remove this label so that it doesn't get run again.
    }
  }//end while
  }//end if label
}// end function
