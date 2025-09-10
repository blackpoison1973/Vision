"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PricingTable } from "@clerk/nextjs";
import { Crown } from "lucide-react";

export function UpgradeModal({ isOpen, onClose, restrictedTool, reason }) {
  const getToolName = (toolId) => {
    const toolNames = {
      background: "AI Background Tools",
      ai_extender: "AI Image Extender",
      ai_edit: "AI Editor",
    };
    return toolNames[toolId] || "Premium Feature";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl bg-slate-900/95 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Crown className="h-7 w-7 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
            </div>
            <DialogTitle className="text-3xl font-extrabold text-white tracking-tight bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent">
              Unlock Pro Features
            </DialogTitle>
          </div>
          <p className="text-white/60 text-sm mt-2">
            Get access to advanced AI tools and unlimited creative power.
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Restriction Message */}
          {restrictedTool && (
            <Alert className="bg-amber-500/10 border border-amber-500/30 rounded-xl shadow-md">
              <AlertDescription className="text-amber-200">
                <div className="font-semibold text-amber-300 mb-1">
                  {getToolName(restrictedTool)} — Pro Only
                </div>
                {reason ||
                  `${getToolName(
                    restrictedTool
                  )} is available on the Pro plan. Upgrade to unlock this feature and more.`}
              </AlertDescription>
            </Alert>
          )}

          <div className="rounded-xl border border-white/10 bg-slate-800/40 p-4 shadow-inner">
            <PricingTable />
          </div>
        </div>

        <DialogFooter className="justify-center mt-6 gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="text-white/70 hover:text-white border-white/20"
          >
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
