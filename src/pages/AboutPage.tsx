import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getAbout, updateAbout } from '../utils/db';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Edit, Save, X, Download, Upload, FileText } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function AboutPage() {
  const { isOwner } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [aboutData, setAboutData] = useState({
    video_url: '',
    description: '',
    tools: [] as string[],
    resume_url: ''
  });
  const [editData, setEditData] = useState(aboutData);
  const [newTool, setNewTool] = useState('');

  useEffect(() => {
    loadAboutData();
  }, []);

  const loadAboutData = async () => {
    try {
      const data = await getAbout();
      if (data) {
        setAboutData(data);
      }
    } catch (error: any) {
      console.error('Error loading about data:', error);
      if (error?.message?.includes('does not exist') || error?.code === 'PGRST205') {
        setAboutData({
          video_url: '',
          description: '',
          tools: [],
          resume_url: ''
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditData(aboutData);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateAbout(editData);
      setAboutData(editData);
      setIsEditing(false);
      toast.success('About section updated successfully');
    } catch (error) {
      console.error('Error saving about data:', error);
      toast.error('Failed to update about section');
    }
  };

  const handleCancel = () => {
    setEditData(aboutData);
    setIsEditing(false);
  };

  const addTool = () => {
    if (newTool.trim() && !editData.tools.includes(newTool.trim())) {
      setEditData({ ...editData, tools: [...editData.tools, newTool.trim()] });
      setNewTool('');
    }
  };

  const removeTool = (index: number) => {
    setEditData({
      ...editData,
      tools: editData.tools.filter((_, i) => i !== index)
    });
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              About Me
            </h1>
            <p className="text-muted-foreground mt-2">Learn more about my journey and skills</p>
          </div>
          {isOwner && !isEditing && (
            <Button onClick={handleEdit} className="flex items-center gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
              <Edit className="w-4 h-4" />
              Edit
            </Button>
          )}
          {isOwner && isEditing && (
            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex items-center gap-2 bg-primary hover:bg-primary/90">
                <Save className="w-4 h-4" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline" className="flex items-center gap-2">
                <X className="w-4 h-4" />
                Cancel
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Video and Tools */}
          <div className="space-y-6">
            {/* Video Section */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all">
              <CardHeader>
                <CardTitle>Introduction Video</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="space-y-2">
                    <Input
                      value={editData.video_url}
                      onChange={(e) => setEditData({ ...editData, video_url: e.target.value })}
                      placeholder="Enter video URL (YouTube embed, MP4, etc.)"
                      className="bg-muted/20 border-border/50"
                    />
                    <p className="text-muted-foreground text-sm">
                      For YouTube: Use embed URL (e.g., https://www.youtube.com/embed/VIDEO_ID)
                    </p>
                  </div>
                ) : aboutData.video_url ? (
                  <div className="aspect-video bg-muted/20 rounded-xl overflow-hidden border border-border/30">
                    {aboutData.video_url.includes('youtube.com') || aboutData.video_url.includes('vimeo.com') ? (
                      <iframe
                        src={`${aboutData.video_url}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&playsinline=1`}
                        className="w-full h-full"
                        allow="autoplay; loop"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        src={aboutData.video_url}
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    )}
                  </div>
                ) : (
                  <div className="aspect-video bg-muted/20 rounded-xl flex items-center justify-center border border-border/30">
                    <p className="text-muted-foreground">No video added yet</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tools Section */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all">
              <CardHeader>
                <CardTitle>Tools & Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {(isEditing ? editData.tools : aboutData.tools).map((tool, index) => (
                      <Badge key={index} variant="secondary" className="px-4 py-2 bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-colors">
                        {tool}
                        {isEditing && (
                          <button
                            onClick={() => removeTool(index)}
                            className="ml-2 hover:text-destructive transition-colors"
                          >
                            ×
                          </button>
                        )}
                      </Badge>
                    ))}
                    {!isEditing && aboutData.tools.length === 0 && (
                      <p className="text-muted-foreground">No tools added yet</p>
                    )}
                  </div>
                  
                  {isEditing && (
                    <div className="flex gap-2">
                      <Input
                        value={newTool}
                        onChange={(e) => setNewTool(e.target.value)}
                        placeholder="Add a tool (e.g., Excel, Power BI, React)"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTool())}
                        className="bg-muted/20 border-border/50"
                      />
                      <Button onClick={addTool} variant="outline" className="border-primary/30 hover:bg-primary/10">
                        Add
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Resume Section */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all">
              <CardHeader>
                <CardTitle>Resume</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="space-y-2">
                    <Input
                      value={editData.resume_url}
                      onChange={(e) => setEditData({ ...editData, resume_url: e.target.value })}
                      placeholder="Enter resume URL (PDF link, Google Drive, etc.)"
                      className="bg-muted/20 border-border/50"
                    />
                    <p className="text-muted-foreground text-sm">
                      Upload your resume to a cloud service and paste the shareable link here
                    </p>
                  </div>
                ) : aboutData.resume_url ? (
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-border/30 bg-muted/10">
                    <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground font-medium">My Resume</p>
                      <p className="text-sm text-muted-foreground">Click to download or view</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-primary/30 hover:bg-primary/10"
                    >
                      <a href={aboutData.resume_url} target="_blank" rel="noopener noreferrer" download>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </a>
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center p-8 rounded-xl border border-dashed border-border/50 bg-muted/10">
                    <p className="text-muted-foreground">No resume added yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Description */}
          <div>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all h-full">
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    placeholder="Write about yourself..."
                    rows={20}
                    className="bg-muted/20 border-border/50 resize-none"
                  />
                ) : (
                  <div className="prose prose-invert max-w-none">
                    <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">
                      {aboutData.description || 'No description added yet'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
