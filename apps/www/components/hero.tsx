import type { ComponentProps } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

const ShadcnLogo = (props: ComponentProps<"svg">) => (
  <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>shadcn/ui</title>
    <rect width="256" height="256" fill="none" />
    <line
      x1="208"
      y1="128"
      x2="128"
      y2="208"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
    <line
      x1="192"
      y1="40"
      x2="40"
      y2="192"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
  </svg>
)

export const Hero = () => (
  <section className="flex flex-col items-center justify-center gap-6 px-4 py-16 sm:px-16 sm:py-24">
    <div className="bg-background text-foreground inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border py-1 pr-3 pl-1 text-sm leading-6 shadow-xs sm:w-fit">
      <span className="rounded-full bg-indigo-600 px-2 font-semibold text-white">
        New
      </span>
      <span className="truncate font-medium">Built on top of shadcn/ui</span>
    </div>
    <h1 className="max-w-3xl text-center text-4xl leading-tight font-semibold tracking-tighter! text-balance sm:text-5xl md:max-w-4xl md:text-6xl lg:leading-[1.1]">
      Production-grade{" "}
      <ShadcnLogo className="pointer-events-none mx-1.5 inline-block h-8 w-auto translate-y-0.5 align-baseline select-none sm:h-[38px] md:h-[48px] md:translate-y-1" />
      shadcn/ui components for SaaS apps
    </h1>
    <p className="text-muted-foreground max-w-xl text-center text-balance md:max-w-2xl md:text-lg">
      Beautiful components, blocks, and UI elements designed to speed up your
      SaaS development. Built with React and shadcn/ui.
    </p>
    <div className="mx-auto flex w-full max-w-lg flex-col items-center justify-center gap-4 sm:flex-row">
      <Button asChild size="lg" className="w-full sm:w-auto">
        <Link href="/blocks">Browse Blocks</Link>
      </Button>
      <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
        <Link href="/docs">Read the docs</Link>
      </Button>
    </div>
  </section>
)
