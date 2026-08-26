# AGENTS.md - Nezu Content Creator Website

## Info Progetto
- **Sito live**: https://aliandrea96.github.io
- **GitHub repo**: https://github.com/AliAndrea96/AliAndrea96.github.io
- **Buy Me a Coffee**: https://buymeacoffee.com/nezu_ita

## Struttura Cartella SitoWeb
```
SitoWeb/
├── index.html      # Pagina principale
├── style.css       # Stili e animazioni
├── script.js       # Particelle, effetti interattivi, coin burst
├── Logo.jpg        # Logo/Avatar del creator
└── AGENTS.md       # Questo file (NO push su GitHub)
```

## Palette Colori
- 🔴 Rosso Neon (Primario): #FF2B34
- 🍷 Rosso Scuro (Secondario): #6B1120
- ⬛ Nero Antracite (Background): #191A1E
- ⚪ Bianco (Testo): #FFFFFF
- ⚡ Giallo Elettrico (Highlight): #FFDF00
- 💠 Ciano Glitch (Dettaglio): #38E1FF

## Link Social del Creator
- TikTok: https://www.tiktok.com/@nezu_ita
- YouTube: https://www.youtube.com/@Nezu_ITA
- Twitch: https://www.twitch.tv/nezu_ita
- Kick: https://kick.com/nezu-ita
- Instagram: https://www.instagram.com/andrea_alii
- Discord: https://discord.gg/FTxE8kSKSV

## Funzionalità Sito
1. Particelle floating animate (palette colori)
2. Avatar con glow rotante (conic-gradient)
3. Link card con magnetic hover effect
4. Sezione donazioni con PC gaming SVG + coin burst animation
5. Tilt 3D sulla card donazioni
6. Parallax effect sullo scroll
7. Responsive mobile-first

## Note Importanti
- Logo.jpg va sostituito con il logo reale del creator
- Il sito è hostato su GitHub Pages (gratuito)
- Buy Me a Coffee usa Stripe per i pagamenti
- Il contatore monete è solo visuale (non legato a donazioni reali)
- AGENTS.md NON va pushato su GitHub (è solo per riferimento locale)

## Comandi Git utili
```bash
# Push modifiche
Copy-Item "C:\Users\Andrea\Desktop\SitoWeb\*" -Destination "C:\Users\Andrea\AppData\Local\Temp\opencode\site-repo\" -Recurse -Force
cd C:\Users\Andrea\AppData\Local\Temp\opencode\site-repo
git add .
git commit -m "Descrizione modifica"
git push origin main
```

## Ultimo aggiornamento
- Sito deployed e funzionante
- Sezione donazioni con coin burst animation
- Profile section migliorata (senza stats)
- Footer: "Nezu Content Creator © 2026"
- Tutti i link social inseriti correttamente
