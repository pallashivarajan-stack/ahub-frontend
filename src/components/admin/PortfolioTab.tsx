import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Building2, ExternalLink, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { useCompanies, useCreateCompany, useUpdateCompany, useDeleteCompany } from "@/hooks/useCMS";

const BACKEND_URL = "http://localhost:8000";

export function PortfolioTab() {
  const { data: companiesData, isLoading } = useCompanies();
  const createCompany = useCreateCompany();
  const updateCompany = useUpdateCompany();
  const deleteCompany = useDeleteCompany();

  const companies = companiesData?.items || [];
  const totalCompanies = companiesData?.total || 0;

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<any | null>(null);

  const [companyName, setCompanyName] = useState("");
  const [slug, setSlug] = useState("");
  const [industryTag, setIndustryTag] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [founderName, setFounderName] = useState("");
  const [founderDesignation, setFounderDesignation] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [cardBackgroundColor, setCardBackgroundColor] = useState("#FFFFFF");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [logoImageFile, setLogoImageFile] = useState<File | null>(null);
  const [founderImageFile, setFounderImageFile] = useState<File | null>(null);

  const openCreateDialog = () => {
    setEditingCompany(null);
    setCompanyName("");
    setSlug("");
    setIndustryTag("");
    setShortDescription("");
    setFounderName("");
    setFounderDesignation("");
    setWebsiteUrl("");
    setCardBackgroundColor("#FFFFFF");
    setDisplayOrder(0);
    setIsActive(true);
    setFeatured(false);
    setLogoImageFile(null);
    setFounderImageFile(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (company: any) => {
    setEditingCompany(company);
    setCompanyName(company.company_name);
    setSlug(company.slug);
    setIndustryTag(company.industry_tag || company.tag || "");
    setShortDescription(company.short_description || company.description || "");
    setFounderName(company.founder_name);
    setFounderDesignation(company.founder_designation);
    setWebsiteUrl(company.website_url || "");
    setCardBackgroundColor(company.card_background_color || "#FFFFFF");
    setDisplayOrder(company.display_order);
    setIsActive(company.status === 'active' || company.is_active);
    setFeatured(company.featured || false);
    setLogoImageFile(null);
    setFounderImageFile(null);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("company_name", companyName);
    formData.append("slug", slug || companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
    formData.append("industry_tag", industryTag);
    formData.append("short_description", shortDescription);
    formData.append("founder_name", founderName);
    formData.append("founder_designation", founderDesignation);
    if (websiteUrl) formData.append("website_url", websiteUrl);
    formData.append("card_background_color", cardBackgroundColor);
    formData.append("display_order", displayOrder.toString());
    formData.append("status", isActive ? "active" : "inactive");
    formData.append("featured", featured ? "true" : "false");

    if (logoImageFile) formData.append("logo_image", logoImageFile);
    if (founderImageFile) formData.append("founder_photo", founderImageFile);

    try {
      if (editingCompany) {
        await updateCompany.mutateAsync({ id: editingCompany.id, formData });
        toast.success("Company updated!");
      } else {
        await createCompany.mutateAsync(formData);
        toast.success("Company created!");
      }
      setIsDialogOpen(false);
    } catch (err: any) {
      toast.error(err.response?.data?.detail || err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this company?")) return;
    try {
      await deleteCompany.mutateAsync(id);
      toast.success("Company deleted successfully!");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Filter local if no backend search yet
  const filteredCompanies = search
    ? companies.filter((c: any) => c.company_name.toLowerCase().includes(search.toLowerCase()))
    : companies;

  return (
    <div className="space-y-6">
      <Card className="border-slate-100 shadow-sm rounded-3xl overflow-hidden bg-white">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-50">
          <div>
            <CardTitle className="text-lg font-extrabold text-slate-900">Portfolio Startups</CardTitle>
            <CardDescription className="text-slate-400">Manage your portfolio showcase.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl max-w-xs border-slate-200"
            />
            <Button onClick={openCreateDialog} className="bg-[#FF6B00] hover:bg-[#E05A00] text-white rounded-xl">
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="py-12 flex justify-center"><Loader2 className="animate-spin text-slate-400" /></div>
          ) : (
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="w-[80px]">Logo</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Tag</TableHead>
                  <TableHead>Founder</TableHead>
                  <TableHead className="text-center">Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompanies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-slate-400">No companies found.</TableCell>
                  </TableRow>
                ) : (
                  filteredCompanies.map((company: any) => (
                    <TableRow key={company.id}>
                      <TableCell>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border overflow-hidden">
                          {company.logo_image ? (
                            <img src={company.logo_image.startsWith('http') ? company.logo_image : `${BACKEND_URL}${company.logo_image}`} alt={company.company_name} className="h-7 w-7 object-contain" />
                          ) : <Building2 className="h-4 w-4 text-slate-300" />}
                        </div>
                      </TableCell>
                      <TableCell className="font-bold text-slate-900">
                        {company.company_name}
                      </TableCell>
                      <TableCell>
                        <span className="rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 uppercase">
                          {company.industry_tag || company.tag}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs font-bold text-slate-800">{company.founder_name}</div>
                        <div className="text-[10px] text-slate-400">{company.founder_designation}</div>
                      </TableCell>
                      <TableCell className="text-center">{company.display_order}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(company)}>
                          <Edit2 className="h-4 w-4 text-slate-500" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(company.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl rounded-3xl p-6 bg-white max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <DialogHeader>
              <DialogTitle>{editingCompany ? "Edit Company" : "Add Company"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Company Name *</Label>
                <Input required value={companyName} onChange={e => setCompanyName(e.target.value)} />
              </div>
              <div>
                <Label>Industry Tag *</Label>
                <Input required value={industryTag} onChange={e => setIndustryTag(e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <Label>Short Description</Label>
                <Textarea value={shortDescription} onChange={e => setShortDescription(e.target.value)} />
              </div>
              <div>
                <Label>Founder Name *</Label>
                <Input required value={founderName} onChange={e => setFounderName(e.target.value)} />
              </div>
              <div>
                <Label>Founder Designation</Label>
                <Input value={founderDesignation} onChange={e => setFounderDesignation(e.target.value)} />
              </div>
              <div>
                <Label>Website URL</Label>
                <Input type="url" value={websiteUrl} onChange={e => setWebsiteUrl(e.target.value)} />
              </div>
              <div>
                <Label>Card Background Color</Label>
                <Input type="color" value={cardBackgroundColor} onChange={e => setCardBackgroundColor(e.target.value)} className="h-10 px-1 py-1" />
              </div>
              <div>
                <Label>Display Order</Label>
                <Input type="number" value={displayOrder} onChange={e => setDisplayOrder(parseInt(e.target.value) || 0)} />
              </div>
              <div className="flex items-center gap-4 pt-6">
                <div className="flex items-center gap-2">
                  <Switch checked={isActive} onCheckedChange={setIsActive} />
                  <Label>Active</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={featured} onCheckedChange={setFeatured} />
                  <Label>Featured</Label>
                </div>
              </div>
              <div>
                <Label>Logo Image</Label>
                <Input type="file" accept="image/*" onChange={e => setLogoImageFile(e.target.files?.[0] || null)} />
              </div>
              <div>
                <Label>Founder Photo</Label>
                <Input type="file" accept="image/*" onChange={e => setFounderImageFile(e.target.files?.[0] || null)} />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={createCompany.isPending || updateCompany.isPending} className="bg-[#FF6B00] hover:bg-[#E05A00] text-white">
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
