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
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <FormField
          control={control}
          name="maleAttendees"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre d'hommes</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[...Array(10)].map((_, i) => (
                    <SelectItem key={i} value={String(i + 1)}>{i + 1}</SelectItem>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[...Array(10)].map((_, i) => (
                    <SelectItem key={i} value={String(i + 1)}>{i + 1}</SelectItem>
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
