# Guide to Setting Up VS Code and Connecting to the Cronulla Triathlon Club GitHub Repository

This guide will walk you through installing Visual Studio Code (VS Code), installing recommended extensions for this project, and connecting to the GitHub repository for the Cronulla Triathlon Club website. It also covers how to check in code changes.

## Part 1: Installing VS Code

1. **Download VS Code**:
   - Go to the official VS Code website: [https://code.visualstudio.com/](https://code.visualstudio.com/)
   - Click the "Download" button for your operating system (Windows, macOS, or Linux).
   - Run the installer and follow the on-screen instructions to complete the installation.

2. **Launch VS Code**:
   - Open VS Code after installation.
   - You'll see the welcome screen. You can start exploring or proceed to the next steps.

## Part 2: Installing Recommended Extensions

These plugins listed below are ones that were used to develop this website.

1. **Open the Extensions View**:
   - In VS Code, click the Extensions icon on the left sidebar (it looks like four squares) or press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (macOS).

2. **Install the Following Extensions**:
   - **HTML CSS Support**: Provides IntelliSense for HTML and CSS class names.
     - Search for "HTML CSS Support" and install the one by "ecmel".
   - **JavaScript (ES6) code snippets**: Adds code snippets for modern JavaScript.
     - Search for "JavaScript (ES6) code snippets" and install.
   - **Live Server**: Allows you to launch a local development server with live reload for static sites.
     - Search for "Live Server" by Ritwick Dey and install.
   - **GitLens**: Enhances Git capabilities within VS Code, showing blame annotations, commit history, etc.
     - Search for "GitLens" and install.
   - **Prettier - Code formatter**: Automatically formats your code for consistency.
     - Search for "Prettier - Code formatter" and install.
   - **Auto Rename Tag**: Automatically renames paired HTML/XML tags.
     - Search for "Auto Rename Tag" and install.
   - **Bracket Pair Colorizer 2**: Colors matching brackets for better readability.
     - Search for "Bracket Pair Colorizer 2" and install.

3. **Setup Extensions**:
   - **Prettier**: Go to Settings (`Ctrl+,`), search for "Prettier", and enable "Format On Save" for automatic formatting.
   - **Live Server**: Once installed, you can right-click on `index.html` and select "Open with Live Server" to preview the site locally.
   - **GitLens**: It works out-of-the-box; you can access Git features via the Source Control view or status bar.

## Part 3: Connecting to the GitHub Repository

The Cronulla Triathlon Club website is hosted on GitHub at `https://github.com/cronullatriclub/cronullatriclub.github.io`. If you haven't cloned it yet, follow these steps. If the repository is already open in your workspace, you can skip to Part 4. Note!!! Use the clubs github account to login to github in vscode.

1. **Install Git** (if not already installed):
   - Download from [https://git-scm.com/](https://git-scm.com/) and install. Should be part of the vscode install.

2. **Clone the Repository**:
   - Open VS Code.
   - Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`).
   - Type "Git: Clone" and select it.
   - Enter the repository URL: `https://github.com/cronullatriclub/cronullatriclub.github.io`
   - Choose a local directory to clone into (e.g., `C:\Users\YourName\Documents\GitHub\`).
   - VS Code will clone the repository and open it as a workspace.

3. **Open the Workspace**:
   - If you have the `.code-workspace` file, open it via File > Open Workspace from File.
   - This will load the multi-folder setup as shown in your workspace structure.

## Part 4: Checking In Code Changes

Once connected, you can make changes and commit them back to GitHub.

1. **Make Changes**:
   - Edit files in VS Code (e.g., update events in `assets/js/events.js` as per the README).

2. **Stage Changes**:
   - Go to the Source Control view (left sidebar, third icon from top).
   - Click the "+" next to changed files to stage them, or click "Stage All Changes".

3. **Commit Changes**:
   - Enter a commit message in the text box (e.g., "Updated event details").
   - Click the checkmark icon to commit.

4. **Push Changes**:
   - Click the "..." menu in Source Control and select "Push" to upload to GitHub.
   - If prompted, enter your GitHub credentials (use a Personal Access Token for security).

5. **Pull Changes** (if collaborating):
   - To get updates from others, click "Pull" in the Source Control view.

6. **Handling Conflicts**:
   - If there are merge conflicts, VS Code will highlight them. Resolve by editing the files and then committing.

This setup should get you started with developing and maintaining the Cronulla Triathlon Club website. If you encounter issues, refer to VS Code's documentation or GitHub's guides.

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

## Part 5: Updating the Sitemap and Submitting to Google Search Console

The sitemap.xml file helps search engines like Google discover and index all pages on your website. It lists the URLs of your site's pages along with metadata like the last modification date.

### Updating the Sitemap
1. **When to Update**: Update the sitemap whenever you add, remove, or significantly change pages on the website.
2. **Manual Update**:
   - Open sitemap.xml in VS Code.
   - Each page is represented by a <url> element with <loc> (the URL) and <lastmod> (last modified date in ISO format, e.g., 2026-04-27T00:00:00+00:00).
   - To add a new page: Insert a new <url> block before the closing </urlset> tag.
     Example:
     `
     <url>
       <loc>https://cronullatriclub.com.au/new-page</loc>
       <lastmod>2026-04-27T00:00:00+00:00</lastmod>
     </url>
     `
   - To remove a page: Delete the corresponding <url> block.
   - Update the <lastmod> date for changed pages to the current date.
3. **Automated Generation**: If you prefer, you can use online sitemap generators or scripts to regenerate the file based on your site's structure. Ensure the output matches the existing XML format.
4. **Validation**: After editing, validate the XML syntax (VS Code may highlight errors). Test by opening the file in a browser to ensure it's well-formed.

### Submitting to Google Search Console
1. **Access Google Search Console**:
   - Go to [Google Search Console](https://search.google.com/search-console).
   - Sign in with a Google account associated with the website.
2. **Add or Select Property**:
   - If not already added, click "Add Property" and enter your domain: cronullatriclub.com.au.
   - Verify ownership (e.g., via DNS record or HTML file upload as instructed).
3. **Submit Sitemap**:
   - In the left menu, go to "Sitemaps".
   - Click "Add a new sitemap".
   - Enter sitemap.xml (or the full URL https://cronullatriclub.com.au/sitemap.xml).
   - Click "Submit".
4. **Monitor Status**:
   - Google will process the sitemap and show the number of submitted and indexed pages.
   - Check for errors or warnings in the "Coverage" report.
   - Resubmit the sitemap after updates to ensure Google recrawls your site.

This process improves your site's visibility in Google search results. Submit the sitemap initially and after major changes.

## Part 6: Setting Up Jekyll for Local Development

To run the website locally with Jekyll (matching GitHub Pages behavior and ensuring clean URLs work correctly), follow these steps. Jekyll allows you to preview the site with the same URL structure as on GitHub Pages.

### Prerequisites
1. **Install Ruby**:
   - Download and install Ruby from [RubyInstaller for Windows](https://rubyinstaller.org/).
   - Choose the version with DevKit (e.g., Ruby+Devkit 3.2.x).
   - During installation, select "Add Ruby to PATH" and install MSYS2 if prompted.

2. **Install Jekyll and Bundler**:
   - Open a terminal (PowerShell or Command Prompt).
   - Run: `gem install jekyll bundler`

### Setup the Project
1. **Navigate to the Project Directory**:
   - Open VS Code and ensure you're in the project folder.

2. **Install Dependencies**:
   - In the terminal, run: `bundle install`
   - This installs Jekyll and the jekyll-sitemap plugin.

3. **Run the Local Server**:
   - Run: `bundle exec jekyll serve`
   - The site will be available at `http://localhost:4000`.
   - Jekyll will serve the static files with clean URLs (e.g., `/belong/membership` instead of `/belong/membership.html`).

### Configuration Notes
- The `_config.yml` file is configured for the site with `permalink: pretty` for clean URLs.
- The `Gemfile` includes necessary gems.
- If you add new pages, place them in the root or subfolders as `.html` or `.md` files.
- Jekyll will regenerate the sitemap automatically via the jekyll-sitemap plugin.

### Troubleshooting
- If you encounter errors, ensure Ruby and gems are installed correctly.
- For Windows, you may need to restart VS Code or your terminal after installation.
- If the server doesn't start, check for port conflicts (default is 4000).

This setup allows you to develop and test the site locally before pushing changes to GitHub.
