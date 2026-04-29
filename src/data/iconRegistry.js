import {
  Code, Smartphone, Monitor, Palette,
  Rocket, ShieldCheck, Trophy,
  Mail, Phone, MapPin, MessageCircle,
} from 'lucide-react';

/**
 * Resolves a Lucide icon name string (as stored in data/DB) to a component.
 * Add entries here whenever the admin needs to expose a new icon choice.
 */
export const iconRegistry = {
  Code, Smartphone, Monitor, Palette,
  Rocket, ShieldCheck, Trophy,
  Mail, Phone, MapPin, MessageCircle,
};

export const iconNames = Object.keys(iconRegistry);

export function getIcon(name) {
  return iconRegistry[name] ?? null;
}
