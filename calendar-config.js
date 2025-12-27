/**
 * Google Calendar Configuration
 * 
 * HOW TO GET YOUR CALENDAR EMBED URL:
 * 
 * 1. Open Google Calendar (https://calendar.google.com)
 * 2. On the left sidebar, find "My calendars"
 * 3. Hover over the calendar you want to embed
 * 4. Click the three dots (⋮) → "Settings and sharing"
 * 5. Scroll to "Access permissions for events"
 *    - Check "Make available to public" (or appropriate sharing level)
 * 6. Scroll down to "Integrate calendar"
 * 7. Copy the "Embed code" (it's an <iframe> tag)
 * 8. Extract the URL from src="..." and paste it below
 * 
 * Example URL format:
 * https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID&ctz=YOUR_TIMEZONE
 */

const CALENDAR_CONFIG = {
  // Replace this with your own Google Calendar embed URL
  embedUrl: 'https://calendar.google.com/calendar/embed?src=c_188f9187a9e0887345e3a5212ada4ef1f1e5c232d154f1c48b5c231d9bc9c8d4%40group.calendar.google.com&ctz=America%2FNew_York',
  
  // Default view mode: 'MONTH', 'WEEK', or 'AGENDA'
  defaultView: 'MONTH',
  
  // Show/hide calendar title
  showTitle: true,
  
  // Show/hide navigation buttons
  showNav: true,
  
  // Show/hide date
  showDate: true,
  
  // Show/hide print icon
  showPrint: false,
  
  // Show/hide tabs (Month, Week, Agenda)
  showTabs: true,
  
  // Show/hide calendar list
  showCalendars: false,
  
  // Show/hide timezone
  showTz: false,
  
  // Calendar height (in pixels)
  height: 600,
  
  // Calendar width (in pixels or percentage)
  width: '100%',
  
  // Background color (hex without #)
  backgroundColor: 'ffffff',
  
  // Timezone (e.g., 'America/New_York', 'Europe/London', 'Asia/Tokyo')
  // Leave empty to use browser's timezone
  timezone: ''
};

/**
 * Build the full calendar URL with all parameters
 */
function buildCalendarUrl(view = CALENDAR_CONFIG.defaultView) {
  if (!CALENDAR_CONFIG.embedUrl) {
    console.error('Calendar embed URL is not configured. Please set it in calendar-config.js');
    return '';
  }

  const url = new URL(CALENDAR_CONFIG.embedUrl);
  
  // Set view mode
  url.searchParams.set('mode', view.toUpperCase());
  
  // Set optional parameters
  if (!CALENDAR_CONFIG.showTitle) url.searchParams.set('showTitle', '0');
  if (!CALENDAR_CONFIG.showNav) url.searchParams.set('showNav', '0');
  if (!CALENDAR_CONFIG.showDate) url.searchParams.set('showDate', '0');
  if (!CALENDAR_CONFIG.showPrint) url.searchParams.set('showPrint', '0');
  if (!CALENDAR_CONFIG.showTabs) url.searchParams.set('showTabs', '0');
  if (!CALENDAR_CONFIG.showCalendars) url.searchParams.set('showCalendars', '0');
  if (!CALENDAR_CONFIG.showTz) url.searchParams.set('showTz', '0');
  
  return url.toString();
}

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CALENDAR_CONFIG, buildCalendarUrl };
}
