# Gmail Automatic Updates
A Google Apps Script to automatically archive or delete mail with a certain label after a certain time.

Getting Started
---------------
Relies on GMail label convention and Google script triggers to auto archive or delete messages by interval.
For example, any email tagged with 'auto/delete/daily' will be deleted when it becomes a day old.
This is useful for daily notifications and updates.
Can be combined with filters for automatic tagging and email management.

When to use delete or archive:
- Use "delete" for re-producable message content (e.g. click here to see your online statement)
- Use "archive" for content that is only relevant for a period of time (e.g. here is your weekly news summary)

Installing
----------
1. Flag desired mails with one of the customizable labels in automaticGmailUpdates. This can be done with filters if desired. By default the labels supported are:

    * auto/delete/daily
    * auto/delete/weekly
    * auto/delete/monthly
    * auto/archive/daily
    * auto/archive/weekly
    * auto/archive/monthly

2. Create a Google Apps Script with this gmailAutomaticUpdates.gs
3. Set up a time driven trigger to call automaticGmailUpdates daily

Disclaimer
----------
Use at your own risk. The author is not responsible for erroneous deletion of email.
