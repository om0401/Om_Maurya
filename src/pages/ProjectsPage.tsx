import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getProjects, addProject, updateProject, deleteProject } from '../utils/db';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Plus, Edit, Trash2, ExternalLink, Code, Filter } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Project {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  live_link?: string;
  source_code_link?: string;
  tools: string[];
  category?: string;
}

const PROJECT_CATEGORIES = [
  'Data Analysis',
  'Machine Learning',
  'Full Stack',
  'Data Science'
];

export function ProjectsPage() {
  const { isOwner } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newTool, setNewTool] = useState('');
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: '',
    image_url: '',
    live_link: '',
    source_code_link: '',
    tools: [],
    category: 'Full Stack'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, selectedFilter]);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error: any) {
      console.error('Error loading projects:', error);
      if (error?.message?.includes('does not exist') || error?.code === 'PGRST205') {
        setProjects([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = () => {
    if (selectedFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter(project => 
          project.category === selectedFilter
        )
      );
    }
  };

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      image_url: '',
      live_link: '',
      source_code_link: '',
      tools: [],
      category: 'Full Stack'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || '',
      description: project.description || '',
      image_url: project.image_url || '',
      live_link: project.live_link || '',
      source_code_link: project.source_code_link || '',
      tools: project.tools || [],
      category: project.category || 'Full Stack'
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      image_url: '',
      live_link: '',
      source_code_link: '',
      tools: [],
      category: 'Full Stack'
    });
  };

  const addToolToForm = () => {
    if (newTool.trim() && !formData.tools?.includes(newTool.trim())) {
      setFormData({
        ...formData,
        tools: [...(formData.tools || []), newTool.trim()]
      });
      setNewTool('');
    }
  };

  const removeToolFromForm = (index: number) => {
    setFormData({
      ...formData,
      tools: formData.tools?.filter((_, i) => i !== index) || []
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingProject) {
        await updateProject(editingProject.id, formData);
        toast.success('Project updated successfully');
      } else {
        await addProject(formData as any);
        toast.success('Project added successfully');
      }
      await loadProjects();
      closeModal();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        toast.success('Project deleted successfully');
        await loadProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        toast.error('Failed to delete project');
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-73px)] flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-73px)]">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Projects
            </h1>
            <p className="text-muted-foreground mt-2">Explore my latest work and creations</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-[200px] bg-card/50 backdrop-blur-sm border-border/50">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  {PROJECT_CATEGORIES.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {isOwner && (
              <Button onClick={openAddModal} className="flex items-center gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
                <Plus className="w-4 h-4" />
                Add Project
              </Button>
            )}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex p-6 bg-muted/20 rounded-full mb-4">
              <Code className="w-12 h-12 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              {selectedFilter === 'all' ? 'No projects yet' : 'No projects found in this category'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <Card key={project.id} className="overflow-hidden flex flex-col bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/10">
                {project.image_url && (
                  <div className="aspect-video bg-muted overflow-hidden relative">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="group-hover:text-primary transition-colors flex-1">{project.title}</CardTitle>
                    {project.category && (
                      <Badge variant="outline" className="border-blue-400/30 text-blue-400 bg-blue-400/5 shrink-0">
                        {project.category}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tools?.map((tool, index) => (
                      <Badge key={index} variant="outline" className="border-primary/30 text-primary/90 bg-primary/5">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2">
                  {project.live_link && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex items-center gap-2 border-primary/30 hover:bg-primary/10 hover:text-primary"
                    >
                      <a href={project.live_link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {project.source_code_link && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex items-center gap-2 border-blue-400/30 hover:bg-blue-400/10 hover:text-blue-400"
                    >
                      <a href={project.source_code_link} target="_blank" rel="noopener noreferrer">
                        <Code className="w-4 h-4" />
                        Source Code
                      </a>
                    </Button>
                  )}
                  {isOwner && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditModal(project)}
                        className="flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(project.id)}
                        className="flex items-center gap-2 text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Project Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </DialogTitle>
            <DialogDescription>
              {editingProject ? 'Make changes to your existing project.' : 'Add a new project to your portfolio.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Project title"
                className="bg-muted/20 border-border/50"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Category</label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="bg-muted/20 border-border/50">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {PROJECT_CATEGORIES.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Project description"
                rows={4}
                className="bg-muted/20 border-border/50"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Image URL</label>
              <Input
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="bg-muted/20 border-border/50"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Live Link</label>
              <Input
                value={formData.live_link}
                onChange={(e) => setFormData({ ...formData, live_link: e.target.value })}
                placeholder="https://example.com"
                className="bg-muted/20 border-border/50"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Source Code Link</label>
              <Input
                value={formData.source_code_link}
                onChange={(e) => setFormData({ ...formData, source_code_link: e.target.value })}
                placeholder="https://github.com/username/repo"
                className="bg-muted/20 border-border/50"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Tools</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tools?.map((tool, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1 bg-primary/10 border border-primary/20">
                    {tool}
                    <button
                      type="button"
                      onClick={() => removeToolFromForm(index)}
                      className="ml-2 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newTool}
                  onChange={(e) => setNewTool(e.target.value)}
                  placeholder="Add a tool"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToolToForm())}
                  className="bg-muted/20 border-border/50"
                />
                <Button type="button" onClick={addToolToForm} variant="outline">
                  Add
                </Button>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                {editingProject ? 'Update Project' : 'Add Project'}
              </Button>
              <Button type="button" variant="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}