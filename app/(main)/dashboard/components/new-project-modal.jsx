"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UpgradeModal } from "@/components/upgrade-modal";
import { api } from "@/convex/_generated/api";
import { useConvexMutation, useConvexQuery } from "@/hooks/use-convex-query";
import { usePlanAccess } from "@/hooks/use-plan-access";
import {
  Box,
  File,
  FolderPlus,
  HardDrive,
  Image as ImageIcon,
  Info,
  Loader2,
  Sparkles,
  TriangleAlert,
  Type,
  Upload,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

export function NewProjectModal({ isOpen, onClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [projectTitle, setProjectTitle] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const { mutate: createProject } = useConvexMutation(api.projects.create);
  const { data: projects } = useConvexQuery(api.projects.getUserProjects);
  const { canCreateProject, isFree } = usePlanAccess();
  const router = useRouter();

  // Check if user can create new project
  const currentProjectCount = projects?.length || 0;
  const canCreate = canCreateProject(currentProjectCount);

  // Handle file drop
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));

      // Auto-generate title from filename
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      setProjectTitle(nameWithoutExt || "Untitled Project");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"],
    },
    maxFiles: 1,
    maxSize: 20 * 1024 * 1024, // 20MB limit
  });

  // Handle create project with plan limit check
  const handleCreateProject = async () => {
    // Check project limits first
    if (!canCreate) {
      setShowUpgradeModal(true);
      return;
    }

    if (!selectedFile || !projectTitle.trim()) {
      toast.error("Please select an image and enter a project title");
      return;
    }

    setIsUploading(true);

    try {
      // Upload to ImageKit via our API route
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("fileName", selectedFile.name);

      const uploadResponse = await fetch("/api/imagekit/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadData.success) {
        throw new Error(uploadData.error || "Failed to upload image");
      }

      // Create project in Convex
      const projectId = await createProject({
        title: projectTitle.trim(),
        originalImageUrl: uploadData.url,
        currentImageUrl: uploadData.url,
        thumbnailUrl: uploadData.thumbnailUrl,
        width: uploadData.width || 800,
        height: uploadData.height || 600,
        canvasState: null,
      });

      toast.success("Project created successfully!");

      // Navigate to editor
      router.push(`/editor/${projectId}`);
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error(
        error.message || "Failed to create project. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  // Reset modal state
  const handleClose = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setProjectTitle("");
    setIsUploading(false);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <DialogTitle className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <FolderPlus className="h-6 w-6 text-cyan-400" />
                  Start a New Project
                </DialogTitle>
                {isFree && (
                  <Badge
                    variant="secondary"
                    className="bg-slate-800 text-white/70 border border-white/10 flex items-center gap-1"
                  >
                    <Box className="h-4 w-4" />
                    {currentProjectCount} of 3
                  </Badge>
                )}
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-8">
            {/* Project Limit Warning for Free Users */}
            {isFree && currentProjectCount >= 2 && (
              <Alert className="bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start gap-3">
                <AlertDescription className="text-amber-300/90">
                  <div className="font-semibold text-amber-400 mb-1 flex items-center gap-1">
                    <TriangleAlert className="h-4 w-4" />
                    {currentProjectCount === 2
                      ? "Final Free Project"
                      : "You’ve Hit the Project Limit"}
                  </div>
                  {currentProjectCount === 2
                    ? "This is the last project you can create on the free plan. Upgrade to Vision pro for unlimited access."
                    : "The free plan allows up to 3 projects. Go Pro to unlock unlimited projects."}
                </AlertDescription>
              </Alert>
            )}

            {/* File Upload Area */}
            {!selectedFile ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
                  isDragActive
                    ? "border-cyan-400 bg-cyan-400/10"
                    : "border-white/20 hover:border-cyan-400/50 hover:bg-slate-800/50"
                } ${!canCreate ? "opacity-50 pointer-events-none" : ""}`}
              >
                <input {...getInputProps()} />
                <Upload className="h-12 w-12 text-white/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {isDragActive ? "Release your image here" : "Add an Image"}
                </h3>
                <p className="text-white/70 mb-3">
                  {canCreate
                    ? "Drag an image here, or click to choose a file"
                    : "Go Pro to keep creating more projects"}
                </p>
                <p className="text-sm text-white/50 flex items-center justify-center gap-1">
                  <Info className="h-4 w-4" />
                  Supports PNG, JPG, and WEBP files up to 20MB
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Image Preview */}
                <div className="relative group">
                  <img
                    src={previewUrl}
                    alt="Image Preview"
                    className="w-full h-64 object-cover rounded-xl border border-white/10 shadow-lg"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(null);
                      setProjectTitle("");
                    }}
                    className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white opacity-80 group-hover:opacity-100 transition"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Project Title Input */}
                <div className="space-y-2">
                  <Label
                    htmlFor="project-title"
                    className="text-white font-medium flex items-center gap-1"
                  >
                    <Type className="h-4 w-4 text-cyan-400" />
                    Name Your Project
                  </Label>
                  <Input
                    id="project-title"
                    type="text"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="Type a project name..."
                    className="bg-slate-800/80 border-white/20 text-white placeholder-white/40 focus:border-cyan-400 focus:ring-cyan-400 rounded-lg"
                  />
                </div>

                {/* File Details */}
                <div className="bg-slate-800/70 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center gap-3">
                    <ImageIcon className="h-5 w-5 text-cyan-400" />
                    <div>
                      <p className="text-white font-medium flex items-center gap-1">
                        <File className="h-4 w-4 text-white/70" />
                        {selectedFile.name}
                      </p>
                      <p className="text-white/70 text-sm flex items-center gap-1">
                        <HardDrive className="h-4 w-4" />
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB file
                        size
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="gap-3 pt-6">
            <Button
              variant="destructive"
              onClick={handleClose}
              disabled={isUploading}
              className="text-white/70 hover:text-white rounded-lg gap-2"
            >
              <X className="h-4 w-4" />
              Close
            </Button>

            <Button
              onClick={handleCreateProject}
              disabled={!selectedFile || !projectTitle.trim() || isUploading}
              variant="primary"
              className="rounded-lg px-6 gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Setting Up...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Start Project
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        restrictedTool="projects"
        reason="Free plan is limited to 3 projects. Upgrade to Pro for unlimited projects and access to all AI editing tools."
      />
    </>
  );
}
