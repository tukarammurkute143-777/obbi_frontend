"use client";

import { useMemo, useState } from "react";
import WelcomeAnimation from "./WelcomeAnimation";
import DashboardNavbar from "./DashboardNavbar";
import DashboardFilters from "./DashboardFilters";
import SummaryCards from "./SummaryCards";
import DailyOverviewGraph from "./graphs/DailyOverviewGraph";
import LoginTypePieChart from "./graphs/LoginTypePieChart";
import HeatmapGraph from "./graphs/HeatmapGraph";
import BookingFunnelGraph from "./graphs/BookingFunnelGraph";
import RoutePopularityMap from "./graphs/RoutePopularityMap";
import RevenueTrendGraph from "./graphs/RevenueTrendGraph";
import CompetitorAttackGraph from "./graphs/CompetitorAttackGraph";
import CallList from "./CallList";
import MailOutreach from "./MailOutreach";
import IncomingContacts from "./IncomingContacts";
import BlockedUsers from "./BlockedUsers";
import BookingForm from "./BookingForm";
import QuickNotes from "./widgets/QuickNotes";
import FollowUpReminder from "./widgets/FollowUpReminder";
import WeatherWidget from "./widgets/WeatherWidget";
import {
  MOCK_DAILY_STATS,
  MOCK_LOGIN_TYPE_SPLIT,
  MOCK_REVENUE,
  MOCK_SUMMARY,
} from "@/lib/dashboard/constants";
import { FILTER_SCALE, scaleValue } from "@/lib/dashboard/filterScale";

function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

export default function DashboardContent() {
  const [showWelcome, setShowWelcome] = useState(true);

  const [dateFilter, setDateFilter] = useState("Today");
  const [timeFilter, setTimeFilter] = useState("Morning 6-12");
  const [dataTypeFilter, setDataTypeFilter] = useState("All");
  const [loginTypeFilter, setLoginTypeFilter] = useState("Both");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState(todayISO());

  const scale = FILTER_SCALE[dateFilter as keyof typeof FILTER_SCALE] ?? 1;

  const scaledSummary = useMemo(
    () => ({
      loginsToday: scaleValue(MOCK_SUMMARY.loginsToday, scale),
      bookingsToday: scaleValue(MOCK_SUMMARY.bookingsToday, scale),
      callsReceived: scaleValue(MOCK_SUMMARY.callsReceived, scale),
      callsUnanswered: scaleValue(MOCK_SUMMARY.callsUnanswered, scale),
      whatsappReceived: scaleValue(MOCK_SUMMARY.whatsappReceived, scale),
      whatsappUnread: scaleValue(MOCK_SUMMARY.whatsappUnread, scale),
      blockedToday: scaleValue(MOCK_SUMMARY.blockedToday, scale),
      budgetSaved: scaleValue(MOCK_SUMMARY.budgetSaved, scale),
    }),
    [scale]
  );

  const totalLogins = MOCK_LOGIN_TYPE_SPLIT.mobile + MOCK_LOGIN_TYPE_SPLIT.gmail;

  return (
    <>
      {showWelcome && <WelcomeAnimation onComplete={() => setShowWelcome(false)} />}

      <DashboardNavbar />
      <DashboardFilters
        dateFilter={dateFilter}
        onDateChange={setDateFilter}
        timeFilter={timeFilter}
        onTimeChange={setTimeFilter}
        dataTypeFilter={dataTypeFilter}
        onDataTypeChange={setDataTypeFilter}
        loginTypeFilter={loginTypeFilter}
        onLoginTypeChange={setLoginTypeFilter}
        customFrom={customFrom}
        customTo={customTo}
        onCustomFromChange={setCustomFrom}
        onCustomToChange={setCustomTo}
        onApplyCustomRange={() => setDateFilter("Custom")}
      />

      <main className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-8 sm:px-8">
        <SummaryCards summary={scaledSummary} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DailyOverviewGraph data={MOCK_DAILY_STATS} dataTypeFilter={dataTypeFilter} />
          <LoginTypePieChart
            mobilePercent={MOCK_LOGIN_TYPE_SPLIT.mobile}
            gmailPercent={MOCK_LOGIN_TYPE_SPLIT.gmail}
            total={scaleValue(totalLogins, scale)}
            loginTypeFilter={loginTypeFilter}
          />
          <HeatmapGraph />
          <BookingFunnelGraph />
          <RoutePopularityMap />
          <RevenueTrendGraph data={MOCK_REVENUE} />
          <div className="lg:col-span-2">
            <CompetitorAttackGraph data={MOCK_DAILY_STATS} />
          </div>
        </div>

        <CallList />
        <MailOutreach />
        <IncomingContacts />
        <BlockedUsers />
        <BookingForm />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <QuickNotes />
          <FollowUpReminder />
          <WeatherWidget />
        </div>
      </main>
    </>
  );
}
