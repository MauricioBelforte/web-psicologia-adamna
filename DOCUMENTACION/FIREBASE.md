# Guía de Firebase Hosting — web-psicologia-adamna

Esta guía explica cómo está armado el despliegue de la web en Firebase, para que cualquier persona (o agente) pueda mantenerlo y continuarlo trabajando en local.

---

## 1. Resumen rápido

| Qué | Valor |
| --- | --- |
| Tipo de sitio | Estático: `index.html` + `assets/` + `js/`. Sin build, sin `package.json`. |
| Proyecto de Firebase | `ada-psicologa` (número `775542472208`) |
| Cuenta dueña del proyecto | La cuenta de Google de Ada (la clienta), **no** la del desarrollador |
| URL de producción | https://ada-psicologa.web.app (también https://ada-psicologa.firebaseapp.com) |
| Repositorio | https://github.com/MauricioBelforte/web-psicologia-adamna (público) |
| Rama de producción | `main` |
| Despliegue | Automático con GitHub Actions |
| Plan de Firebase | Spark (gratis) |

**Flujo de trabajo:**

```
rama nueva → commit → push → Pull Request
   └─ GitHub Actions publica una PREVIEW temporal (URL comentada en el PR)
merge del PR a main
   └─ GitHub Actions publica en PRODUCCIÓN (ada-psicologa.web.app)
git pull en local para quedar sincronizado
```

---

## 2. Archivos de configuración

### 2.1 `.firebaserc`

Le dice a la CLI de Firebase cuál es el proyecto por defecto. Es lo mismo que genera `firebase init`.

```json
{
  "projects": {
    "default": "ada-psicologa"
  }
}
```

### 2.2 `firebase.json`

Define qué se publica y cómo.

```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      ".firebaserc",
      "**/.*",
      "**/node_modules/**",
      "*.md",
      "DOCUMENTACION/**",
      "datos_negocio.json"
    ],
    "cleanUrls": true,
    "headers": [ ... caché ... ]
  }
}
```

- **`"public": "."`**: se publica la **raíz del repo**. Cualquier archivo nuevo que se agregue al repo queda público en la web, **salvo que esté en `ignore`**.
- **`ignore`**: lo que NO se publica:
  - `firebase.json` y `.firebaserc`: configuración.
  - `**/.*`: todos los archivos y carpetas que empiezan con punto (`.git`, `.github`, `.gitignore`, etc.).
  - `*.md`: el `README.md` de la raíz.
  - `DOCUMENTACION/**`: esta carpeta. Se lista explícitamente porque `*.md` puede no cubrir subcarpetas.
  - `datos_negocio.json`: datos internos del negocio.
- **`cleanUrls: true`**: permite URLs sin `.html`.
- **`headers`**: caché del navegador. Imágenes 7 días (`max-age=604800`), CSS/JS 1 hora (`max-age=3600`). Si un cambio de CSS/JS no se ve enseguida, probar con Ctrl+F5.

> **Regla importante:** si se agrega una carpeta o archivo que NO es parte de la web (documentación, scripts, datos), hay que sumarlo a `ignore`. Si no, se publica.

### 2.3 `.gitignore`

```gitignore
# Imágenes que se guardan solo en local (no se publican)
assets/img/testimonio_sintetico_*
assets/img/fondo_hero.jpg
```

Son imágenes que el desarrollador conserva en su compu "por las dudas" pero que no se usan. Como el deploy publica lo que hay en el repo, **lo que está en `.gitignore` nunca llega a la web**. Si algún día se quiere usar una de estas imágenes, hay que sacarla del `.gitignore` y commitearla.

### 2.4 Workflows de GitHub Actions (`.github/workflows/`)

#### `firebase-hosting-merge.yml` — Producción

```yaml
name: Deploy a Firebase Hosting (producción)
on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_ADA_PSICOLOGA }}
          channelId: live
          projectId: ada-psicologa
```

Cada push (o merge) a `main` publica en el canal `live`, que es producción.

#### `firebase-hosting-pull-request.yml` — Previews

```yaml
name: Preview en Firebase Hosting (PR)
on: pull_request
permissions:
  checks: write
  contents: read
  pull-requests: write
jobs:
  preview:
    if: ${{ github.event.pull_request.head.repo.full_name == github.repository }}
    ...
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_ADA_PSICOLOGA }}
          projectId: ada-psicologa
```

- Cada PR publica una **preview** en una URL temporal del estilo `https://ada-psicologa--pr6-<rama>-<hash>.web.app`.
- El bot `github-actions` comenta la URL en el PR y la actualiza con cada commit nuevo.
- La preview **vence a los 7 días** (es el valor por defecto de la action).
- El `if` hace que solo corra para ramas del mismo repo, no para forks, porque los forks no tienen acceso al secreto.
- En el PR aparecen dos checks: `preview` (el job) y `Deploy Preview` (el check que crea la action).

