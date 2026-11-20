# Leggio musicale: pubblicazione su GitHub Pages

## 1. Crea il repository
1. Accedi a github.com con il tuo account personale (non quello aziendale).
2. Tocca **New repository**, scegli un nome (per esempio `leggio`) e lascialo **Public**.
   Con un account gratuito GitHub Pages funziona solo con repository pubblici.
3. Nel repository tocca **Add file > Upload files** e trascina TUTTI i file di questa cartella
   (index.html, manifest.json, songs.json, sw.js, le quattro icone .png e la cartella `songs`). Poi **Commit changes**.

## 2. Attiva GitHub Pages
1. Nel repository vai su **Settings > Pages**.
2. In **Build and deployment** scegli **Deploy from a branch**, branch **main**, cartella **/ (root)**, poi **Save**.
3. Dopo uno o due minuti la pagina mostra l'indirizzo, di solito
   `https://TUONOME.github.io/leggio/`

## 3. Installa sul telefono
- **iPhone:** apri l'indirizzo in Safari, tocca Condividi, poi «Aggiungi alla schermata Home».
- **Android:** apri l'indirizzo in Chrome, menu con i tre puntini, «Installa app» o «Aggiungi a schermata Home».

Apri l'app una volta con la rete accesa: da quel momento funziona anche offline.
La band può installarla dallo stesso indirizzo.

## 4. Aggiungere un brano per tutta la band
1. Nel repository apri la cartella `songs` e scegli **Add file > Upload files**: carica il file .txt
   (accordi o tablatura). Poi **Commit changes**.
2. Apri `songs.json`, tocca la matita per modificarlo e aggiungi una riga per il brano:

       {"title": "Titolo del brano", "file": "songs/nome-file.txt", "bpm": 100, "bpc": 1, "sig": 4}

   - `bpm` è il tempo, `bpc` le battute per accordo (0.5, 1, 2 o 4), `sig` i battiti per battuta (3, 4 o 6).
   - Le righe vanno separate da una virgola e tutto l'elenco sta fra le parentesi quadre `[ ]`.
   - Se un nome contiene accenti o spazi, usa file senza accenti e senza spazi (per esempio `californication.txt`).
3. Dopo uno o due minuti il brano compare nel menu «Brani della band» di tutti.
   Chi ha già aperto l'app lo vede alla prossima apertura con la rete accesa e da quel momento anche offline.

Il repository è pubblico: chiunque abbia l'indirizzo può leggere i file. Per questo conviene caricare
accordi e tablature senza le parole delle canzoni, che sono protette dal diritto d'autore.

Il pulsante «Testo e file» resta disponibile per provare un brano solo sul tuo telefono, senza condividerlo.

## 5. Aggiornamenti dell'app
Se modifichi i file, carica la nuova versione su GitHub e cambia il numero in `sw.js`
(`leggio-v1` diventa `leggio-v2`), altrimenti i telefoni tengono la copia vecchia.
