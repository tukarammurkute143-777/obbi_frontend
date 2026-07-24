"use client";

import type { ReactNode } from "react";
import AnimatedCounter from "@/components/landing/AnimatedCounter";
import type { SummaryData } from "@/lib/dashboard/constants";

interface SummaryCardsProps {
  summary: SummaryData;
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

interface CardDef {
  key: string;
  icon: string;
  iconColor: string;
  label: string;
  value: ReactNode;
  sub: ReactNode;
  onClick?: () => void;
}

export default function SummaryCards({ summary }: SummaryCardsProps) {
  const cards: CardDef[] = [
    {
      key: "logins",
      icon: "👤",
      iconColor: "text-gold-light",
      label: "Total Logins Today",
      value: <AnimatedCounter target={summary.loginsToday} />,
      sub: <span className="text-green">↑ 12% from yesterday</span>,
    },
    {
      key: "bookings",
      icon: "📋",
      iconColor: "text-gold-light",
      label: "Bookings Today",
      value: <AnimatedCounter target={summary.bookingsToday} />,
      sub: <span className="text-green">↑ 3 from yesterday</span>,
    },
    {
      key: "calls",
      icon: "📞",
      iconColor: "text-gold-light",
      label: "Calls Received",
      value: <AnimatedCounter target={summary.callsReceived} />,
      sub: <span className="text-red">{summary.callsUnanswered} unanswered 🔴</span>,
      onClick: () => scrollToId("incoming-contacts"),
    },
    {
      key: "whatsapp",
      icon: "💬",
      iconColor: "text-green",
      label: "WhatsApp Messages",
      value: <AnimatedCounter target={summary.whatsappReceived} />,
      sub: <span className="text-text-muted">{summary.whatsappUnread} unread 💬</span>,
      onClick: () => scrollToId("incoming-contacts"),
    },
    {
      key: "blocked",
      icon: "🛡️",
      iconColor: "text-red",
      label: "Blocked Today",
      value: <AnimatedCounter target={summary.blockedToday} />,
      sub: <span className="text-text-muted">Budget saved: ₹150</span>,
      onClick: () => scrollToId("blocked-users"),
    },
    {
      key: "budget",
      icon: "💰",
      iconColor: "text-gold-light",
      label: "Ad Budget Saved",
      value: <AnimatedCounter target={summary.budgetSaved} prefix="₹" />,
      sub: <span className="text-text-muted">This month total</span>,
    },
  ];

  return (
    <div className="no-scrollbar flex gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-6">
      {cards.map((card) => {
        const content = (
          <>
            <span className={`text-2xl ${card.iconColor}`}>{card.icon}</span>
            <span className="mt-2 font-display text-3xl font-semibold text-text">
              {card.value}
            </span>
            <span className="mt-1 font-body text-xs text-text-muted">{card.label}</span>
            <span className="mt-2 font-body text-xs">{card.sub}</span>
          </>
        );

        const className =
          "flex w-48 shrink-0 flex-col items-start rounded-2xl border border-border bg-glass p-5 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_0_24px_rgba(201,168,76,0.2)] sm:w-auto";

        if (card.onClick) {
          return (
            <button key={card.key} type="button" onClick={card.onClick} className={className}>
              {content}
            </button>
          );
        }

        return (
          <div key={card.key} className={className}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
