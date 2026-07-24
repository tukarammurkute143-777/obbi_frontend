"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Toast from "@/components/portal/Toast";
import { VEHICLE_TYPES } from "@/lib/dashboard/constants";
import { addBooking } from "@/lib/dashboard/storage";

const EXTRA_CHARGE_PER_DAY = 300;

function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

function daysBetween(from: string, to: string): number {
  if (!from || !to) return 0;
  const start = new Date(from);
  const end = new Date(to);
  const diff = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(diff + 1, 1);
}

const initialState = {
  customerName: "",
  customerMobile: "",
  customerEmail: "",
  from: "",
  to: "",
  pickupDate: todayISO(),
  dropDate: todayISO(),
  vehicleType: VEHICLE_TYPES[0],
  driver: "",
  totalRate: "",
  advancePaid: "",
  extraCharges: false,
  allInclusive: true,
  paymentMode: "Cash" as "Cash" | "Online" | "Pending",
  vehicleSource: "My Vehicle" as "My Vehicle" | "Partner Vehicle",
  partnerName: "",
  partnerMobile: "",
  partnerCommission: "",
  notes: "",
};

export default function BookingForm() {
  const [expanded, setExpanded] = useState(false);
  const [form, setForm] = useState(initialState);
  const [toast, setToast] = useState("");

  const totalDays = useMemo(
    () => daysBetween(form.pickupDate, form.dropDate),
    [form.pickupDate, form.dropDate]
  );

  const totalRateNum = parseFloat(form.totalRate) || 0;
  const advancePaidNum = parseFloat(form.advancePaid) || 0;
  const effectiveTotal = totalRateNum + (form.extraCharges ? totalDays * EXTRA_CHARGE_PER_DAY : 0);
  const remaining = Math.max(effectiveTotal - advancePaidNum, 0);
  const commissionNum = parseFloat(form.partnerCommission) || 0;
  const partnerPayout =
    form.vehicleSource === "Partner Vehicle" ? Math.round((totalRateNum * commissionNum) / 100) : 0;

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    addBooking({
      customerName: form.customerName,
      customerMobile: form.customerMobile,
      customerEmail: form.customerEmail,
      from: form.from,
      to: form.to,
      pickupDate: form.pickupDate,
      dropDate: form.dropDate,
      totalDays,
      vehicleType: form.vehicleType,
      driver: form.driver,
      totalRate: totalRateNum,
      advancePaid: advancePaidNum,
      remaining,
      extraCharges: form.extraCharges,
      allInclusive: form.allInclusive,
      paymentMode: form.paymentMode,
      vehicleSource: form.vehicleSource,
      partnerName: form.vehicleSource === "Partner Vehicle" ? form.partnerName : undefined,
      partnerMobile: form.vehicleSource === "Partner Vehicle" ? form.partnerMobile : undefined,
      partnerCommission: form.vehicleSource === "Partner Vehicle" ? commissionNum : undefined,
      partnerPayout: form.vehicleSource === "Partner Vehicle" ? partnerPayout : undefined,
      notes: form.notes,
    });

    setToast(`Booking confirmed for ${form.customerName}! ✅`);
    setForm(initialState);
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-dark/40 px-3.5 py-2.5 font-body text-sm text-text outline-none placeholder:text-text-muted/60 focus:border-gold [color-scheme:dark]";
  const labelClass = "flex flex-col gap-1.5 font-body text-xs text-text-muted";

  return (
    <div className="rounded-2xl border border-border bg-glass p-5 sm:p-6">
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="flex w-full items-center justify-between text-left"
      >
        <h2 className="font-display text-2xl text-text">📋 New Booking</h2>
        {expanded ? (
          <ChevronUp className="h-5 w-5 text-gold-light" strokeWidth={2} />
        ) : (
          <ChevronDown className="h-5 w-5 text-gold-light" strokeWidth={2} />
        )}
      </button>

      {expanded && (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
          <fieldset className="flex flex-col gap-3">
            <legend className="mb-1 font-body text-xs font-semibold tracking-wide text-gold-dark">
              CUSTOMER
            </legend>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <label className={labelClass}>
                Name*
                <input
                  required
                  value={form.customerName}
                  onChange={(e) => update("customerName", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Mobile*
                <input
                  required
                  value={form.customerMobile}
                  onChange={(e) => update("customerMobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Email
                <input
                  type="email"
                  value={form.customerEmail}
                  onChange={(e) => update("customerEmail", e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-3">
            <legend className="mb-1 font-body text-xs font-semibold tracking-wide text-gold-dark">
              TRIP
            </legend>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <label className={labelClass}>
                From*
                <input
                  required
                  value={form.from}
                  onChange={(e) => update("from", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                To*
                <input
                  required
                  value={form.to}
                  onChange={(e) => update("to", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Pickup Date*
                <input
                  required
                  type="date"
                  value={form.pickupDate}
                  onChange={(e) => update("pickupDate", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Drop Date*
                <input
                  required
                  type="date"
                  min={form.pickupDate}
                  value={form.dropDate}
                  onChange={(e) => update("dropDate", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Total Days
                <input
                  disabled
                  value={totalDays}
                  className={`${inputClass} cursor-not-allowed opacity-70`}
                />
              </label>
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-3">
            <legend className="mb-1 font-body text-xs font-semibold tracking-wide text-gold-dark">
              VEHICLE
            </legend>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className={labelClass}>
                Type*
                <select
                  required
                  value={form.vehicleType}
                  onChange={(e) => update("vehicleType", e.target.value)}
                  className={inputClass}
                >
                  {VEHICLE_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
              <label className={labelClass}>
                Driver
                <input
                  value={form.driver}
                  onChange={(e) => update("driver", e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-3">
            <legend className="mb-1 font-body text-xs font-semibold tracking-wide text-gold-dark">
              PAYMENT
            </legend>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <label className={labelClass}>
                Total Rate (₹)*
                <input
                  required
                  type="number"
                  min={0}
                  value={form.totalRate}
                  onChange={(e) => update("totalRate", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Advance Paid (₹)*
                <input
                  required
                  type="number"
                  min={0}
                  value={form.advancePaid}
                  onChange={(e) => update("advancePaid", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Remaining (₹)
                <input
                  disabled
                  value={remaining}
                  className={`${inputClass} cursor-not-allowed opacity-70`}
                />
              </label>
              <label className={labelClass}>
                Payment Mode
                <select
                  value={form.paymentMode}
                  onChange={(e) => update("paymentMode", e.target.value as typeof form.paymentMode)}
                  className={inputClass}
                >
                  <option value="Cash">Cash</option>
                  <option value="Online">Online</option>
                  <option value="Pending">Pending</option>
                </select>
              </label>
            </div>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 font-body text-sm text-text-muted">
                <input
                  type="checkbox"
                  checked={form.extraCharges}
                  onChange={(e) => update("extraCharges", e.target.checked)}
                  className="h-4 w-4 accent-[#C9A84C]"
                />
                Extra Charges (₹{EXTRA_CHARGE_PER_DAY}/day)
              </label>
              <label className="flex items-center gap-2 font-body text-sm text-text-muted">
                <input
                  type="checkbox"
                  checked={form.allInclusive}
                  onChange={(e) => update("allInclusive", e.target.checked)}
                  className="h-4 w-4 accent-[#C9A84C]"
                />
                All Inclusive
              </label>
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-3">
            <legend className="mb-1 font-body text-xs font-semibold tracking-wide text-gold-dark">
              PARTNER
            </legend>
            <div className="flex gap-2">
              {(["My Vehicle", "Partner Vehicle"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => update("vehicleSource", option)}
                  className={`rounded-full border px-4 py-1.5 font-body text-sm transition-colors ${
                    form.vehicleSource === option
                      ? "border-gold bg-gold text-dark"
                      : "border-gold/40 text-gold-light hover:bg-gold/10"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {form.vehicleSource === "Partner Vehicle" && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <label className={labelClass}>
                  Partner Name
                  <input
                    value={form.partnerName}
                    onChange={(e) => update("partnerName", e.target.value)}
                    className={inputClass}
                  />
                </label>
                <label className={labelClass}>
                  Partner Mobile
                  <input
                    value={form.partnerMobile}
                    onChange={(e) => update("partnerMobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className={inputClass}
                  />
                </label>
                <label className={labelClass}>
                  Commission (%)
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={form.partnerCommission}
                    onChange={(e) => update("partnerCommission", e.target.value)}
                    className={inputClass}
                  />
                </label>
                <label className={labelClass}>
                  Payout (₹)
                  <input
                    disabled
                    value={partnerPayout}
                    className={`${inputClass} cursor-not-allowed opacity-70`}
                  />
                </label>
              </div>
            )}
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <legend className="mb-1 font-body text-xs font-semibold tracking-wide text-gold-dark">
              NOTES
            </legend>
            <textarea
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              rows={3}
              placeholder="Special requests..."
              className={inputClass}
            />
          </fieldset>

          <button
            type="submit"
            className="self-start rounded-full bg-gradient-to-r from-gold-light to-gold-dark px-8 py-3 font-body font-medium text-dark shadow-[0_0_24px_rgba(201,168,76,0.3)] transition-[transform,box-shadow] duration-150 hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(201,168,76,0.6)]"
          >
            Confirm Booking ✅
          </button>
        </form>
      )}

      {toast && <Toast message={toast} onDismiss={() => setToast("")} />}
    </div>
  );
}
