"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/app/_components/ui/dialog";
import { BotIcon, Loader2Icon } from "lucide-react";
import { generateAIReport } from "../_actions/generate-ai-report";
import { useState } from "react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import Markdown from "react-markdown";

interface AIReportButtonProps {
  month: string;
}

const AIReportButton = ({ month }: AIReportButtonProps) => {
  const [report, setReport] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateReportsClick = async () => {
    try {
      setIsLoading(true);
      const aiReport = await generateAIReport({ month });
      setReport(aiReport);
    } catch (error) {
      console.error("Error generating AI report:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          Relatorio IA
          <BotIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Relatorio IA</DialogTitle>
          <DialogDescription>
            Use inteligência artificial para gerar relatórios personalizados
            baseado nas suas transações.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="prose max-h-[450px] text-white prose-h2:text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white">
          <Markdown>{report}</Markdown>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleGenerateReportsClick} disabled={isLoading}>
            {isLoading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "Gerar Relatorio"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AIReportButton;
