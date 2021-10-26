// ES6 module syntax
import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    listeningNow: "listening now",
    tapToStart: "tap to start",
    pressToStart: "press any key to start",
    changeStation: "change station",
    playPause: "play/pause",
    tweetThisStation: "tweet this station",
    changeGif: "change gif",
    showVideo: "show original video",
    lowPowerMode: "low-power mode",
    closeThis: "close this",
    sayHi: "Or click here to say hi!",
    updates: "New stations & updates",
    arrows: "arrows",
    spacebar: "spacebar",
  },
  ja: {
    tapToStart: "タップしてスタートしてください",
    pressToStart: "キーを押してスタートしてください",
  },
  it: {
    listeningNow: "in ascolto ora",
    pressToStart: "premi un tasto per cominciare",
    changeStation: "cambia stazione",
    playPause: "play/pausa",
    tweetThisStation: "twitta questa stazione",
    changeGif: "cambia gif",
    showVideo: "mostra video originale",
    lowPowerMode: "modalità low-power",
    closeThis: "chiudi",
    sayHi: "Clicca qui per scriverci!",
    updates: "Nuove stazioni & update",
    arrows: "frecce",
    spacebar: "spazio",
  },
  es: {
    listeningNow: "escuchando ahora",
    pressToStart: "presionar una cualquier tecla para empezar",
    changeStation: "cambiar de estaciòn",
    playPause: "play/pause",
    tweetThisStation: "tuitear esta estaciòn",
    changeGif: "cambiar el gif",
    showVideo: "mostrar video original",
    lowPowerMode: "modo low-power",
    closeThis: "cerrar",
    sayHi: "Hacer clic aqui para contactarnos",
    updates: "Recibir actualizaciones",
    arrows: "flechas",
    spacebar: "barra espaciadora",
  },
});

export default strings;
