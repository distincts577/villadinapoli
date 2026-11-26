"use client";

import { useAgenda } from "./AgendaProvider";
import { HeroDates } from "./Booking";
import { CountdownLarge } from "./Countdown";

/**
 * Gatilhos da primeira dobra: prazo real (contador), os três dias do
 * plantão e a quantidade real de horários livres. Nenhum número é
 * inventado: a contagem só aparece quando vem da agenda.
 */
export function HeroTriggers() {
  const { data } = useAgenda();
  const ready = Boolean(data?.configured && data.slots.length > 0 && !data.brokerRequired);
  const total = ready ? Object.values(data!.availableByDate).reduce((a, b) => a + b, 0) : 0;

  return (
    <div className="rounded-3xl border border-gold/40 bg-ink/80 p-5 backdrop-blur-sm sm:p-7">
      <p className="text-sm font-semibold text-gold-soft">A campanha encerra em</p>
      <div className="mt-3">
        <CountdownLarge />
      </div>

      <p className="mt-6 text-sm font-semibold text-gold-soft">São só três dias de plantão</p>
      <div className="mt-3">
        <HeroDates />
      </div>

      {ready && total > 0 && (
        <p className="mt-5 flex items-center gap-2 text-sm text-paper">
          <span
            className="size-2.5 shrink-0 rounded-full bg-ok motion-safe:animate-[pulse-dot_1.8s_ease-in-out_infinite]"
            aria-hidden
          />
          <span>
            <strong className="font-semibold text-ok">
              {total} {total === 1 ? "horário livre" : "horários livres"}
            </strong>{" "}
            neste momento. A contagem diminui a cada reserva.
          </span>
        </p>
      )}
      {ready && total === 0 && (
        <p className="mt-5 text-sm text-mist">Todos os horários online já foram reservados.</p>
      )}
    </div>
  );
}
