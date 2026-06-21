import fs from "fs";
import { events } from "./assets/js/events.js"; // adjust path if needed

function generateJsonLdFromEvents(events) {
  const jsonLdEvents = [];

  for (const [date, items] of Object.entries(events)) {
    for (const ev of items) {
      const startDate = buildIsoDate(date, ev.start);
      const endDate = buildIsoDate(date, ev.finish);

      jsonLdEvents.push({
        "@context": "https://schema.org",
        "@type": "Event",
        "name": ev.name,
        "startDate": startDate,
        "endDate": endDate,
        "description": ev.subtitle || "",
        "image": ev.image
          ? `https://www.cronullatriclub.com.au/assets/images/${ev.type}/${ev.image}`
          : undefined,
        "location": {
          "@type": "Place",
          "name": "Cronulla",
          "address": "Cronulla NSW, Australia"
        },
        "organizer": {
          "@type": "Organization",
          "name": "Cronulla Triathlon Club",
          "url": "https://www.cronullatriclub.com.au"
        },
        "eventType": ev.type,
        "keywords": ev.tags || []
      });
    }
  }

  return JSON.stringify(jsonLdEvents, null, 2);
}

function buildIsoDate(date, timeStr) {
  if (!timeStr) return date;

  const match = timeStr.match(/(\d{1,2}):(\d{2})(am|pm)/i);
  if (!match) return date;

  let [_, hour, minute, period] = match;
  hour = parseInt(hour, 10);

  if (period.toLowerCase() === "pm" && hour !== 12) hour += 12;
  if (period.toLowerCase() === "am" && hour === 12) hour = 0;

  const hh = hour.toString().padStart(2, "0");
  const mm = minute.padStart(2, "0");

  return `${date}T${hh}:${mm}:00+10:00`;
}

// Generate JSON-LD
const jsonLd = generateJsonLdFromEvents(events);

// Inject into HTML
let html = fs.readFileSync("./index.html", "utf8");
html = html.replace(
  "<!-- JSONLD_PLACEHOLDER -->",
  `<script type="application/ld+json">\n${jsonLd}\n</script>`
);

fs.writeFileSync("./index.html", html);
console.log("JSON-LD injected into index.html");
