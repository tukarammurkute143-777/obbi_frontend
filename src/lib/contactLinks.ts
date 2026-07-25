import { CONTACT } from "./constants";

export function telHref(phone: string = CONTACT.phone): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function whatsappHref(message: string = CONTACT.whatsappMessage): string {
  const number = CONTACT.whatsapp.replace(/[^\d]/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

// Route pages pre-fill the enquiry with the exact route so the owner knows
// which trip the lead is asking about before replying.
export function routeWhatsappMessage(from: string, to: string): string {
  return `Namaste Obii Cabs! 🙏 Mujhe ${from} to ${to} cab book karni hai. Please rates batao.`;
}
