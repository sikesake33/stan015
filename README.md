# Stan015 — Loznica renta (Web + Mobile)

Ovo je početni scaffold aplikacije za izdavanje stanova u Loznici i okolini. Projekat sadrži:
- Backend: Node.js + TypeScript + Express + Prisma (SQLite za razvoj; spremno za PostgreSQL).
- Frontend: Expo (React Native + React Native Web) + TypeScript — jedna baza koda za web i mobilno.

Fokus: dve vrste zakupa (dnevni i mesečni) su jasno odvojene.

Brzi koraci za lokalni razvoj:
1. Klonirajte repo i checkout-ujte branch feature/init-app:
   git clone git@github.com:sikesake33/stan015.git
   cd stan015
   git fetch origin
   git checkout -b feature/init-app origin/feature/init-app

2. Backend
   cd backend
   cp .env.example .env
   npm install
   npx prisma generate
   npx prisma migrate dev --name init
   npm run dev
   Backend će biti dostupan na http://localhost:4000

3. Frontend
   cd ../frontend
   npm install
   npm run web   # za web
   npm run start # za Expo (mobilno)

Napomena o plaćanju:
- Nije integrisano online plaćanje — aplikacija omogućava označavanje načina plaćanja (keš, uplata preko računa, itd).

Dalji koraci (predloženo):
- Autentikacija (JWT) i upravljanje korisnicima/ulogama
- Upload i skladištenje slika (Cloudinary / S3)
- Filteri i booking kalendar
- CI/CD i deployment (Render / Vercel) i prelazak na PostgreSQL u produkciji
