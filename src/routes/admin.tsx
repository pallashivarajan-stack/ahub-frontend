import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Building2, LogOut, Loader2, Image as ImageIcon, Users, Layout, Calendar, Award, BarChart2, Link2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import api, { setTokens, clearTokens } from "@/services/api";

import { PortfolioTab } from "@/components/admin/PortfolioTab";

export const Route = createFileRoute("/admin")({
  component: AdminPanel,
});

function AdminPanel() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("portfolio");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", loginEmail);
      formData.append("password", loginPassword);

      const { data } = await api.post("/api/v1/auth/login", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      setTokens(data.access_token, data.refresh_token);
      setIsAuthenticated(true);
      toast.success("Welcome back, Administrator!");
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Failed to log in.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearTokens();
    setIsAuthenticated(false);
    toast.info("Logged out successfully");
  };

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,#FFE5CC_0%,#FFF0E1_30%,#FFF7F2_65%,#FFFFFF_100%)] px-4 py-12">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(60%_45%_at_50%_0%,rgba(255,198,137,0.2),transparent_58%)]" />
        <Card className="w-full max-w-md border-orange-100 shadow-[0_20px_50px_-20px_rgba(255,122,0,0.15)] bg-white/90 backdrop-blur-md">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-[#FF6B00]">
              <Building2 className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl font-black text-slate-900 font-display">AHUB Admin Portal</CardTitle>
            <CardDescription className="text-slate-500 font-medium">Log in to manage website content.</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="admin@ahub.in"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="rounded-xl border-slate-200 focus-visible:ring-[#FF6B00]"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="rounded-xl border-slate-200 focus-visible:ring-[#FF6B00]"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF6B00] hover:bg-[#E05A00] text-white font-bold py-6 rounded-xl shadow-lg hover:shadow-orange-200/50 transition-all cursor-pointer"
              >
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...</> : "Sign In"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F4] text-slate-900 pb-20 pt-8 font-sans">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/70 border border-slate-100 rounded-3xl p-6 shadow-sm backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-[#FF6B00] shadow-inner">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">CMS Admin Panel</h1>
              <p className="text-xs text-slate-500 font-medium">Manage all dynamic website content from one place</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl px-5 py-5 cursor-pointer"
            >
              <LogOut className="mr-2 h-4.5 w-4.5" /> Sign Out
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col md:flex-row gap-8">
          <TabsList className="flex flex-row md:flex-col justify-start h-auto bg-transparent p-0 gap-2 w-full md:w-64 overflow-x-auto">
            <TabsTrigger value="hero" className="justify-start px-4 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#FF6B00]">
              <Layout className="h-4 w-4 mr-3" /> Hero Section
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="justify-start px-4 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#FF6B00]">
              <Building2 className="h-4 w-4 mr-3" /> Portfolio
            </TabsTrigger>
            <TabsTrigger value="incubators" className="justify-start px-4 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#FF6B00]">
              <Users className="h-4 w-4 mr-3" /> Incubators
            </TabsTrigger>
            <TabsTrigger value="events" className="justify-start px-4 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#FF6B00]">
              <Calendar className="h-4 w-4 mr-3" /> Events
            </TabsTrigger>
            <TabsTrigger value="awards" className="justify-start px-4 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#FF6B00]">
              <Award className="h-4 w-4 mr-3" /> Awards
            </TabsTrigger>
            <TabsTrigger value="statistics" className="justify-start px-4 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#FF6B00]">
              <BarChart2 className="h-4 w-4 mr-3" /> Statistics
            </TabsTrigger>
            <TabsTrigger value="socials" className="justify-start px-4 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#FF6B00]">
              <Link2 className="h-4 w-4 mr-3" /> Social Links
            </TabsTrigger>
            <TabsTrigger value="media" className="justify-start px-4 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#FF6B00]">
              <ImageIcon className="h-4 w-4 mr-3" /> Media Library
            </TabsTrigger>
          </TabsList>
          
          <div className="flex-1 min-w-0">
            <TabsContent value="hero" className="mt-0">
              <div className="text-slate-500">Hero Editor (Coming Soon)</div>
            </TabsContent>
            
            <TabsContent value="portfolio" className="mt-0">
              <PortfolioTab />
            </TabsContent>

            <TabsContent value="incubators" className="mt-0">
              <div className="text-slate-500">Incubators Editor (Coming Soon)</div>
            </TabsContent>

            <TabsContent value="events" className="mt-0">
              <div className="text-slate-500">Events Editor (Coming Soon)</div>
            </TabsContent>

            <TabsContent value="awards" className="mt-0">
              <div className="text-slate-500">Awards Editor (Coming Soon)</div>
            </TabsContent>

            <TabsContent value="statistics" className="mt-0">
              <div className="text-slate-500">Statistics Editor (Coming Soon)</div>
            </TabsContent>

            <TabsContent value="socials" className="mt-0">
              <div className="text-slate-500">Social Links Editor (Coming Soon)</div>
            </TabsContent>

            <TabsContent value="media" className="mt-0">
              <div className="text-slate-500">Media Library (Coming Soon)</div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  );
}
