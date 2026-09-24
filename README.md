# VATC Gallery V2

## Structure
- `index.html` — Firebase entry page
- `html/index.html` — editable page source
- `css/style.css` — design
- `js/app.js` — gallery/API/lightbox logic
- `assets/logo-vatc.jpg` — supplied VATC logo
- `google-apps-script/Code.gs` — Google Drive JSON API
- `firebase.json` / `package.json` — Firebase deployment

## Google Apps Script
1. Create a Google Apps Script project.
2. Copy `google-apps-script/Code.gs`.
3. Deploy > New deployment > Web app.
4. Execute as: Me.
5. Who has access: Anyone.
6. Copy the `/exec` URL.
7. In the gallery click `API`, paste URL, Save.

Drive folder ID is already set to:
`1tXdUTGcLTUaGxfendhpLScZtei9-6kTP`

For public visitors to load Drive thumbnails/downloads, the image files must have suitable Viewer/public access.

## Firebase
From this folder:
`npm install`
`npx firebase login`
`npx firebase deploy --only hosting`
