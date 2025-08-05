"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { trackButtonClick } from "@/lib/posthog";

export function NavbarDemo() {
  const navItems = [
    {
      name: "How it works?",
      link: "#how-it-works",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Team",
      link: "#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            {/* <a 
              href="#how-it-works" 
              className="relative px-4 py-2 text-white hover:text-yellow-400 transition-colors"
              onClick={() => trackButtonClick('learn_more_nav')}
            >
              Learn More
            </a> */}
            <NavbarButton 
              href="#join" 
              variant="secondary"
              onClick={() => trackButtonClick('join_waitlist_nav')}
            >
              Join the Mission
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  trackButtonClick(`mobile_nav_${item.name.toLowerCase()}`);
                }}
                className="relative text-white hover:text-yellow-400 transition-colors font-medium"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              {/* <a
                href="#how-it-works"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  trackButtonClick('mobile_learn_more');
                }}
                className="relative px-4 py-2 text-white hover:text-yellow-400 transition-colors font-medium"
              >
                How Hive Works
              </a> */}
              <NavbarButton
                href="#join"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  trackButtonClick('mobile_join_waitlist');
                }}
                variant="secondary"
                className="w-full"
              >
                Join the Mission
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}

