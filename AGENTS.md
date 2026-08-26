# AGENTS.md - Istruzioni Progetto SitoWeb

## Contesto
Questo è il sito link-in-bio per un content creator TikTok.
Il sito è hostato gratuitamente su GitHub Pages.

## Struttura Progetto
```
SitoWeb/
├── index.html      # Pagina principale
├── style.css       # Stili e animazioni
├── script.js       # Particelle, effetti interattivi
├── Logo.jpg        # Logo del creator (usa come avatar)
└── AGENTS.md       # Questo file
```

## Palette Colori (da Gemini)
- 🔴 Rosso Neon (Primario): `#FF2B34` - Bottoni, bordi, link in evidenza
- 🍷 Rosso Scuro (Secondario): `#6B1120` - Gradienti, sfondi, card
- ⬛ Nero Antracite (Background): `#191A1E` - Sfondo principale dark mode
- ⚪ Bianco (Testo): `#FFFFFF` - Titoli e testi leggibili
- ⚡ Giallo Elettrico (Highlight): `#FFDF00` - Notifiche, badge, dettagli a contrasto
- 💠 Ciano Glitch (Dettaglio): `#38E1FF` - Hover, effetti grafici

## Personalizzazioni da fare
- [x] Logo.jpg usato come avatar
- [x] Palette colori applicata
- [ ] Sostituire "Il Tuo Nome" con il nome reale del creator
- [ ] Aggiornare tutti gli username (@tuoaccount) con quelli reali
- [ ] Aggiornare gli URL dei link con quelli reali
- [ ] Aggiornare la sezione donazioni (PayPal/Ko-fi link e importi)

## Deploy
1. Creare repo GitHub: `tuo-username.github.io`
2. Caricare tutti i file nella root
3. Settings → Pages → branch main
4. URL finale: `https://tuo-username.github.io`

## Note tecniche
- Nessuna dipendenza esterna (tranne Google Fonts)
- Totalmente statico (HTML + CSS + JS puro)
- Responsive mobile-first
- Effetti: particelle floating, glow rotante, magnetic hover, tilt 3D, ripple, parallax