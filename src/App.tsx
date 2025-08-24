import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import ModelsPage from "@/pages/models/ModelsPage";
import DocsPage from "@/pages/docs/DocsPage";
import WorkspacePage from "@/pages/workspace/WorkspacePage";
import CommunityPage from "@/pages/community/CommunityPage";
import { SettingsPage } from "@/pages/settings/SettingsPage";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

function App() {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout>
                <DashboardPage />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/models" element={
            <ProtectedRoute>
              <DashboardLayout>
                <ModelsPage />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/docs" element={
            <ProtectedRoute>
              <DashboardLayout>
                <DocsPage />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/workspace" element={
            <ProtectedRoute>
              <DashboardLayout>
                <WorkspacePage />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/community" element={
            <ProtectedRoute>
              <DashboardLayout>
                <CommunityPage />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <DashboardLayout>
                <SettingsPage />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
