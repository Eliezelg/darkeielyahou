'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";

interface AttendeesFieldsProps {
  control: Control<any>;
}

export function AttendeesFields({ control }: AttendeesFieldsProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-base font-medium">Participants</h3>
      <p className="text-sm text-gray-600 mb-3">Au moins un des deux champs est requis</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <FormField
          control={control}
          name="maleAttendees"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre d'hommes</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || "0"}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[...Array(11)].map((_, i) => (
                    <SelectItem key={i} value={String(i)}>{i}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="femaleAttendees"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de femmes</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || "0"}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[...Array(11)].map((_, i) => (
                    <SelectItem key={i} value={String(i)}>{i}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
