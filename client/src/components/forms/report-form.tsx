import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertReportSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { REPORT_TYPES } from "@/lib/constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { z } from "zod";

type ReportFormData = z.infer<typeof insertReportSchema>;

interface ReportFormProps {
  onSuccess?: () => void;
}

export default function ReportForm({ onSuccess }: ReportFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ReportFormData>({
    resolver: zodResolver(insertReportSchema),
    defaultValues: {
      type: "",
      location: "",
      description: "",
      contact: "",
    },
  });

  const createReport = useMutation({
    mutationFn: async (data: ReportFormData) => {
      const response = await apiRequest("POST", "/api/reports", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Denúncia enviada com sucesso!",
        description: "Obrigado por ajudar na preservação ambiental.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/reports"] });
      onSuccess?.();
    },
    onError: (error) => {
      toast({
        title: "Erro ao enviar denúncia",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
      console.error("Error creating report:", error);
    },
  });

  const onSubmit = (data: ReportFormData) => {
    createReport.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Ocorrência</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {REPORT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Local da Ocorrência</FormLabel>
              <FormControl>
                <Input placeholder="Descreva o local..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva a ocorrência em detalhes..."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contato (Opcional)</FormLabel>
              <FormControl>
                <Input placeholder="Seu telefone..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => form.reset()}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-nature hover:bg-green-700"
            disabled={createReport.isPending}
          >
            {createReport.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar Denúncia"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
