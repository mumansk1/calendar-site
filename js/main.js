/**
 * Main JavaScript for Calendar Site
 */

(function () {
  'use strict';

  // DOM Elements
  const frame = document.getElementById('calendarFrame');
  const placeholder = document.getElementById('calendarPlaceholder');
  const toggles = document.querySelectorAll('.calendar-toggle');
  const btnToday = document.getElementById('btnToday');
  const btnHowTo = document.getElementById('btnHowTo');
  const timezoneChip = document.getElementById('timezoneChip');

  /**
   * Initialize the calendar
   */
  function initCalendar() {
    // Set initial calendar URL
    const initialUrl = buildCalendarUrl(CALENDAR_CONFIG.defaultView);
    if (initialUrl) {
      frame.src = initialUrl;
    } else {
      showError('Calendar not configured. Please edit js/calendar-config.js');
    }

    // Set timezone display
    setTimezoneDisplay();

    // Setup event listeners
    setupEventListeners();
  }

  /**
   * Set the timezone display
   */
  function setTimezoneDisplay() {
    try {
      const tz = CALENDAR_CONFIG.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
      timezoneChip.textContent = `Timezone: ${tz}`;
    } catch (e) {
      timezoneChip.textContent = 'Timezone: local';
    }
  }

  /**
   * Setup all event listeners
   */
  function setupEventListeners() {
    // Remove placeholder when iframe loads
    frame.addEventListener('load', handleFrameLoad);

    // View mode toggles
    toggles.forEach((btn) => {
      btn.addEventListener('click', () => handleViewToggle(btn));
    });

    // "View today's schedule" button
    btnToday.addEventListener('click', scrollToCalendar);

    // "How to connect" button
    btnHowTo.addEventListener('click', showHowToInstructions);
  }

  /**
   * Handle iframe load event
   */
  function handleFrameLoad() {
    if (placeholder) {
      placeholder.style.opacity = '0';
      placeholder.style.pointerEvents = 'none';
      setTimeout(() => {
        if (placeholder.parentNode) {
          placeholder.remove();
        }
      }, 300);
    }
  }

  /**
   * Handle view toggle button click
   */
  function handleViewToggle(btn) {
    // Update active state
    toggles.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    // Get view mode and update calendar
    const view = btn.getAttribute('data-view') || 'month';
    const newUrl = buildCalendarUrl(view);
    
    if (newUrl) {
      frame.src = newUrl;
    }
  }

  /**
   * Scroll to calendar section
   */
  function scrollToCalendar() {
    const rect = frame.getBoundingClientRect();
    const offset = window.scrollY + rect.top - 20;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  }

  /**
   * Show instructions for connecting calendar
   */
  function showHowToInstructions() {
    const instructions = [
      'HOW TO CONNECT YOUR GOOGLE CALENDAR:',
      '',
      '1. Open Google Calendar in a browser (https://calendar.google.com)',
      '',
      '2. On the left sidebar, under "My calendars", hover over the calendar you want to embed',
      '',
      '3. Click the three dots (⋮) → "Settings and sharing"',
      '',
      '4. Under "Access permissions for events", enable the sharing level you need',
      '   (e.g., "Make available to public" for a public calendar)',
      '',
      '5. Scroll down to "Integrate calendar" section',
      '',
      '6. Copy the "Embed code" (it\'s an <iframe> tag)',
      '',
      '7. Extract the URL from src="..." in that embed code',
      '',
      '8. Open js/calendar-config.js in your project',
      '',
      '9. Paste the URL into the "embedUrl" field',
      '',
      '10. Save the file and refresh your browser',
      '',
      'EXAMPLE URL FORMAT:',
      'https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID&ctz=YOUR_TIMEZONE',
      '',
      'Need help? Check docs/SETUP.md for detailed instructions with screenshots.'
    ].join('\n');

    alert(instructions);
  }

  /**
   * Show error message
   */
  function showError(message) {
    if (placeholder) {
      placeholder.innerHTML = `
        <div style="color: #ef4444; max-width: 400px;">
          <strong>⚠️ Error</strong><br><br>
          ${message}
        </div>
      `;
    }
  }

  /**
   * Detect if user is on mobile
   */
  function isMobile() {
    return window.innerWidth <= 600;
  }

  /**
   * Handle window resize
   */
  function handleResize() {
    // Add any resize-specific logic here
    // For example, adjust calendar height on mobile
    if (isMobile()) {
      // Mobile-specific adjustments
    }
  }

  // Debounce function for resize events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Listen for window resize
  window.addEventListener('resize', debounce(handleResize, 250));

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalendar);
  } else {
    initCalendar();
  }

  // Log initialization
  console.log('Calendar site initialized');
  console.log('Config:', CALENDAR_CONFIG);
})();
