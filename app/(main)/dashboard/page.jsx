"use client";

import React, { useState } from "react";
import { Plus, Image, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { NewProjectModal } from "./components/new-project-modal";
import { ProjectGrid } from "./components/project-grid";

export default function DashboardPage() {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);

  // Get user's projects
  const { data: projects, isLoading } = useConvexQuery(
    api.projects.getUserProjects
  );

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-6">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3 pb-2">
              Your Projects
            </h1>
            <p className="text-white/70 text-lg">
              Manage all your AI-powered creations in one place
            </p>
          </div>

          <Button
            onClick={() => setShowNewProjectModal(true)}
            variant="primary"
            size="lg"
            className="gap-2 shadow-lg hover:shadow-cyan-500/30 transition"
          >
            <Plus className="h-5 w-5" />
            New Project
          </Button>
        </div>

        {/* Projects Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-14 w-14 border-4 border-cyan-500/30 border-t-cyan-400"></div>
          </div>
        ) : projects && projects.length > 0 ? (
          <ProjectGrid projects={projects} />
        ) : (
          <EmptyState onCreateProject={() => setShowNewProjectModal(true)} />
        )}

        {/* New Project Modal */}
        <NewProjectModal
          isOpen={showNewProjectModal}
          onClose={() => setShowNewProjectModal(false)}
        />
      </div>
    </div>
  );
}

// Empty state when user has no projects
function EmptyState({ onCreateProject }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-28 h-28 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
        <Image className="h-14 w-14 text-cyan-400" />
      </div>

      <h3 className="text-2xl font-bold text-white mb-3">
        Create Your First Project
      </h3>

      <p className="text-white/60 mb-8 max-w-md text-lg leading-relaxed">
        Upload an image to start editing with AI tools, or open a blank canvas
        to design from scratch.
      </p>

      <Button
        onClick={onCreateProject}
        variant="primary"
        size="lg"
        className="gap-2 shadow-md hover:shadow-cyan-500/30 transition"
      >
        <Sparkles className="h-5 w-5" />
        Start Creating
      </Button>
    </div>
  );
}
