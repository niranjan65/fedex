import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Summary from '@/components/sections/Summary';
import Architecture from '@/components/sections/Architecture';
import Workflows from '@/components/sections/Workflows';
import Routing from '@/components/sections/Routing';
import Labels from '@/components/sections/Labels';
import Dashboards from '@/components/sections/Dashboards';
import Footer from '@/components/sections/Footer';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Summary />
        <Architecture />
        <Workflows />
        <Routing />
        <Labels />
        <Dashboards />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
