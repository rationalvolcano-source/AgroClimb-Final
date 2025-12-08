import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Download, FileSpreadsheet, Loader2, ArrowLeft } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function AdminExport() {
  const { isSignedIn, isLoaded } = useUser();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  
  const today = new Date().toISOString().slice(0, 10);
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  
  const [startDate, setStartDate] = useState(thirtyDaysAgo);
  const [endDate, setEndDate] = useState(today);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0b1420] via-[#0f1530] to-[#0b1420]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#26A69A] border-t-transparent mb-4"></div>
          <p className="text-[#9fb2c3] text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0b1420] via-[#0f1530] to-[#0b1420]">
        <Nav />
        <div className="flex items-center justify-center min-h-[80vh]">
          <Card className="w-full max-w-md mx-4 bg-[#0f1f2e] border-[#1a3040]">
            <CardHeader>
              <CardTitle className="text-white">Admin Access Required</CardTitle>
              <CardDescription className="text-[#9fb2c3]">
                Please sign in to access the analytics export.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setLocation("/sign-in")}
                className="w-full bg-gradient-to-r from-[#26A69A] to-[#00BCD4]"
                data-testid="button-sign-in"
              >
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const handleExport = async () => {
    if (!startDate || !endDate) {
      toast({
        title: "Missing dates",
        description: "Please select both start and end dates.",
        variant: "destructive",
      });
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start > end) {
      toast({
        title: "Invalid date range",
        description: "Start date must be before end date.",
        variant: "destructive",
      });
      return;
    }

    const daysDiff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    if (daysDiff > 90) {
      toast({
        title: "Date range too large",
        description: "Please select a date range of 90 days or less.",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);

    try {
      const response = await fetch(
        `/api/admin/analytics/export?startDate=${startDate}&endDate=${endDate}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Export failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `analytics_${startDate}_to_${endDate}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Export successful",
        description: "Your analytics file has been downloaded.",
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Export failed",
        description: error instanceof Error ? error.message : "Failed to export analytics.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1420] via-[#0f1530] to-[#0b1420]">
      <Nav />
      
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => setLocation("/")}
          className="mb-6 text-[#9fb2c3] hover:text-white"
          data-testid="button-back-home"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="bg-[#0f1f2e] border-[#1a3040]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="w-8 h-8 text-[#26A69A]" />
              <div>
                <CardTitle className="text-white text-xl">Analytics Export</CardTitle>
                <CardDescription className="text-[#9fb2c3]">
                  Download user activity data as an Excel file
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-[#9fb2c3]">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-[#1a2d3d] border-[#2a4050] text-white"
                  data-testid="input-start-date"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-[#9fb2c3]">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-[#1a2d3d] border-[#2a4050] text-white"
                  data-testid="input-end-date"
                />
              </div>
            </div>

            <div className="bg-[#1a2d3d] rounded-lg p-4 border border-[#2a4050]">
              <h4 className="text-white font-medium mb-2">Export includes:</h4>
              <ul className="text-[#9fb2c3] text-sm space-y-1">
                <li>Journey Events - All page views and CTA clicks</li>
                <li>Weekly Activity - Visit counts and unique days per user</li>
                <li>Daily Page Metrics - Page-level visit data</li>
              </ul>
            </div>

            <Button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full bg-gradient-to-r from-[#26A69A] to-[#00BCD4] hover:opacity-90"
              data-testid="button-export"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Excel...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download Excel File
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
