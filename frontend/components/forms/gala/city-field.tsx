'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";

interface CityFieldProps {
  control: Control<any>;
}

export function CityField({ control }: CityFieldProps) {
  return (
    <FormField
      control={control}
      name="city"
      render={({ field }) => (
        <FormItem className="pt-4">
          <FormLabel>Ville du gala</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez la ville" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="paris">Paris</SelectItem>
              <SelectItem value="jerusalem">Jérusalem</SelectItem>
              <SelectItem value="strasbourg">Strasbourg</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
