# Google Ads Script: Insufficient RSAs

This is a simple Google Ads script that checks all enabled ad groups, within enabled search campaigns, for an insufficient number of Responsive Search Ads (RSAs). If a minimum number of RSAs (customizable amount) isn't found within the ad group, then it's logged to a Google Sheet. In addition to that, it also logs how many other ads are running within the ad group. Chiefly this will be Text Ads and Expanded Text Ads. But it can be any type of deprecated ad type, such as display, call, etc.

The pain point this script solved for me, anyways, is working through very large, mature, and complex ad accounts. Google's interface doesn't do a particularly good job with providing this data. And though it may occasionally drop recommendations that shows you what ad groups are missing RSAs, that interface is neither appealing, nor always available. By running this script and storing those potentially problematic ad groups in a Google Sheet, it affords a cleaner way of seeing what needs to be worked on.

## Instructions
1. Add the script in Google Ads (Tools & Settings > Scripts > New Script)
2. Create a blank Google Sheet
3. Copy the full URL to that sheet and place it in the SPREADSHEET_URL variable
4. Change the MIN_RSAS_IN_ADGROUP variable is necessary; by default the script will report any ad group without any RSAs
5. Authorize the script
6. Preview it; you'll likely need to authorize a second time if you haven't already
7. Assuming it runs without error (stop and preview again if it does, keeping an eye out for any additional authorize prompts), click Run to formally run it

## Known Issues
- Could Time Out
  - Google Ads allows scripts to run for 30 minutes. This script does what it can right now to only run on ad groups that are most relevant (enabled, within enabled campaigns, and only within search campaigns at that), but if your account is sufficiently large, it's going to time out even with the generous runtime allowance. This should only be a problem for very, very large ad accounts (to the tune of thousands of ad groups that need to be reviewed by the script).

## TODO
- Improve efficiency
  - There's probably a better way to filter down the ad groups that are being reviewed by the script. Maybe even a way to build a condition that hones it in to problematic ad groups right away. Either way, efficiency is absolutely the weakpoint of this script right now.
- Provide additional details on the ad group to the sheet?
  - This is an arbitary task, and everybody's thoughts on what is and isn't good info to expose to the sheet is going to be different. But in the very least perhaps impressions makes sense, so as to gauge these ad group's ability to serve if they're only running deprecated ad types?