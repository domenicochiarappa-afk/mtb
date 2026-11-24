# Lux Bike 2

Pianifica, registra e condividi i giri in bici in Lussemburgo.

## Funzioni
- **Pianifica**: scegli una partenza qualsiasi (tocco sulla mappa o "Parti da qui") e i km desiderati; l'app propone 3 giri ad anello, ordinati per vicinanza ai km richiesti e quota di ciclabili (BRouter + OpenStreetMap).
- **Registra**: GPS in tempo reale con tempo, km, velocità, media e salita; pausa/ripresa; percorso guida opzionale. Lo schermo resta acceso durante la registrazione.
- **Storico**: sessioni salvate sul dispositivo, con mappa e statistiche.
- **App fitness**: esporta in GPX (Strava, Garmin Connect, Komoot...) oppure salva in Apple Salute.

## Avvio
```
npm install
npx expo install --fix
npx expo start
```
In **Expo Go** funziona tutto tranne "Salva in Apple Salute".

## Apple Salute (richiede build nativa)
Serve una build di sviluppo, non Expo Go:
```
npx expo run:ios            # con Mac e Xcode
# oppure, senza Mac:
npm i -g eas-cli && eas build -p ios --profile development
```
Servono un account Apple Developer e HealthKit attivo per l'app.

## Limiti noti
- La registrazione funziona con l'app in primo piano (schermo acceso). Per registrare a schermo bloccato servono la posizione in background e `expo-task-manager`.
- La salita è stimata dall'altitudine GPS ed è approssimativa.
- Servizi pubblici gratuiti (BRouter, tile CyclOSM) con limiti d'uso.
