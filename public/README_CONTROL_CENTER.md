# MindClaw 3D Control Center

## Vista General

Centro de control 3D isométrico que visualiza todos los agentes AI y sistemas de MindClaw en un dashboard interactivo profesional.

## Archivos

- `index.html` - Página principal (mismo contenido que control center)
- `mindclaw_3d_control_center.html` - Control center completo

## Características

### 8 Islas/Plataformas

1. **Orchestration Layer** (Centro - Verde)
   - Coordinación central de todos los agentes
   - 24 agentes activos
   - 1,200+ tareas diarias
   - 98% uptime

2. **Data Engineer Island** (Azul)
   - 8 pipelines ETL
   - 156TB procesados diariamente
   - Gestión de conexiones a bases de datos

3. **Automation Hub** (Verde)
   - 42 workflows de N8N
   - 3,400+ ejecuciones por día
   - Automatización multi-plataforma

4. **BI & Analytics Island** (Amarillo)
   - 128 reportes generados
   - 24 dashboards activos
   - Consultas SQL optimizadas

5. **Data Science Island** (Púrpura)
   - 12 modelos ML en producción
   - 89% precisión promedio
   - Training continuo

6. **Vision AI Island** (Cyan)
   - 892 imágenes procesadas por hora
   - 94% precisión en OCR
   - Detección de objetos

7. **Web Apps Island** (Rosa)
   - 18 aplicaciones deployadas
   - 99.9% uptime
   - CI/CD automatizado

8. **Governance Island** (Rojo)
   - Status: COMING SOON
   - Compliance y auditoría
   - Detección de PII

### Interactividad

- **Click en isla**: Abre modal con detalles completos
- **Drag**: Rota la vista 3D
- **Scroll**: Zoom in/out
- **Botón "Reset View"**: Vuelve a vista original
- **Botón "Auto Rotate"**: Rotación automática

### Elementos Visuales

- Plataformas 3D isométricas con glassmorphism
- Avatares/workers animados en cada isla
- Mini-dashboards con métricas en tiempo real
- Líneas de conexión animadas entre islas
- Partículas flotantes en el fondo
- Estados de color: ACTIVE (verde), TRAINING (amarillo), COMING SOON (gris)

### Paleta de Colores

- Azul claro: `#A8DAFF`
- Verde menta: `#B8F4C8`
- Amarillo suave: `#FFE8A3`
- Rosa pastel: `#FFB8D1`
- Púrpura suave: `#D4BFFF`
- Cyan: `#BFEEFF`
- Fondo: `#F0F7FF`

## Cómo Abrir

### Opción 1: Archivo local
```bash
open /Users/javiercorrea/mindclaw/public/index.html
```

### Opción 2: Servidor local
```bash
cd /Users/javiercorrea/mindclaw/public
python3 -m http.server 8000
# Luego abrir: http://localhost:8000
```

### Opción 3: Live Server (VS Code)
1. Instalar extensión "Live Server"
2. Click derecho en `index.html`
3. Seleccionar "Open with Live Server"

## Responsive

- Desktop: Vista completa con todas las animaciones
- Tablet: Islas más pequeñas pero funcional
- Mobile: Adaptado para pantallas pequeñas

## Tecnologías

- HTML5 + CSS3
- Vanilla JavaScript
- CSS 3D Transforms (isométrico)
- Canvas API (partículas)
- Animaciones CSS
- Glassmorphism
- Responsive Design

## Personalización

Para agregar una nueva isla, editar el HTML:

1. Agregar nuevo `div.island` con posicionamiento
2. Agregar datos en el objeto `islandData` en JavaScript
3. Actualizar array de `connections` para líneas de conexión

## Performance

- Animaciones optimizadas con `requestAnimationFrame`
- CSS transforms con GPU acceleration
- Lazy loading de modal
- Partículas limitadas a 50 para rendimiento

## Navegadores Soportados

- Chrome/Edge: 100%
- Firefox: 100%
- Safari: 100%
- Mobile browsers: 95%

---

Creado para MindClaw - AI Agent Orchestration Platform
