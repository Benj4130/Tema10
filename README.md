# Teknisk dokumentation for Tema 8 gruppeprojekt

Når man er flere der bidrager til en kodebase, lærer man hurtigt, at ens sædvanlige måder at gøre tingene på ikke nødvendigvis er logisk for alle.

Skriv derfor jeres fælles retningslinjer for punkterne herunder(tilføj gerne flere selv), sådan som det giver bedst mening for jer som gruppe. Dokumentationen sikre, at jeres fælles kodebase forbliver overskuelig, er let at arbejde med og til at forstå for alle, og at I undgå konflikter, og har nemmere ved at hjælpe hinanden undervejs.

## Projektstruktur:

Beslut, hvordan I vil organisere jeres projekt – struktur for mapper og filer.

## - Hvordan organiserer I billeder, fonte og andre ressourcer?

Vi har organiseret vores assets i separate mapper. Billeder ligger i /images, CSS i /css og JavaScript i /js. Dette gør det nemt at finde og arbejde med filer.

## - Hvor placerer I boilerplate?(fx CSS- og JavaScript-filer, der bruges på tværs af projektet)

Boilerplate ligger i vores globale CSS filer (fx style.css) og fælles JavaScript funktioner i JS filer, som kan bruges på tværs af sider.

## - Hvor placerer I HTML, CSS- og JavaScript-filer til fx detaljevisning og listevisning?

HTML filer ligger i roden (index, matches, profile, about). CSS og JavaScript er opdelt i mapper og navngivet efter siden, fx matches.js og profile.js.

## Navngivning:

Beslutte hvordan i vil navngive filer og mapper for at sikre en ensartet struktur og undgå forvirring.

## - Hvordan navngiver I filnavne? (fx små bogstaver, ingen mellemrum, brug af eller \_)

Vi bruger små bogstaver, ingen mellemrum og bindestreg (-). Eksempel: matches.html.

## - Hvordan sikre I at det er til at forstå hvilke HTML-, CSS- og JavaScript-filer der høre sammen?

Vi bruger samme navn på filer, så det er nemt at se sammenhængen, fx matches.html, matches.js og matches.css.

## Link til scripts:

## - Hvor placerer I script referencer i HTML'en? (fx i <head> med defer attribute, eller sidst i <body>)

Vi placerer scripts i <head> med defer, så HTML loader først og JavaScript kører bagefter.

## Git branches:

## - Hvordan navngiver I branches, så alle kan forstår hvem der arbejder i branchen og på hvad?(fx feature-lotte-formular)

Vi navngiver branches efter funktion, fx feature-filter, feature-profile eller fix-bug, så det er tydeligt hvad der arbejdes på.

## Arbejdsflow:

## - Hvordan fordeler I arbejdet, så I undgår at flere arbejder i de samme filer samtidigt?

Vi fordeler opgaver via Trello og sørger for at én arbejder på én feature ad gangen.

## - Hvordan sikrer I, at commit-beskeder er beskrivende?

Vi skriver korte og klare commit-beskeder, fx "lavet filter funktion".

## - Hvordan kommunikerer i om ændringer i main branchen når feature merges?

Vi giver besked til gruppen, når noget er merged til main, så alle er opdateret.

## Kode:

## - Hvordan skriver i funktioner i JavaScript?(fx med function keyword eller som arrow functions)

Vi bruger almindelige functions (function keyword), så det er nemt at læse.

## - Beslut hvilken CSS selector i benyttes til referener i henholdsvis CSS og JavaScript(fx. id'er til JavaScript og Classes til CSS)

JavaScript(fx. id'er til JavaScript og Classes til CSS)
Vi bruger classes til CSS og querySelector i JavaScript til at hente elementer.

## - Skal filer have korte forklaringer som kommentarer?

Ja, vi skriver korte kommentarer hvor det er nødvendigt for at gøre koden nemmere at forstå.

# Funktionalitet

Dette afsnit skal forklare hvad I konkret har arbejde med, for at udvikle websitet. Tænk over hvilke interaktioner brugeren kan foretage på sitet? Eller hvordan websitet håndterer og præsenterer data? Eksempler på funktionalitet, der kan beskrives:

## - Hentning af produkter fra API.

Vi henter brugere fra DummyJSON API ved hjælp af fetch.

## - Filtrering af produkter baseret på brugerens valg.

Brugeren kan filtrere profiler baseret på køn, alder, hårfarve og øjenfarve.

## - Dynamisk visning af produkter i HTML.

Data fra API vises dynamisk som kort på siden via JavaScript.

# API endpoints

Dette afsnit skal liste de endpoints fra API'et i har benyttet:

- https://dummyjson.com/users

- https://dummyjson.com/users/{id}

# Dokumentation af Funktion

Dette afsnit skal beskrive en funktion I selv har udviklet. Det kunne eksempelvis være en funktion der generere en listen over fx. produkter:

## - Beskrivelse: Hvad gør funktionen? Hvordan spiller den sammen med resten af koden?

Funktionen `applyFilters()` filtrerer alle brugere ud fra de filtre, brugeren har valgt, som fx køn, øjenfarve, hårfarve og alder. Funktionen arbejder sammen med `buildFilterUI()`, hvor filtrene vælges, og med `showPeople()`, som viser de filtrerede profiler på siden.

## - Parametre: Hvilke input forventes (fx en værdi fra en dropdown eller URL'en)?

Funktionen tager ikke parametre direkte, men bruger de globale variabler `allPeople` og `activeFilters`. `allPeople` indeholder alle brugere fra API’et, og `activeFilters` indeholder de filtre, brugeren har valgt.

## - Returnerer: Beskriv, om funktionen returnerer en værdi eller blot manipulerer DOM’en.

Funktionen returnerer ikke en værdi. Den filtrerer data og sender resultatet videre til `showPeople()`, som opdaterer HTML’en.

## - Eksempel på brug: Indsæt funktions-koden herunder(der hvor koden er i eksemplet) og vis, hvordan funktionen kaldes:

```javascript
function applyFilters() {
  let filtered = allPeople;

  if (activeFilters.eyeColor) {
    filtered = filtered.filter((p) => p.eyeColor?.toLowerCase() === activeFilters.eyeColor);
  }

  if (activeFilters.hairColor) {
    filtered = filtered.filter((p) => p.hair?.color?.toLowerCase() === activeFilters.hairColor);
  }

  if (activeFilters.ageRange) {
    const [min, max] = activeFilters.ageRange.split("-").map(Number);
    filtered = filtered.filter((p) => p.age >= min && p.age <= max);
  }

  if (activeFilters.gender) {
    filtered = filtered.filter((p) => p.gender === activeFilters.gender);
  }

  showPeople(filtered);
}

// hvordan funktionen bruges:
applyFilters();
```
