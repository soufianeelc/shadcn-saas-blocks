import { Check, ChevronRight } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function OnboardingProgressCard() {
  const totalBars = 40
  const filledBars = 18

  const gradientColors = [
    "#0D9488", // teal-600
    "#14B8A6", // teal-500
    "#2DD4BF", // teal-400
    "#5EEAD4", // teal-300
    "#99F6E4", // teal-200
  ]

  const listItems = [
    { id: "workspace", text: "Create your workspace", state: "pending" },
    { id: "profile", text: "Complete your profile", state: "pending" },
    { id: "team", text: "Invite team members", state: "pending" },
  ]

  return (
    <Card
      className="relative mx-auto max-w-xl rounded-3xl border px-4 py-6 shadow-2xl"
      role="group"
      aria-label="Onboarding checklist"
    >
      <CardHeader className="space-y-2 pb-4 text-center">
        <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center">
          <svg
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-foreground"
          >
            <path
              d="M21 3L3 12v18l18 9 18-9V12L21 3z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M21 21L12 16.5M21 21l9-4.5M21 21v9"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>

        <CardTitle className="text-center text-2xl leading-tight font-light">
          Welcome to your workspace!
        </CardTitle>

        <CardDescription className="mx-auto max-w-lg text-center text-base leading-normal font-light">
          Let's get you set up. Complete these steps to unlock the full
          experience.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div
          className="flex items-end justify-center gap-1.5"
          role="meter"
          aria-valuenow={filledBars}
          aria-valuemin={0}
          aria-valuemax={totalBars}
          aria-label="Onboarding progress"
        >
          {Array.from({ length: totalBars }).map((_, i) => {
            const isFilled = i < filledBars
            const colorIndex = Math.floor(
              (i / filledBars) * (gradientColors.length - 1)
            )
            const backgroundColor = isFilled
              ? gradientColors[Math.min(colorIndex, gradientColors.length - 1)]
              : undefined

            return (
              <div
                key={i}
                className="bg-muted h-10 w-2 rounded-md"
                style={
                  isFilled
                    ? {
                        backgroundColor,
                      }
                    : undefined
                }
              />
            )
          })}
        </div>

        <div
          className="bg-card/95 overflow-hidden rounded-2xl border backdrop-blur"
          role="list"
        >
          {listItems.map((item, index) => (
            <div
              key={item.id}
              className="flex h-16 items-center justify-between border-b px-4 last:border-b-0"
              role="listitem"
            >
              <div className="flex items-center gap-3">
                <div className="bg-muted grid h-7 w-7 place-items-center rounded-full border">
                  <Check className="text-muted-foreground h-4 w-4" />
                </div>
                <span className="text-lg font-medium">{item.text}</span>
              </div>
              <ChevronRight className="text-muted-foreground h-4 w-4 shrink-0" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
