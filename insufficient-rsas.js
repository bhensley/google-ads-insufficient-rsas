/**
 *
 * Ad Groups With Insufficient or Missing RSAs
 * 
 * Check all enabled ad groups in enabled search campaigns for a minimum number of RSAs.
 * If the number of RSAs is below the minimum, log the ad group name, campaign name, number of RSAs,
 * and number of other ad types to a spreadsheet. 
 * 
 * Author: Bob Hensley
 * Last Modified: June 27, 2023
 * Version: 1.0
 * 
 * License: MIT
 *
 **/
 
// URL to a Google Sheet you want results logged to. Requires the FULL URL.
const SPREADSHEET_URL = "";

// Minimum number of RSAs needed in the ad group to not be considered a problem; default is 1 (so 0 RSAs = problem)
const MIN_RSAS_IN_ADGROUP = 1;

function setupSheet () {
  if (SPREADSHEET_URL === "")
    throw("Need a Spreadsheet URL to work!");
  
  const ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  const as = ss.getActiveSheet();
  
  try {
    as.clear();
    as.appendRow([
      "Campaign",
      "Ad Group",
      "# of RSAs",
      "# of Old Ads"
    ]);
    
    as.getRange(1,1,1,4).setFontWeight("bold");
  } catch (e) {
    throw(e);
  }
  
  return as;
}

function main () {
  const as = setupSheet();
  const enabledAdGroups = AdsApp.adGroups()
    .withCondition("campaign.status = ENABLED")
    .withCondition("ad_group.status = ENABLED")
    .withCondition("AdvertisingChannelType = SEARCH").get();
    
  while (enabledAdGroups.hasNext()) {
    let adgroup = enabledAdGroups.next();
    let numRespAds = adgroup.ads().withCondition("ad_group_ad.ad.type = RESPONSIVE_SEARCH_AD").get().totalNumEntities();
    let numOtherAds = adgroup.ads().get().totalNumEntities() - numRespAds;

    if (numRespAds < MIN_RSAS_IN_ADGROUP) {
      as.appendRow([
        adgroup.getCampaign().getName(),
        adgroup.getName(),
        numRespAds,
        numOtherAds
      ]);
    }
  }
}