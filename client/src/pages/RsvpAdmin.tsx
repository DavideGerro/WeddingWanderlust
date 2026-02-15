import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { Trash2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Rsvp {
  id: number;
  name: string;
  email: string;
  attendingWedding: boolean;
  attendingBoatTour: boolean;
  numberOfGuests: number | null;
  dietaryRestrictions: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  total: number;
  attendingWedding: number;
  attendingBoatTour: number;
  totalGuests: number;
}

export default function RsvpAdmin() {
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const fetchRsvps = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/rsvps", {
        headers: {
          "x-admin-key": adminKey
        }
      });
      if (response.status === 401) {
        throw new Error("Invalid admin key");
      }
      if (!response.ok) throw new Error("Failed to fetch RSVPs");
      const data = await response.json();
      setRsvps(data.rsvps);
      setStats(data.stats);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} selected RSVP(s)?`)) return;

    setIsDeleting(true);
    try {
      const response = await fetch("/api/admin/rsvps", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey
        },
        body: JSON.stringify({ ids: selectedIds })
      });

      if (!response.ok) throw new Error("Failed to delete RSVPs");

      toast({
        title: "Success",
        description: `${selectedIds.length} RSVP(s) deleted successfully`,
      });
      
      setSelectedIds([]);
      fetchRsvps();
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to delete RSVPs",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const exportToExcel = () => {
    const BOM = "\uFEFF";
    const headers = ["Name", "Email", "Attending Wedding", "Attending Boat Tour", "Number of Guests", "Dietary Restrictions", "Submitted", "Last Updated"];
    const csvContent = rsvps.map(rsvp => {
      return [
        `"${(rsvp.name || "").replace(/"/g, '""')}"`,
        `"${(rsvp.email || "").replace(/"/g, '""')}"`,
        rsvp.attendingWedding ? "Yes" : "No",
        rsvp.attendingBoatTour ? "Yes" : "No",
        rsvp.numberOfGuests || 1,
        `"${(rsvp.dietaryRestrictions || "").replace(/"/g, '""')}"`,
        format(new Date(rsvp.createdAt), "yyyy-MM-dd HH:mm"),
        format(new Date(rsvp.updatedAt), "yyyy-MM-dd HH:mm")
      ].join(",");
    });

    const csv = BOM + [headers.join(","), ...csvContent].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `rsvp_export_${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === rsvps.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(rsvps.map(r => r.id));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  if (loading && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg">Loading RSVPs...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Access</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); fetchRsvps(); }} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter admin key"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading || !adminKey}>
                {loading ? "Verifying..." : "Access RSVP Data"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">RSVP Responses</h1>
          <div className="flex gap-2">
            {selectedIds.length > 0 && (
              <Button 
                variant="destructive" 
                onClick={handleDelete}
                disabled={isDeleting}
                data-testid="button-delete-rsvps"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete ({selectedIds.length})
              </Button>
            )}
            {rsvps.length > 0 && (
              <Button variant="outline" onClick={exportToExcel} data-testid="button-export-excel">
                <Download className="w-4 h-4 mr-2" />
                Export Excel
              </Button>
            )}
            <Button variant="outline" onClick={fetchRsvps} disabled={loading} data-testid="button-refresh-rsvps">
              Refresh
            </Button>
          </div>
        </div>

        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Responses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.total}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Attending Wedding</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">{stats.attendingWedding}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Attending Boat Tour</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600">{stats.attendingBoatTour}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Guests</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-purple-600">{stats.totalGuests}</p>
              </CardContent>
            </Card>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>All Responses</CardTitle>
          </CardHeader>
          <CardContent>
            {rsvps.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">No RSVPs yet</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox 
                          checked={selectedIds.length === rsvps.length && rsvps.length > 0}
                          onCheckedChange={toggleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Wedding</TableHead>
                      <TableHead>Boat Tour</TableHead>
                      <TableHead>Guests</TableHead>
                      <TableHead>Dietary</TableHead>
                      <TableHead>Submitted</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rsvps.map((rsvp) => (
                      <TableRow key={rsvp.id} className={selectedIds.includes(rsvp.id) ? "bg-muted/50" : ""}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedIds.includes(rsvp.id)}
                            onCheckedChange={() => toggleSelect(rsvp.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{rsvp.name}</TableCell>
                        <TableCell>{rsvp.email}</TableCell>
                        <TableCell>
                          <Badge variant={rsvp.attendingWedding ? "default" : "secondary"}>
                            {rsvp.attendingWedding ? "Yes" : "No"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={rsvp.attendingBoatTour ? "default" : "secondary"}>
                            {rsvp.attendingBoatTour ? "Yes" : "No"}
                          </Badge>
                        </TableCell>
                        <TableCell>{rsvp.numberOfGuests || 1}</TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {rsvp.dietaryRestrictions || "-"}
                        </TableCell>
                        <TableCell>
                          {format(new Date(rsvp.createdAt), "MMM d, yyyy")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
