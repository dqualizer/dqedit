# Verwende das offizielle Node.js-Image als Basis
FROM --platform=$BUILDPLATFORM node:20-slim

# Setze das Arbeitsverzeichnis im Container
WORKDIR /usr/src/app

# Kopiere package.json und package-lock.json in das Arbeitsverzeichnis
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den Rest des Quellcodes in das Arbeitsverzeichnis
COPY . .

# Baue die Next.js-App im Produktionsmodus
RUN npm run build

# Exponiere den Port, auf dem die Anwendung läuft
EXPOSE 3000

# Starte die Anwendung
CMD ["npm", "start"]
