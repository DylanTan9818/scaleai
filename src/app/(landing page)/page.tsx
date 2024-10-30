import React from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import HeroSection from "./_component/hero";
import CompaniesLogo from "./_component/logocarousel";
import CallToAction from "./_component/cta";
import Footer from "./_component/footer";

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <CompaniesLogo />
      <CallToAction />
      <Footer />
      <h1>Home Page</h1>
      <p>Welcome to the home page</p>
      <Button asChild>
        <Link href="/dashboard">Get Started!</Link>
      </Button>
    </div>
  );
};

export default LandingPage;
