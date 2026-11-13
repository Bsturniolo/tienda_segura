# tienda-segura

Taller DevSecOps: un pipeline de GitHub Actions que corre en cada pull request y revisa cuatro cosas.

| Línea del pipeline | Qué comprueba | Concepto |
|---|---|---|
| `npm test` | Que la lógica sigue funcionando | Pruebas automáticas |
| `npm audit --audit-level=high` | Vulnerabilidades conocidas en las librerías | SCA |
| `semgrep scan` | Patrones peligrosos en el código fuente | SAST |
| `gitleaks` | Claves y contraseñas en el código y el historial | Detección de secretos |

## Correr en local

```bash
npm ci
npm test
```

## Las cuatro fallas (paso 4)

Cada falla está en su propia rama. Al abrir la pull request contra `main`, se pone en rojo una puerta distinta.

| Rama | Paso en rojo | Mensaje esperado |
|---|---|---|
| `falla-secreto` | Gitleaks | Detecta un token de GitHub |
| `falla-codigo` | Semgrep | Marca la línea con `eval` |
| `falla-libreria` | npm audit | Vulnerabilidades altas en lodash |
| `falla-test` | npm test | El test esperaba 100 y recibió 300 |

## Los arreglos (paso 5)

Las ramas `arreglo-codigo`, `arreglo-libreria` y `arreglo-test` tienen la falla más el commit que la corrige. Para pasar una PR de rojo a verde, se empuja el arreglo sobre la rama de la falla:

```bash
git push origin origin/arreglo-codigo:falla-codigo
```

`falla-secreto` no tiene arreglo: borrar la línea no alcanza porque el token queda en el historial de la PR. Esa PR se cierra sin fusionar y se borra la rama. En un caso real, además, se revoca la clave.

> El token de `falla-secreto` es inventado, solo tiene el formato de un token de GitHub.
