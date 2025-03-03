import React from 'react';
import MainSection from '../components/main-section/MainSection';
import CardSection from '../components/card-section/CardSection';
import GridSection from '../components/grid-section/GridSection';
import PerformanceSection from '../components/performance-section/PerformanceSection';

const HomePage: React.FC = () => {
  return (
    <div>
      <MainSection />
      <CardSection />
      <GridSection />
      <PerformanceSection />
    </div>
  );
};

export default HomePage;
