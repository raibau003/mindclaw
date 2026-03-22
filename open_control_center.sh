#!/bin/bash

# Script para abrir el MindClaw 3D Control Center

echo "🧠 Abriendo MindClaw 3D Control Center..."
echo ""
echo "Opciones disponibles:"
echo "1. Abrir directamente en navegador"
echo "2. Iniciar servidor local (puerto 8000)"
echo ""
read -p "Selecciona opción (1 o 2): " option

case $option in
    1)
        echo "Abriendo en navegador..."
        open /Users/javiercorrea/mindclaw/public/index.html
        echo "✅ Centro de control abierto!"
        ;;
    2)
        echo "Iniciando servidor local en http://localhost:8000 ..."
        cd /Users/javiercorrea/mindclaw/public
        echo "✅ Servidor iniciado. Abre tu navegador en: http://localhost:8000"
        echo "Presiona Ctrl+C para detener el servidor"
        python3 -m http.server 8000
        ;;
    *)
        echo "❌ Opción no válida"
        exit 1
        ;;
esac
