'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";

interface PersonalInfoFieldsProps {
  control: Control<any>;
  setCountryCode: (code: string) => void;
}

export function PersonalInfoFields({ control, setCountryCode }: PersonalInfoFieldsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium">Informations personnelles</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input placeholder="Votre prénom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Votre nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="votre@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="phoneCountryCode"
          render={({ field: countryCodeField }) => (
            <FormField
              control={control}
              name="phoneNumber"
              render={({ field: phoneField }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <div className="flex">
                    <Select
                      value={countryCodeField.value}
                      onValueChange={(value) => {
                        countryCodeField.onChange(value);
                        setCountryCode(value);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger className="flex w-[110px] rounded-r-none">
                          <SelectValue placeholder="Indicatif" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[300px]">
                        <SelectItem value="+972">+972 🇮🇱</SelectItem>
                        <SelectItem value="+33">+33 🇫🇷</SelectItem>
                        <SelectItem value="+1">+1 🇺🇸</SelectItem>
                        <SelectItem value="+32">+32 🇧🇪</SelectItem>
                        <SelectItem value="+41">+41 🇨🇭</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormControl>
                      <Input
                        className="rounded-l-none"
                        placeholder="Numéro de téléphone"
                        {...phoneField}
                        onChange={(e) => {
                          // Ne permettre que les chiffres et quelques caractères spéciaux
                          const value = e.target.value;
                          const filteredValue = value.replace(/[^\d\s\-\(\)]/g, '');
                          e.target.value = filteredValue;
                          phoneField.onChange(e);
                        }}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        />
      </div>
    </div>
  );
}
