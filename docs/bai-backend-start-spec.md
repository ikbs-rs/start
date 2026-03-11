# BAI Backend Start Spec

Ovaj dokument je pocetna specifikacija za izradu posebnog backend servisa `bai`, uskladjeno sa dogovorom i postojecim standardom iz `backend-generator.yaml` + primerom iz `../bck_test`.

## 1. Scope (v1)

- Servis je poseban: `bai` (nije deo `badm`, `bcmn`, `btic`).
- Provider za AI je OpenAI.
- Istorija poruka: memory-only (bez baze u v1).
- Anonymous mode: ukljuciv/iskljuciv preko env promenljive.
- Frontend komunicira iskljucivo sa `bai` backendom (nikad direktno sa OpenAI).
- Auth za zasticene rute: samo `authGuard` (bez `permissionGuard`) u v1.

## 2. Arhitekturna pravila (MUST)

- Layering:
  - `routes`: samo registracija ruta + preHandler.
  - `controller`: request parsing + poziv service.
  - `service`: Zod validacija, business logika, provider routing.
  - `repository`: memory store operacije (u v1 bez SQL).
- Auth i permissions preko istog modela kao `bck_test`:
  - `authGuard`
  - `permissionGuard`
  - `PROTECT=Y|N`
  - podrska za JWKS i service token tok ka ADM.

## 3. Predlog strukture servisa

```txt
src/
  app.ts
  server.ts
  config/
    env.ts
    env.schema.ts
  middleware/
    authGuard.ts
    permissionGuard.ts
    errorHandler.ts
    rateLimiter.ts
  core/
    errors/
    services/
      admAuth.service.ts
      openai.provider.ts
    types/
      auth.ts
      ai.ts
  modules/
    aichat/
      aichat.dto.ts
      aichat.routes.ts
      aichat.controller.ts
      aichat.service.ts
      aichat.repository.ts
    index.ts
```

## 4. API base i rute (v1)

Predlog base path-a:
- `API_BASE_PATH = /bbai/bai`

Endpointi:
- `POST /bbai/bai/ai/chat`
- `POST /bbai/bai/ai/new-chat`
- `GET /bbai/bai/ai/quota`
- `GET /bbai/bai/health` (basic health)

Napomena:
- `new-chat` resetuje sesiju poruka.
- `quota` vraca trenutno stanje limita za konkretnu sesiju/IP.
- `chat/new-chat/quota` koriste `authGuard` kada je korisnik ulogovan; anonymous flow je dozvoljen samo ako je `AI_ALLOW_ANONYMOUS=Y`.

## 5. Env konfiguracija

Minimalni env:

```env
# Server
APP_PORT=8506
NODE_ENV=development
ROOT_DIR=bbai
LANG=sr_cyr
PROTECT=Y

# Auth / ADM integration
ADM_BACK_URL=http://localhost:8502/badm
ADM_SERVICE_CLIENT_ID=
ADM_SERVICE_CLIENT_SECRET=
ADM_JWKS_URL=

# AI provider
AI_PROVIDER=openai
OPENAI_API_KEY=
AI_MODEL=gpt-4.1-mini
AI_PROVIDER_TIMEOUT_MS=20000

# Anonymous mode
AI_ALLOW_ANONYMOUS=Y
AI_ANON_MAX_MESSAGES=20
AI_ANON_WINDOW_MS=86400000

# Pragmatic auth/permission switches
AI_REQUIRE_AUTH=Y
AI_REQUIRE_PERMISSION=N
AI_PERMISSION_CODE=BAI_CHAT

# Optional memory limits
AI_MAX_SESSIONS_IN_MEMORY=1000
AI_MAX_MESSAGES_PER_SESSION=200
```

Napomena:
- U v1 je `AI_REQUIRE_PERMISSION=N` (dogovoreno).
- `AI_PERMISSION_CODE` ostaje pripremljen za kasnije ukljucivanje `permissionGuard`.

## 6. Request/response contract (v1)

`POST /ai/chat` request:

```json
{
  "sessionId": "optional-string",
  "prompt": "string",
  "safeMode": true,
  "messages": [
    { "role": "user", "content": "..." }
  ]
}
```

`POST /ai/chat` response:

```json
{
  "status": true,
  "provider": "openai",
  "mode": "live",
  "sessionId": "string",
  "reply": "string",
  "quota": {
    "used": 3,
    "max": 20,
    "remaining": 17,
    "isLimitReached": false
  }
}
```

Rate-limit reached response:

```json
{
  "status": false,
  "code": "ANON_LIMIT_REACHED",
  "message": "Dostigli ste limit od 20 poruka za anonymous mode."
}
```

