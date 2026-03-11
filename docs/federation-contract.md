# Federation Contract (Korak 1 - bez runtime promena)

Datum: 2026-03-06  
Status: Draft v1

## 1) Ucesnici i uloge

- `start` - host shell aplikacija (ulazna tacka)
- `itm` - remote kontejner (`front-itm`)
- `tsitm` - remote kontejner (`ts-itm`)

## 2) Remote identiteti

- Container name za `front-itm`: `itm`
- Container name za `ts-itm`: `tsitm`
- Host name: `start`

Napomena: ova imena moraju biti identicna u Vite Federation konfiguraciji (`name`, `remotes`, `exposes`).

## 3) Sta se izlaze (minimalni pocetak)

Cilj: oba remota izlažu po jednu komponentu istog poslovnog tipa.

- `itm` izlaže: `./CmnLoctpLista`
- `tsitm` izlaže: `./CmnLoctpLista`

Mapiranje na fajlove:

- `front-itm`: `cmnLoctpLista.js` (tacna relativna putanja se potvrđuje u Koraku 2)
- `ts-itm`: `cmnLoctpLista.(ts|tsx)` ili JS ekvivalent (tacna putanja se potvrđuje u Koraku 2)

## 4) Nazivi modula za import u host-u

Host (`start`) koristi sledece nazive:

- `itm/CmnLoctpLista`
- `tsitm/CmnLoctpLista`

Ovo je jedini dozvoljeni javni API u v1 contract-u za ova 2 remota.

## 5) Dev adrese (za kasniju konfiguraciju)

- `start`: `http://localhost:8351`
- `itm`: `http://localhost:8091` (bazni UI trenutno na `/itm/`)
- `tsitm`: `http://localhost:8092` (bazni UI trenutno na `/tsitm/`)

Napomena: tacan `remoteEntry` URL format se uvodi u Koraku 2 (konfiguracija plugina).

## 6) Deljene biblioteke (policy)

U federation konfiguraciji svi servisi treba da dele iste verzije:

- `react`
- `react-dom`
- `react-router-dom`

Pozeljno: singleton strategija za React stack.

## 7) Test i rollback za Korak 1

- Test: nema runtime promene (samo dokument, nema promene u kodu/konfiguraciji)
- Rollback: nije potreban

## 8) Prihvatni kriterijumi Koraka 1

- Definisani kontejneri: `start`, `itm`, `tsitm`
- Definisano izlaganje minimalno jedne komponente po remote-u (`CmnLoctpLista`)
- Definisani import nazivi koje host koristi
