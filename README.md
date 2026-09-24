# Personal Project Portfolio

## Run locally

Run these commands in PowerShell:

```powershell
cd "C:\Courses\project website\portfolio"
npm.cmd install
npm.cmd run dev
```

Open the Local URL shown in the terminal, usually http://localhost:5173. If the port is in use, Vite selects another one. Keep the terminal running and press Ctrl+C to stop the server.

Skip `npm.cmd install` if dependencies are already installed. While the development server is running, saving changes in `src/` updates the browser automatically without a separate build.

## Personal links

Edit `src/profile.js` to change the name, headline, LinkedIn profile URL, and résumé URL shown above the projects. Set `linkedinUrl` to your full LinkedIn profile URL. For a local résumé, place your PDF in `public/` and set `resumeUrl` to its public path, such as `/resume.pdf` for `public/resume.pdf`. Add the actual PDF before setting that path. A hosted PDF URL also works.

The LinkedIn and Résumé buttons open in a new tab when configured. LinkedIn is set to [April Qi's profile](https://www.linkedin.com/in/april-qi-6341391b4/). The résumé file and link still need to be added. Leave either URL empty to show its button disabled until the link is available.

## Update projects

Edit `src/projects.js`. Each object creates a fully expanded project section, displayed in array order. The compact "Jump to a project" directory links to `#project-01` through `#project-05`. The page uses a white background and large dark text. Update `title`, `subtitle`, `description`, and `highlights` to change its content; keep each overview to a concise summary and up to three useful technical bullets. The `tags` supply the plain-text tools line. The optional `period` field displays project dates. An empty `github` field hides the repository link.

Place images and MP4 videos in the project's folder under `public/media/`, then add their paths to `src/projects.js`. A file at `public/media/...` is served at `/media/...`:

```js
images: [
  { src: '/media/light-thermistor-monitor/hardware-setup.jpg', alt: 'STM32F103 sensor hardware setup' },
  { src: '/media/light-thermistor-monitor/serial-telemetry.png', alt: 'Serial output showing light voltage and temperature' },
],
video: '/media/light-thermistor-monitor/demo.mp4', // Example path; add the file before using it.
```

Each section presents its first photo with the project overview, followed by the demo and its explanation, then any remaining evidence photos and their explanations. Each image and video appears once. Click a photo to open the in-page image viewer; use its arrows or the keyboard's left/right arrows to browse, and press Escape to close. Add an image `title` and optional `description` to explain it, and use `layout: 'portrait'` for portrait photos. Local MP4 videos use the browser's native player.

To embed a YouTube demo, add `youtubeId` to the project. Use the 11-character ID from its URL: `https://youtu.be/1CN9ugxQNpI` becomes:

```js
youtubeId: '1CN9ugxQNpI',
```

For YouTube Shorts, use the ID after `/shorts/` and set a portrait layout. For example, `https://youtube.com/shorts/5FxMfcI95cU` becomes:

```js
youtubeId: '5FxMfcI95cU',
videoLayout: 'portrait',
```

Omit `videoLayout` to use the default landscape layout, as used by the Simple iPod demo. Set `videoTitle` and `videoDescription` to give the demo a heading and short explanation.

Set the YouTube video to Unlisted or Public and allow embedding. The project section shows a responsive embedded player and a "Watch on YouTube" link. If both `youtubeId` and `video` are provided, the YouTube video takes precedence. Leave `youtubeId` empty or omit it to use a local MP4.

To add a project, copy an object and give it a unique `id`. The `category` field is a label, such as `Embedded Systems` or `FPGA & Digital Design`. The `flow` and `sourceNote` fields remain as reference metadata and are not displayed. Keep visible website text in English.

## Files

- `src/projects.js`: Project descriptions and media paths
- `src/profile.js`: Name, headline, LinkedIn link, and résumé link
- `src/App.jsx`: Page structure, project navigation, and expanded project sections
- `src/App.css`: Layout, colors, and responsive styles
- `src/index.css`: Global styles
- `index.html`: Page title and search description

## Check and build

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run preview
```

The production build is written to `dist/`. The preview command serves that build locally; publishing the website requires a hosting service.

## Project content

1. **Light & Thermistor Monitor:** Based on the supplied resume summary and GitHub repository.
2. **DE1-SOC simple ipod:** FPGA Song Player on DE1-SoC, May 2025 – Jun 2025. Based on the supplied implementation summary, with a link to the supplied GitHub repository.
3. **CV-8052 Display Controller:** Based on the CPEN312 Lab 4 specification, DE0-CV hardware photo, and supplied YouTube Shorts demo. Individual implementation details have not been independently verified.
4. **Digital Signal Synthesis:** Based on the GitHub repository and its README.pdf.
5. **Smart Embedded Fan Control:** STM32F103 fan controller with PWM speed and direction control, SG90 automatic oscillation, debounced buttons, and an I²C OLED display. Based on the supplied implementation summary and [GitHub repository](https://github.com/qsz746/Smart-Embedded-Fan-Control-System).

Seven project photos and three YouTube demos are included: **Light & Thermistor Monitor** (project 01, portrait), **DE1-SOC simple ipod** (project 02, landscape), and **CV-8052 Display Controller** (project 03, portrait). The remaining projects have no videos yet, and the original lab handout is not published with the website.

## Project photos

These files are included in `public/media/` and referenced by `src/projects.js`:

| Project | Photo | Path relative to `public/media/` |
| --- | --- | --- |
| 01 | Hardware setup | `light-thermistor-monitor/hardware-setup.jpg` |
| 01 | Serial telemetry | `light-thermistor-monitor/serial-telemetry.png` |
| 02 | DE1-SoC song player | `simple-ipod/DE1-SOC.jpg` |
| 03 | DE0-CV board | `cv-8052-display-controller/de0-cv-board.png` |
| 04 | FSK waveform display | `digital-signal-synthesis/fsk-waveforms.jpg` |
| 05 | Fan controller hardware setup | `smart-fan-controller/hardware-setup.png` |
| 05 | Fan controller wiring diagram | `smart-fan-controller/wiring-diagram.png` |

Keep filenames descriptive and use the extension matching the image format. Add future media to the relevant project folder and update `src/projects.js`. Preserve the exact spelling and capitalization of paths for deployment.
