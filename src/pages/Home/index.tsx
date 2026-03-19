import React, { useEffect } from "react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { useAppDispatch } from "../../hooks";
import { fetchFeaturedProperties, fetchPremiumProperties } from "../../store/slices/propertiesSlice";
import { HeroSection } from "../../components/home/HeroSection";
import { HomeSections } from "../../components/home/HomeSections";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFeaturedProperties(8));
    dispatch(fetchPremiumProperties(4));
  }, [dispatch]);

  return (
    <PageWrapper noPadding>
      <HeroSection />
      <HomeSections />
    </PageWrapper>
  );
};

export default Home;