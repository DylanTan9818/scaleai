import React from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page</p>
      <Button asChild>
        <Link href="/dashboard">Get Started!</Link>
      </Button>
    </div>
  );
};

export default LandingPage;