---

## 3. Autenticación: cuenta de servicio y secreto

GitHub Actions necesita permiso para publicar en el proyecto de Ada. Para eso se usa una **cuenta de servicio** de Google Cloud.

| Qué | Valor |
| --- | --- |
| Cuenta de servicio | `github-deploy@ada-psicologa.iam.gserviceaccount.com` |
| Roles | Administrador de Firebase Hosting, Visualizador de claves de API, Administrador de Firebase Authentication |
| Secreto en GitHub | `FIREBASE_SERVICE_ACCOUNT_ADA_PSICOLOGA` (contenido completo del JSON de la clave) |

- Los roles "Visualizador de claves de API" y "Administrador de Firebase Authentication" los necesitan las previews de los PR.
- El JSON de la clave **nunca** se sube al repo. Solo vive en el secreto de GitHub.
- Los agentes de IA normalmente **no** pueden ver ni editar secretos de GitHub (da error 403). Ese paso lo tiene que hacer una persona.

### 3.1 Cómo se creó (por si hay que rehacerlo o rotar la clave)

1. **Activar Hosting:** consola de Firebase → proyecto `ada-psicologa` → Compilación → Hosting → "Comenzar". Avanzar con "Siguiente" sin ejecutar nada.
2. **Crear la cuenta de servicio:** https://console.cloud.google.com/iam-admin/serviceaccounts?project=ada-psicologa
   - "Crear cuenta de servicio" → nombre `github-deploy` → "Crear y continuar".
   - Agregar los 3 roles de la tabla. Si la consola está en inglés: *Firebase Hosting Admin*, *API Keys Viewer*, *Firebase Authentication Admin*. Ojo: hay otro rol parecido, "Visualizador de claves de API con contenedores edge", que **no** es el correcto.
   - "Continuar" → "Listo".
3. **Crear la clave:** clic en la cuenta → pestaña "Claves" → Agregar clave → Crear clave nueva → JSON. Se descarga un archivo.
4. **Cargar el secreto:** https://github.com/MauricioBelforte/web-psicologia-adamna/settings/secrets/actions → "New repository secret".
   - Name: `FIREBASE_SERVICE_ACCOUNT_ADA_PSICOLOGA`
   - Secret: pegar todo el contenido del JSON.
5. **Borrar el JSON** de la compu, incluida la papelera.

**Para rotar la clave** (por ejemplo, si se filtró): crear una clave nueva (paso 3), actualizar el secreto (paso 4) y después borrar la clave vieja desde la pestaña "Claves".

---

## 4. Trabajar en local

No hace falta instalar nada para el flujo normal: GitHub Actions se encarga del deploy. Lo que sigue es opcional, para probar o publicar a mano.

### 4.1 Ver la web en local

Es HTML estático, así que alcanza con abrir `index.html` en el navegador. Para simular Firebase con los headers y `cleanUrls`, se puede usar el emulador (ver 4.2):

```bash
firebase emulators:start --only hosting
# abre http://localhost:5000
```

### 4.2 Instalar la CLI de Firebase

Requiere Node.js.

```bash
npm install -g firebase-tools
firebase login          # iniciar sesión con una cuenta que tenga acceso al proyecto
firebase projects:list  # debería aparecer ada-psicologa
```

La cuenta tiene que ser la de Ada, o una cuenta agregada como miembro del proyecto (Configuración del proyecto → Usuarios y permisos). Se recomienda agregar la cuenta del desarrollador como "Editor" o "Propietario" para no depender de la cuenta de Ada.

### 4.3 Deploy manual (no recomendado salvo emergencia)

```bash
firebase deploy --only hosting
```

> **Atención:** cada deploy reemplaza **todo** el sitio. El próximo push a `main` va a pisar lo que se haya publicado a mano con lo que haya en el repo. Por eso la fuente de verdad es siempre `main` en GitHub.

### 4.4 Preview manual

```bash
firebase hosting:channel:deploy prueba --expires 7d
```

Devuelve una URL temporal y no toca producción.

### 4.5 Volver a una versión anterior

Consola de Firebase → Hosting → historial de versiones → en una versión anterior, menú ⋮ → "Revertir". Después conviene también revertir el commit en `main`, porque si no el próximo deploy vuelve a publicar la versión mala.

---

## 5. Flujo de cambios con Git (paso a paso)

```bash
git checkout main
git pull
git checkout -b nombre-de-la-rama
# ...hacer cambios...
git add <archivos>
git commit -m "Se corrigió ..."
git push -u origin nombre-de-la-rama
```

