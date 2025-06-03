'use client';

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const countryCodes = [
  { code: "+972", country: "Israël 🇮🇱" },
  { code: "+33", country: "France 🇫🇷" },
  { code: "+1", country: "États-Unis 🇺🇸" },
  { code: "+32", country: "Belgique 🇧🇪" },
  { code: "+41", country: "Suisse 🇨🇭" },
  { code: "+44", country: "Royaume-Uni 🇬🇧" },
  { code: "+351", country: "Portugal 🇵🇹" },
  { code: "+34", country: "Espagne 🇪🇸" },
  { code: "+39", country: "Italie 🇮🇹" },
  { code: "+49", country: "Allemagne 🇩🇪" },
  { code: "+212", country: "Maroc 🇲🇦" },
  { code: "+31", country: "Pays-Bas 🇳🇱" },
  { code: "+380", country: "Ukraine 🇺🇦" },
  { code: "+7", country: "Russie 🇷🇺" },
  { code: "+27", country: "Afrique du Sud 🇿🇦" },
  { code: "+961", country: "Liban 🇱🇧" },
  { code: "+213", country: "Algérie 🇩🇿" },
  { code: "+216", country: "Tunisie 🇹🇳" },
]
.sort((a, b) => {
  // Placer Israël et France en premier
  if (a.code === "+972") return -1;
  if (b.code === "+972") return 1;
  if (a.code === "+33") return -1;
  if (b.code === "+33") return 1;
  return a.country.localeCompare(b.country);
});

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  countryCode: string;
  setCountryCode: (value: string) => void;
  className?: string;
}

export function PhoneInput({ 
  countryCode, 
  setCountryCode, 
  className, 
  ...props 
}: PhoneInputProps) {
  // Validation du numéro de téléphone en fonction du préfixe
  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Ne permet que les chiffres et quelques caractères spéciaux utiles dans les numéros de téléphone
    const filteredValue = value.replace(/[^\d\s\-\(\)]/g, '');
    e.target.value = filteredValue;
  };

  return (
    <div className="flex">
      <Select value={countryCode} onValueChange={setCountryCode}>
        <SelectTrigger className={cn("flex w-[110px] rounded-r-none", className)}>
          <SelectValue placeholder="Indicatif" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {countryCodes.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              {country.code} {country.country}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        {...props}
        onChange={(e) => {
          handlePhoneInput(e);
          props.onChange?.(e);
        }}
        className={cn("rounded-l-none", className)}
      />
    </div>
  );
}
