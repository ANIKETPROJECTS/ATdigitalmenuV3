import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Welcome from "@/pages/welcome";
import MenuLanding from "@/pages/menu-landing";
import CategorySelection from "@/pages/category-selection";
import SubcategoryProducts from "@/pages/subcategory-products";
import CustomerList from "@/pages/customer-list";
import NotFound from "@/pages/not-found";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
// @ts-ignore
import waveAnimation from "@assets/Material_wave_loading_1773735960366.json";

function AppLoader({ onDone }: { onDone: () => void }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1800);
    const doneTimer = setTimeout(() => onDone(), 2300);
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer); };
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#0D0A00",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.5s ease",
        pointerEvents: fading ? "none" : "all",
      }}
    >
      <Lottie
        animationData={waveAnimation}
        loop
        autoplay
        style={{ width: 200, height: 200 }}
      />
      <p
        style={{
          color: "#D4AF37",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "13px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          opacity: 0.8,
        }}
      >
        Loading…
      </p>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Welcome} />
      <Route path="/menu" component={MenuLanding} />
      <Route path="/menu/:category" component={CategorySelection} />
      <Route path="/menu/:category/:subcategory" component={SubcategoryProducts} />
      <Route path="/customers" component={CustomerList} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [appReady, setAppReady] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            {!appReady && <AppLoader onDone={() => setAppReady(true)} />}
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
