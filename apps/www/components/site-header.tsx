import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { siteConfig } from "@/lib/config"
import { source } from "@/lib/source"
import { Button } from "@/components/ui/button"
import { CommandMenu } from "@/components/command-menu"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeSwitcher } from "@/components/mode-switcher"
import blocks from "@/registry/__blocks__.json"

export function SiteHeader() {
  const pageTree = source.pageTree
  const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="border-border/50 bg-background/80 w-full border-b backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          {/* Left: Logo + Brand + Nav */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <img
                src={`${assetPrefix}/logo-saas-ui-blocks.svg`}
                alt="SaaS UI Blocks"
                className="h-8 w-8"
              />
              <span className="text-foreground inline-block text-sm font-semibold md:text-base">
                {siteConfig.name}
              </span>
            </Link>

            {/* Vertical Line Separator */}
            <div className="bg-border hidden h-6 w-px lg:block" />

            {/* Navigation Links */}
            <MainNav items={siteConfig.navItems} className="hidden lg:flex" />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex">
              <CommandMenu
                tree={pageTree}
                navItems={siteConfig.navItems}
                blocks={blocks}
              />
            </div>
            <ModeSwitcher />
            <Button
              asChild
              size="sm"
              className="hidden rounded-full sm:inline-flex"
            >
              <Link href="/docs" className="flex items-center gap-1">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <MobileNav
              tree={pageTree}
              items={siteConfig.navItems}
              className="flex lg:hidden"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
