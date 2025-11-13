document.addEventListener("DOMContentLoaded", function () {

    // ========== CORES CENTRALIZADAS ==========
    // O objeto CORES é importado do JSP.
    
    // ===============================
    // 📅 INICIALIZAÇÃO DO CALENDÁRIO
    // ===============================
    const calendarEl = document.getElementById("calendar");
    if (!calendarEl) return;

    // Função para gerar eventos recorrentes de despesas fixas
    function gerarEventosRecorrentes(lancamentos) {
        const eventosGerados = [];
        const dataAtual = new Date();
        const anoAtual = dataAtual.getFullYear();
        const mesAtual = dataAtual.getMonth();

        lancamentos.forEach(l => {
            const tipoNormalizado = (l.tipo || 'receita').toString().trim().toLowerCase();
            const tipoFinal = tipoNormalizado === 'despesa' ? 'despesa' : 'receita';
            const cores = CORES[tipoFinal];
            
            if (l.fixo === true && tipoFinal === "despesa") {
                const diaVencimento = parseInt(l.diaVencimento);

                for (let i = -3; i <= 12; i++) {
                    const novaData = new Date(anoAtual, mesAtual + i, diaVencimento);
                    
                    if (novaData.getDate() !== diaVencimento) {
                        novaData.setDate(0);
                    }

                    const dataFormatada = novaData.toISOString().split('T')[0];
                    
                    eventosGerados.push({
                        title: l.title + " (Fixo)",
                        start: dataFormatada,
                        backgroundColor: cores.background,
                        borderColor: cores.border,
                        textColor: cores.text,
                        extendedProps: {
                            tipo: tipoFinal,
                            fixo: true,
                            diaVencimento: diaVencimento
                        }
                    });
                }
            } else {
                eventosGerados.push({
                    title: l.title,
                    start: l.start,
                    backgroundColor: cores.background,
                    borderColor: cores.border,
                    textColor: cores.text,
                    extendedProps: {
                        tipo: tipoFinal,
                        fixo: false
                    }
                });
            }
        });

        return eventosGerados;
    }

    const eventosCalendario = gerarEventosRecorrentes(lancamentos);

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        locale: "pt-br",
        firstDay: 1,
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
        },
        buttonText: {
            today: "Hoje",
            month: "Mês",
            week: "Semana",
            day: "Dia"
        },
        allDayText: "Dia todo",
        events: eventosCalendario,
        
        eventDidMount: function(info) {
            const tipo = (info.event.extendedProps.tipo || 'receita').toString().trim().toLowerCase();
            const tipoFinal = tipo === 'despesa' ? 'despesa' : 'receita';
            const cores = CORES[tipoFinal];

            info.el.style.setProperty('background-color', cores.background, 'important');
            info.el.style.setProperty('border-color', cores.border, 'important');
            
            const elementsToForceBg = info.el.querySelectorAll('.fc-event-main, .fc-event-main-frame, a');
            elementsToForceBg.forEach(el => {
                el.style.setProperty('background-color', cores.background, 'important');
            });

            const textElements = info.el.querySelectorAll('.fc-event-title, .fc-event-time, *');
            textElements.forEach(el => {
                el.style.setProperty('color', cores.text, 'important');
            });
            
            if (info.event.extendedProps.fixo) {
                info.el.style.fontWeight = "bold";
                info.el.title = "Despesa Fixa Recorrente";
            }
        }
    });

    calendar.render();

    // ===============================
    // 🏷️ LEGENDA DINÂMICA
    // ===============================
    function atualizarLegenda() {
        const legendaContainer = document.createElement("div");
        legendaContainer.className = "legenda-calendario";
        legendaContainer.style.marginTop = "20px";
        legendaContainer.style.textAlign = "center";
        legendaContainer.style.padding = "15px";
        legendaContainer.style.backgroundColor = "#fff";
        legendaContainer.style.borderRadius = "8px";
        legendaContainer.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";

        const tipos = {
            "Despesa": CORES.despesa.background,
            "Receita": CORES.receita.background
        };

        Object.keys(tipos).forEach(tipo => {
            const item = document.createElement("span");
            item.className = "legenda-item";
            item.style.display = "inline-block";
            item.style.marginRight = "20px";
            item.style.fontSize = "14px";

            const cor = document.createElement("span");
            cor.style.display = "inline-block";
            cor.style.width = "20px";
            cor.style.height = "20px";
            cor.style.backgroundColor = tipos[tipo];
            cor.style.marginRight = "8px";
            cor.style.borderRadius = "3px";
            cor.style.verticalAlign = "middle";

            item.appendChild(cor);
            item.appendChild(document.createTextNode(tipo));
            legendaContainer.appendChild(item);
        });

        const conteudo = document.querySelector(".conteudo");
        if (conteudo && !document.querySelector(".legenda-calendario")) {
             conteudo.appendChild(legendaContainer);
        }
    }

    atualizarLegenda();

});