## 7. Memory-only model (v1)

Repository drzi:
- `sessions: Map<sessionId, ChatMessage[]>`
- `quotaByKey: Map<anonKey, QuotaState>`

`anonKey`:
- prioritet: `sessionId`
- fallback: `request.ip`

Cleanup strategija:
- periodicno brisanje isteklih quota i starih sesija.
- hard limit kroz `AI_MAX_SESSIONS_IN_MEMORY`.

## 8. OpenAI standardna komunikacija (v1)

Service tok:
1. Validacija input-a (Zod).
2. Auth/anon odluka:
   - ako nema user token i `AI_ALLOW_ANONYMOUS=N` -> 401.
   - ako je anonymous i quota potrosena -> 429.
3. Sastavljanje poruka (`system + history + user`).
4. Poziv OpenAI provider adaptera.
5. Upis poruke i odgovora u memory repository.
6. Response sa `reply + quota + provider`.

## 9. Buduca logika: lokalni podaci / lokalni LLM (v1.1+)

U `aichat.service.ts` predvideti `intent-routing` korak pre provider poziva:

- Ako korisnik trazi lokalne podatke (npr. "prikazi moje zahteve", "daj podatke iz sistema"):
  - servis NE salje odmah prompt ka OpenAI,
  - vraca:
    - ili strukturisan odgovor za lokalni LLM/alat,
    - ili follow-up pitanje za razjasnjenje (ako zahtev nije dovoljno precizan).
- Ako zahtev nije lokalni-data intent:
  - ide normalna OpenAI komunikacija.

Predlog flag-a za response:

```json
{
  "status": true,
  "mode": "local-routing",
  "needsClarification": true,
  "clarificationQuestion": "Koji vremenski opseg i koji modul zelis da pretrazim?"
}
```

## 10. Frontend integracija

Frontend (`start`) koristi:
- `AI_PROXY_URL` -> `http://localhost:8506/bbai/bai/ai/chat`
- postojeci `useLiveAI` switch ostaje validan:
  - `live` -> poziva `bai`
  - fallback -> mock lokalno u frontu

## 10.1 Pragmatic auth konfiguracija (uputstvo)

V1 (trenutni dogovor):
1. `AI_REQUIRE_AUTH=Y`
2. `AI_REQUIRE_PERMISSION=N`
3. `AI_ALLOW_ANONYMOUS=Y` (ili `N`, po okruzenju)

Predlog po okruzenjima:
1. Dev:
   - `PROTECT=N` ili `PROTECT=Y` + test tokeni
   - `AI_ALLOW_ANONYMOUS=Y`
   - `AI_REQUIRE_PERMISSION=N`
2. Test/Staging:
   - `PROTECT=Y`
   - `AI_ALLOW_ANONYMOUS=Y` (po potrebi QA)
   - `AI_REQUIRE_PERMISSION=N`
3. Prod:
   - `PROTECT=Y`
   - `AI_ALLOW_ANONYMOUS` po poslovnoj odluci
   - inicijalno `AI_REQUIRE_PERMISSION=N`, kasnije prebaciti na `Y` kada se mapira permisija u ADM

Kako kasnije ukljuciti permission kontrolu:
1. U ADM dodati permisiju `BAI_CHAT` (ili kod iz `AI_PERMISSION_CODE`).
2. Dodeliti permisiju odgovarajucim rolama.
3. U `bai` env postaviti `AI_REQUIRE_PERMISSION=Y`.
4. U rutama dodati `permissionGuard` uslovno prema env.
5. Verifikovati tok:
   - korisnik sa permisijom -> 200
   - korisnik bez permisije -> 403

## 11. Minimalni implementation plan (redosled)

1. Bootstrap `bai` projekta (Fastify + TS + env + middleware).
2. Preuzimanje auth pattern-a iz `bck_test` (`authGuard`, `permissionGuard`, `admAuth.service`).
3. Implementacija `aichat` modula sa memory repository.
4. OpenAI provider adapter + timeout + error mapiranje.
5. Anonymous quota mehanizam preko env parametara.
6. Health endpoint i osnovni log/observability.
7. Povezivanje sa frontend `AIService` (`AI_PROXY_URL`).

## 12. Otvorene tacke pre kodiranja

- Permission guard je odlozen za narednu fazu; v1 koristi samo `authGuard`.
- Da li da anonymous bude dozvoljen i u produkciji ili samo za dev/test okruzenje (uz dodatni env)?
- Da li odmah uvesti SSE/streaming odgovora ili ostati na klasicnom JSON response u v1?
