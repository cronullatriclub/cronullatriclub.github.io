# Updating Events in assets/js/events.js

This file controls all club training sessions and race events displayed on the website. Each event is stored as a key-value pair inside a single JavaScript object named `events`. The **key** is the event date (YYYY-MM-DD), and the **value** is an object describing the event.

## Event Structure
Each event follows this structure:

{
  'YYYY-MM-DD': {
    ishighlight: false,            // Highlight event visually (true/false)
    nav: 'race' | 'train',         // Determines which navigation tab it appears under
    type: 'triathlons' | 'bike' | 'run' | 'swim',
    name: 'Event Name',            // Display title
    start: '6:45am',               // Start time
    finish: '8:30pm',              // (Optional) End time for training sessions
    image: 'run.avif',             // (Optional) Event image — MUST be .avif
    subtitle: 'Event description', // (Optional) Description text for training events
    resultsurl: 'https://...'      // (Optional) Link to race results
  }
}

## Required Fields
- ishighlight — Boolean controlling whether the event is visually emphasized.
- nav — Determines category: `race` or `train`.
- type — Event type (triathlons, bike, run, swim).
- name — Event title.
- start — Start time.

## Optional Fields
- finish — End time (training only).
- image — **Must be an AVIF image (.avif)**.
- subtitle — Description text for training events.
- resultsurl — Link to race results (race events only).

## Image Requirements
Event images must:
- Be in **AVIF format only**
- Use the `.avif` extension
- Match an existing file in your images directory

Example valid image: `swim.avif`

## Adding a New Event
1. Open `assets/js/events.js`.
2. Add a new entry using the date as the key.
3. Follow the same structure as existing events.
4. Ensure commas and braces remain valid JavaScript.

Example:

'2026-02-10': {
  ishighlight: false,
  nav: 'train',
  image: 'swim.avif',     // must be AVIF
  type: 'swim',
  name: 'Ocean Swim',
  start: '4:30pm',
  finish: '5:30pm',
  subtitle: 'Join us for a relaxed group swim suitable for all levels.'
},

## Editing an Event
Modify any field inside the event object. Common updates include:
- Changing the date key
- Updating start/finish times
- Replacing the image (must remain AVIF)
- Updating the subtitle or name
- Adding a results URL after a race

## Removing an Event
Delete the entire event entry, including its trailing comma if it is not the last item.

## Validating Your Changes
- Ensure the file remains valid JavaScript.
- Confirm all dates use `YYYY-MM-DD`.
- Verify image filenames end in `.avif`.
- Check that image files exist in `/assets/images/`.
- Ensure race events include `resultsurl` when available.

## Deployment
Once committed and pushed to GitHub, the site will update automatically if using GitHub Pages or your normal deployment workflow.