1. Abrir el Pull Request en GitHub contra `main`.
2. Esperar los checks (`preview` y `Deploy Preview`) y abrir la URL de preview que comenta el bot.
3. Revisar la preview. Si está bien: "Merge pull request" → "Confirm merge" → "Delete branch".
4. En la pestaña **Actions** se ve correr "Deploy a Firebase Hosting (producción)". Cuando queda en verde (1–2 min), el cambio ya está en https://ada-psicologa.web.app.
5. En local: `git checkout main` y `git pull`.

**Estilo de los mensajes de commit:** en español, en pasado impersonal. Por ejemplo: "Se agregó…", "Se corrigió…", "Se eliminaron…".

---

## 6. Decisiones tomadas y por qué

- **El proyecto de Firebase está en la cuenta de Ada**, porque ella es la dueña de la web. El repo está en la cuenta de GitHub del desarrollador. Los dos se conectan solo a través del secreto.
- **Deploy automático en vez de `firebase deploy` manual**, para que cada merge a `main` se publique solo y cada PR tenga su preview.
- **Los archivos de "Recursos Profesionales"** (PDF, docs) **NO van al repo ni a Firebase.** Se guardan en el Google Drive de Ada, compartidos como "Cualquier persona con el enlace → Lector", y las tarjetas de la sección `#recursos` en `index.html` solo enlazan a Drive. Motivos: el repo es público y no se quiere llenar de material que no es código; además un deploy pisaría cualquier archivo subido a mano a Hosting.
  - Link a una **carpeta** de Drive si el contenido cambia seguido; link a un **archivo** si es un documento fijo.
  - Para actualizar un PDF sin que cambie el link: en Drive, Información del archivo → Gestionar versiones → Subir nueva versión.
- **Firebase Storage no se usa**, porque exige pasar al plan Blaze (con tarjeta de crédito).
- **Las imágenes que no se usan** pero se quieren conservar quedan solo en local, ignoradas por `.gitignore`.

---

## 7. Límites del plan Spark (gratis)

- Almacenamiento de Hosting: 10 GB.
- Transferencia: unos 360 MB por día.
- Para una web como esta (HTML + algunas imágenes) alcanza de sobra. Conviene que las imágenes sean livianas (idealmente menos de 500 KB cada una).

---

## 8. Dominio propio (pendiente / opcional)

Consola de Firebase → Hosting → "Agregar dominio personalizado". Firebase indica qué registros DNS (TXT para verificar y A/CNAME) cargar en el proveedor del dominio. El certificado HTTPS se genera solo y puede tardar unas horas. Se recomienda que el dominio también esté a nombre de Ada.

---

## 9. Problemas conocidos y soluciones

| Síntoma | Causa | Solución |
| --- | --- | --- |
| El check de preview falla con `Input required and not supplied: firebaseServiceAccount` | Falta el secreto en GitHub, o tiene otro nombre | Cargar `FIREBASE_SERVICE_ACCOUNT_ADA_PSICOLOGA` (sección 3) |
| La preview falla por permisos | A la cuenta de servicio le falta un rol | Revisar los 3 roles en IAM |
| Un archivo interno se ve en la web | No está en `ignore` de `firebase.json` | Agregarlo a `ignore`. Verificar que en la preview dé 404 |
| Un cambio no se ve en producción | Caché del navegador, o el deploy todavía no terminó | Ctrl+F5 y revisar la pestaña Actions |
| Algo publicado a mano desapareció | El deploy desde `main` reemplaza todo el sitio | Commitear el cambio en el repo |
| Advertencia de Node.js en Actions | Versión vieja de una action | Actualizar la versión (por ejemplo, `actions/checkout@v5`) |
| GitHub avisa "Your main branch isn't protected" | Sugerencia de GitHub, no es un error | Opcional: Settings → Rules → Rulesets, con "Restrict deletions" y "Block force pushes" |

**Verificar qué se publica** (en una preview o en producción):

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://ada-psicologa.web.app/                 # 200
curl -s -o /dev/null -w "%{http_code}\n" https://ada-psicologa.web.app/README.md        # 404
curl -s -o /dev/null -w "%{http_code}\n" https://ada-psicologa.web.app/firebase.json    # 404
curl -s -o /dev/null -w "%{http_code}\n" https://ada-psicologa.web.app/DOCUMENTACION/FIREBASE.md  # 404
```

---

## 10. Checklist para un agente que continúe el trabajo

- [ ] Leer esta guía y `README.md`.
- [ ] Trabajar siempre en una rama nueva y abrir un PR. No pushear directo a `main`.
- [ ] Commits en español, en pasado impersonal.
- [ ] Si se agregan archivos que no son de la web, sumarlos a `ignore` en `firebase.json`.
- [ ] No subir PDF/docs de recursos al repo: van en Drive.
- [ ] No borrar imágenes sin confirmar con el dueño del repo.
- [ ] No commitear claves ni el JSON de la cuenta de servicio.
- [ ] Revisar la URL de preview del PR antes de mergear.
- [ ] Después del merge, confirmar en Actions que el deploy quedó en verde.
