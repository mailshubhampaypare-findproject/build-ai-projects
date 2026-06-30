import {
  ArrowLeft,
  Save,
  Eye,
  Settings,
  Image as ImageIcon,
  FileCode,
  ListChecks,
  Layout,
  Rocket,
  Globe,
  Loader2,
  Trash2
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DynamicList } from "./dynamic-list";
import { MediaUpload } from "./media-upload";

interface ProjectFormProps {
  initialData?: any;
  isLoading?: boolean;
  isSaving?: boolean;
  onSave: (data: any) => void;
  title: string;
}

export function ProjectForm({ initialData, isLoading, isSaving, onSave, title }: ProjectFormProps) {
  const [activeTab, setActiveTab] = useState("basic");

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [status, setStatus] = useState<"Draft" | "Published">("Draft");
  const [isProOnly, setIsProOnly] = useState(false);
  const [downloadsEnabled, setDownloadsEnabled] = useState(true);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [zipUrl, setZipUrl] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");
  const [aiSettings, setAiSettings] = useState({ similar: true, chat: true, reports: true });

  const [features, setFeatures] = useState<{ id: string; title: string }[]>([]);
  const [modules, setModules] = useState<{ id: string; title: string; description: string }[]>([]);
  const [launchSteps, setLaunchSteps] = useState<{ id: string; title: string; description: string }[]>([]);

  const { data: categories } = useQuery({ queryKey: ["categories"], queryFn: async () => (await supabase.from("categories").select("*")).data });
  const { data: departments } = useQuery({ queryKey: ["departments"], queryFn: async () => (await supabase.from("departments").select("*")).data });

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setSlug(initialData.slug || "");
      setShortDesc(initialData.description || "");
      setFullDesc(initialData.full_description || "");
      setCategoryId(initialData.category_id || "");
      setDepartmentId(initialData.department_id || "");
      setDifficulty(initialData.difficulty || "Intermediate");
      setStatus(initialData.status || "Draft");
      setIsProOnly(initialData.is_pro_only || false);
      setDownloadsEnabled(initialData.downloads_enabled ?? true);
      setThumbnailUrl(initialData.thumbnail_url || "");
      setSeoTitle(initialData.seo_title || "");
      setSeoDesc(initialData.meta_description || "");
      setAiSettings(initialData.ai_settings || { similar: true, chat: true, reports: true });

      if (initialData.features) setFeatures(initialData.features.map((f: any) => ({ id: f.id, title: f.feature })));
      if (initialData.modules) setModules(initialData.modules.map((m: any) => ({ id: m.id, title: m.title, description: m.description || "" })));
      if (initialData.launchSteps) setLaunchSteps(initialData.launchSteps.map((s: any) => ({ id: s.id, title: s.title, description: s.content || "" })));
    }
  }, [initialData]);

  useEffect(() => {
    if (name && !slug && !initialData) {
      setSlug(name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
    }
  }, [name, initialData]);

  const handleSave = () => {
    onSave({
      name, slug, shortDesc, fullDesc, categoryId, departmentId, difficulty, status,
      isProOnly, downloadsEnabled, thumbnailUrl, zipUrl, seoTitle, seoDesc, aiSettings,
      features, modules, launchSteps
    });
  };

  if (isLoading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/admin/projects">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleSave} className="gap-2" disabled={isSaving}>
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Project
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="basic" className="gap-2"><Settings className="h-4 w-4" /> Basic Info</TabsTrigger>
          <TabsTrigger value="media" className="gap-2"><ImageIcon className="h-4 w-4" /> Media & Files</TabsTrigger>
          <TabsTrigger value="content" className="gap-2"><Layout className="h-4 w-4" /> Content</TabsTrigger>
          <TabsTrigger value="launch" className="gap-2"><Rocket className="h-4 w-4" /> Launch Guide</TabsTrigger>
          <TabsTrigger value="advanced" className="gap-2"><Globe className="h-4 w-4" /> SEO & AI</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader><CardTitle>General Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2"><Label>Project Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
                  <div className="space-y-2"><Label>Slug</Label><Input value={slug} onChange={(e) => setSlug(e.target.value)} /></div>
                </div>
                <div className="space-y-2"><Label>Short Description</Label><Textarea value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} /></div>
                <div className="space-y-2"><Label>Full Description</Label><Textarea value={fullDesc} onChange={(e) => setFullDesc(e.target.value)} className="min-h-[200px]" /></div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle>Classification</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={categoryId} onValueChange={setCategoryId}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {categories?.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Difficulty</Label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Visibility</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between"><Label>Published</Label><Switch checked={status === "Published"} onCheckedChange={(v) => setStatus(v ? "Published" : "Draft")} /></div>
                  <div className="flex items-center justify-between"><Label>Pro Only</Label><Switch checked={isProOnly} onCheckedChange={setIsProOnly} /></div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Thumbnail</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {thumbnailUrl && <img src={thumbnailUrl} className="aspect-video rounded-lg object-cover border mb-4" />}
                <MediaUpload label="Upload Thumbnail" onUploadComplete={(url) => setThumbnailUrl(url as string)} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Files</CardTitle></CardHeader>
              <CardContent>
                <MediaUpload label="Upload ZIP" accept=".zip" onUploadComplete={(url) => setZipUrl(url as string)} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card><CardHeader><CardTitle>Features</CardTitle></CardHeader><CardContent><DynamicList titleLabel="Feature" items={features} onAdd={() => setFeatures([...features, { id: Math.random().toString(), title: "" }])} onRemove={(id) => setFeatures(features.filter(f => f.id !== id))} onChange={(id, field, value) => setFeatures(features.map(f => f.id === id ? { ...f, [field]: value } : f))} /></CardContent></Card>
            <Card><CardHeader><CardTitle>Modules</CardTitle></CardHeader><CardContent><DynamicList titleLabel="Module" descLabel="Description" items={modules} onAdd={() => setModules([...modules, { id: Math.random().toString(), title: "", description: "" }])} onRemove={(id) => setModules(modules.filter(m => m.id !== id))} onChange={(id, field, value) => setModules(modules.map(m => m.id === id ? { ...m, [field]: value } : m))} /></CardContent></Card>
          </div>
        </TabsContent>

        <TabsContent value="launch"><Card><CardHeader><CardTitle>Launch Steps</CardTitle></CardHeader><CardContent><DynamicList titleLabel="Step" descLabel="Instructions" items={launchSteps} onAdd={() => setLaunchSteps([...launchSteps, { id: Math.random().toString(), title: "", description: "" }])} onRemove={(id) => setLaunchSteps(launchSteps.filter(s => s.id !== id))} onChange={(id, field, value) => setLaunchSteps(launchSteps.map(s => s.id === id ? { ...s, [field]: value } : s))} /></CardContent></Card></TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card><CardHeader><CardTitle>SEO</CardTitle></CardHeader><CardContent className="space-y-4"><div className="space-y-2"><Label>Title</Label><Input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} /></div><div className="space-y-2"><Label>Description</Label><Textarea value={seoDesc} onChange={(e) => setSeoDesc(e.target.value)} /></div></CardContent></Card>
            <Card><CardHeader><CardTitle>AI</CardTitle></CardHeader><CardContent className="space-y-4"><div className="flex items-center justify-between"><Label>Similar Project</Label><Switch checked={aiSettings.similar} onCheckedChange={(v) => setAiSettings({ ...aiSettings, similar: v })} /></div><div className="flex items-center justify-between"><Label>Code Chat</Label><Switch checked={aiSettings.chat} onCheckedChange={(v) => setAiSettings({ ...aiSettings, chat: v })} /></div></CardContent></Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
