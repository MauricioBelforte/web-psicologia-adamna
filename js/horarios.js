(function () {
    const horarios = ["Lunes: 09:00-13:00, 16:00-20:00", "Martes: 09:00-13:00, 16:00-20:00", "Miércoles: 09:00-13:00, 16:00-20:00", "Jueves: 09:00-13:00, 16:00-20:00", "Viernes: 09:00-13:00, 16:00-20:00", "Sábado: 10:00-14:00", "Domingo: Cerrado"];
    const statusEl = document.getElementById('estado-horario');
    const nextEl = document.getElementById('proximo-horario');

    if (!statusEl || !horarios || horarios.length === 0) return;

    const diasSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const now = new Date();
    const diaActual = now.getDay(); // 0-6
    const minutosActuales = now.getHours() * 60 + now.getMinutes();

    // Parsear horarios
    const agenda = {};

    horarios.forEach(h => {
        const partes = h.split(': ');
        if (partes.length < 2) return;

        let diaNombre = partes[0].toLowerCase().trim();
        // Normalizar nombres
        diaNombre = diaNombre.replace('é', 'e').replace('á', 'a');
        if (diaNombre === 'miercoles') diaNombre = 'miércoles';
        if (diaNombre === 'sabado') diaNombre = 'sábado';

        const rangosStr = partes[1];
        if (rangosStr.toLowerCase().includes('cerrado')) return;

        const diaIndex = diasSemana.indexOf(diaNombre);
        if (diaIndex === -1) return;

        const rangos = [];
        rangosStr.split(', ').forEach(r => {
            const [inicio, fin] = r.split('-');
            if (inicio && fin) {
                const [h1, m1] = inicio.split(':').map(Number);
                const [h2, m2] = fin.split(':').map(Number);
                rangos.push({
                    inicio: h1 * 60 + m1,
                    fin: h2 * 60 + m2
                });
            }
        });
        agenda[diaIndex] = rangos.sort((a, b) => a.inicio - b.inicio);
    });

    function formatearHora(minutos) {
        const h = Math.floor(minutos / 60).toString().padStart(2, '0');
        const m = (minutos % 60).toString().padStart(2, '0');
        return `${h}:${m}`;
    }

    // Determinar estado
    let estaAbierto = false;
    let textoEstado = "Cerrado";
    let textoProximo = "";
    let color = "#dc3545"; // Rojo

    const rangosHoy = agenda[diaActual] || [];
    let cierreHoy = null;

    for (const rango of rangosHoy) {
        if (minutosActuales >= rango.inicio && minutosActuales < rango.fin) {
            estaAbierto = true;
            cierreHoy = rango.fin;
            break;
        }
    }

    if (estaAbierto) {
        textoEstado = "Abierto ahora";
        color = "#28a745"; // Verde
        textoProximo = `Cierra a las ${formatearHora(cierreHoy)}`;
    } else {
        // Buscar próxima apertura
        let encontrado = false;
        // 1. Resto de hoy
        for (const rango of rangosHoy) {
            if (minutosActuales < rango.inicio) {
                textoProximo = `Abre hoy a las ${formatearHora(rango.inicio)}`;
                encontrado = true;
                break;
            }
        }
        // 2. Días siguientes
        if (!encontrado) {
            for (let i = 1; i <= 7; i++) {
                const diaCheck = (diaActual + i) % 7;
                const rangosCheck = agenda[diaCheck];
                if (rangosCheck && rangosCheck.length > 0) {
                    const diaNombre = i === 1 ? "mañana" : "el " + diasSemana[diaCheck];
                    textoProximo = `Abre ${diaNombre} a las ${formatearHora(rangosCheck[0].inicio)}`;
                    encontrado = true;
                    break;
                }
            }
        }
        if (!encontrado) textoProximo = "Horarios no disponibles";
    }

    statusEl.textContent = textoEstado;
    statusEl.style.color = color;
    if (nextEl) nextEl.textContent = textoProximo;
})();