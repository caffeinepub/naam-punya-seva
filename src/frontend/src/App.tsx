import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { HomePage } from "./pages/HomePage";
import { PrayersPage } from "./pages/PrayersPage";
import { RitualsPage } from "./pages/RitualsPage";
import { SchedulePage } from "./pages/SchedulePage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { BottomNav } from "./components/BottomNav";
import { Header } from "./components/Header";

export type TabId = "home" | "prayers" | "rituals" | "schedule" | "favorites";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("home");

  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return <HomePage onNavigate={setActiveTab} />;
      case "prayers":
        return <PrayersPage />;
      case "rituals":
        return <RitualsPage />;
      case "schedule":
        return <SchedulePage />;
      case "favorites":
        return <FavoritesPage />;
    }
  };

  return (
    <div className="min-h-screen temple-bg flex flex-col max-w-2xl mx-auto relative">
      <Header />
      <main className="flex-1 overflow-auto pb-24 px-4 pt-2">
        {renderPage()}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      <Toaster position="top-center" />
    </div>
  );
}
