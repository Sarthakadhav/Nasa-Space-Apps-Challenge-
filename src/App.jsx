import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { MissionProvider, useMission } from './context/MissionContext';
import { Header } from './components/common/Header';
import { Navigation } from './components/common/Navigation';
import { AudioAlerts } from './components/common/AudioAlerts';

// Module components
import { LandingOverview } from './components/dashboard/LandingOverview';
import { AstraSenseIoT } from './components/modules/AstraSenseIoT';
import { PersonalBaseline } from './components/modules/PersonalBaseline';
import { CrewMatrix } from './components/modules/CrewMatrix';
import { MedVault } from './components/modules/MedVault';
import { MissionMedic } from './components/modules/MissionMedic';
import { MissionContinuity } from './components/modules/MissionContinuity';
import { HardwareSimulator } from './components/modules/HardwareSimulator';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Dashboard caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 rounded-2xl bg-white dark:bg-[#1a1b1f] border border-amber-200/60 dark:border-amber-900/40 text-center space-y-4 my-8">
          <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center font-bold text-lg">
            !
          </div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Unable to display this view
          </h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            {this.state.error?.message || "An unexpected error occurred while loading this view."}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
            className="px-4 py-2 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-medium hover:bg-neutral-800 transition-colors"
          >
            Reload Dashboard
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const MainAppContent = () => {
  const { activeTab } = useMission();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <LandingOverview />;
      case 'crew-matrix':
        return <CrewMatrix />;
      case 'health-monitoring':
        return <AstraSenseIoT />;
      case 'ai-intelligence':
        return <PersonalBaseline />;
      case 'mission-medic':
        return <MissionMedic />;
      case 'med-vault':
        return <MedVault />;
      case 'mission-incidents':
      case 'recovery-tracker':
        return <MissionContinuity />;
      case 'hardware-sim':
        return <HardwareSimulator />;
      default:
        return <LandingOverview />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] dark:bg-[#121316] text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <AudioAlerts />
      <Header />
      <Navigation />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorBoundary>
          {renderActiveView()}
        </ErrorBoundary>
      </main>

      <footer className="w-full border-t border-gray-100 dark:border-[#22242a] bg-white dark:bg-[#15161a] py-5 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">NASA Space Apps Challenge</span>
            <span className="mx-2">•</span>
            <span>AI Health Monitoring for Long-Duration Space Missions</span>
          </div>
          <div className="text-[11px] text-gray-400">
            Offline Edge Engine (Isolation Forest) • Not for clinical use
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <MissionProvider>
        <MainAppContent />
      </MissionProvider>
    </ThemeProvider>
  );
}
