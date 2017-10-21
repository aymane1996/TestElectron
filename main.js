// The App entry Point:
/*
   * Le Fichier principal de Configuration (Main Process)
   * Il permet de creer l'interface GUI en s'aidant de la librairie (electron)
*/

// Declaration des constantes => directement liées a electron:
const electron = require('electron')            // Import de electron
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;   // Utilisation de (BrowserWindow > (electron.class)) pour instancier une GUI

// Modules Cross-Platform specifique a Nodejs:
const path = require('path');
const url = require('url');

// Creation de la fonction createGUI:
let win;
function createGUI()
{
   // Instanciation de BrowserWindow:
   win = new BrowserWindow({
      width: 600,
      height: 500,
      backgroundColor: '#FFCCBC'
   });

   // Loader la ressource html directement du disque dur en utilisant la methode (loadURL):
   win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
   }));

   // Ouvrir les Outils de developpement lors du lancement de l'app:
   win.webContents.openDevTools();

   // Fermeture du WebPreview => fermeture de l'application (garbage-collected):
   // Lors de l'evenement (closed) => win = null:
   win.on('closed', () => {
      win = null;
   });
}

// Appel de la fonction createGUI lors de l'evenement (ready):
app.on('ready', createGUI);

// Fermeture specifique pour les systemes de Fichier du type (darwin) => MACOS:
app.on('window-all-closed', function(){
   if(process.platform !== 'darwin')
   {
      app.quit();
   }
})