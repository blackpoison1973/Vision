import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useConvexMutation } from "@/hooks/use-convex-query";
import { formatDistanceToNow } from "date-fns";
import { Clock, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function ProjectCard({ project, onEdit }) {
  const { mutate: deleteProject, isLoading } = useConvexMutation(
    api.projects.deleteProject
  );

  const lastUpdated = formatDistanceToNow(new Date(project.updatedAt), {
    addSuffix: true,
  });

  const handleDelete = async () => {
    const confirmed = confirm(
      `Are you sure you want to delete "${project.title}"? This action cannot be undone.`
    );

    if (confirmed) {
      try {
        await deleteProject({ projectId: project._id });
        toast.success("Project deleted successfully");
      } catch (error) {
        console.error("Error deleting project:", error);
        toast.error("Failed to delete project. Please try again.");
      }
    }
  };

  return (
    <Card className="group relative bg-slate-800/60 border border-slate-700 rounded-xl overflow-hidden hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
      {/* Thumbnail */}
      <div className="aspect-video bg-slate-700 relative overflow-hidden">
        {project.thumbnailUrl ? (
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/40 text-sm">
            No Thumbnail
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <Button
            variant="glass"
            size="sm"
            onClick={onEdit}
            className="gap-2 transition-all"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="glass"
            size="sm"
            onClick={handleDelete}
            className="gap-2 text-red-400 hover:text-red-300 transition-all"
            disabled={isLoading}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Project Info */}
      <CardContent className="py-4 px-5">
        <h3 className="font-semibold text-white text-lg mb-1 truncate">
          {project.title}
        </h3>

        <div className="flex items-center justify-between text-sm text-white/70">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-cyan-400" />
            {lastUpdated}
          </span>
          <Badge
            variant="secondary"
            className="text-xs bg-slate-700 text-white/70 border border-slate-600"
          >
            {project.width} × {project.height}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
