import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

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

  if (loading) {
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
        <h1 className="text-3xl font-bold mb-8">RSVP Responses</h1>

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
                      <TableRow key={rsvp.id}>
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
