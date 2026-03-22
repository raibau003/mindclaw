# MindClaw 3D Control Center - Quick Start

## Abrir el Control Center

**Método más rápido:**
```bash
open /Users/javiercorrea/mindclaw/public/index.html
```

**O usa el script:**
```bash
/Users/javiercorrea/mindclaw/open_control_center.sh
```

## Controles

| Acción | Control |
|--------|---------|
| Rotar vista | Arrastrar (drag) con mouse |
| Zoom in/out | Scroll del mouse |
| Ver detalles | Click en una isla |
| Reset vista | Botón "Reset View" |
| Auto-rotate | Botón "Auto Rotate" |
| Cerrar modal | Click en X o fuera del modal |

## Las 8 Islas

1. **🎯 Orchestration Layer** (Centro) - Coordinación central
2. **🔧 Data Engineer** - Pipelines y ETL
3. **⚙️ Automation Hub** - N8N workflows
4. **📈 BI & Analytics** - Dashboards y reportes
5. **🧪 Data Science** - Modelos ML
6. **👁️ Vision AI** - OCR y detección
7. **🌐 Web Apps** - Aplicaciones deployadas
8. **🛡️ Governance** - Compliance (próximamente)

## Archivos Creados

```
/Users/javiercorrea/mindclaw/
├── public/
│   ├── index.html (40KB)                        ← Página principal
│   ├── mindclaw_3d_control_center.html (40KB)   ← Mismo contenido
│   └── README_CONTROL_CENTER.md                 ← Documentación
├── open_control_center.sh                       ← Script de apertura
├── CONTROL_CENTER_COMPLETADO.md                 ← Resumen completo
└── QUICK_START.md                               ← Esta guía
```

## Características

- Vista 3D isométrica profesional
- 8 islas/plataformas temáticas
- Animaciones suaves y fluidas
- Dashboards con métricas reales
- Responsive (desktop, tablet, mobile)
- Sin dependencias externas (40KB total)
- Modales informativos por isla
- Conexiones animadas entre islas
- Partículas de fondo

## Personalización

Edita `/Users/javiercorrea/mindclaw/public/index.html`:

- **Métricas**: Busca `.metric-value` y actualiza números
- **Colores**: Busca `.island-{nombre} .island-platform` en CSS
- **Textos**: Busca objeto `islandData` en JavaScript
- **Posiciones**: Busca `style="left: X%; top: Y%"` en HTML

## Solución de Problemas

**No se ven las islas:**
- Asegúrate de usar un navegador moderno (Chrome, Firefox, Safari)
- Limpia caché (Cmd+Shift+R)

**Animaciones lentas:**
- Cierra otras pestañas del navegador
- Reduce número de partículas en el código

**No funciona en móvil:**
- Usa Chrome o Safari móvil
- Verifica que JavaScript esté habilitado

## Servidor Local (Opcional)

Si prefieres un servidor:

```bash
cd /Users/javiercorrea/mindclaw/public
python3 -m http.server 8000
```

Luego abre: http://localhost:8000

## Próximos Pasos

1. Conectar a API real para métricas en vivo
2. Agregar más islas según sea necesario
3. Integrar notificaciones en tiempo real
4. Añadir modo oscuro
5. Exportar vistas como imagen

---

**¡Listo para usar!** Abre el archivo y explora tu centro de control 3D.
