"use client"

import * as React from "react"
import NextImage from "next/image"
import {
  Barbell,
  Bed,
  Bicycle,
  CaretRight,
  CheckCircle,
  Folder,
  Heart,
  Lightning,
  Pause,
  Phone,
  Play,
  SkipBack,
  SkipForward,
  Users,
  VideoConferenceIcon as VideoCamera,
} from "@phosphor-icons/react"
import type { Icon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Type definitions
interface TimeRange {
  start: string
  end: string
  ampm?: string
}

interface AvatarItem {
  name: string
  image?: string | null
  initials: string
  color: string
  highlight?: boolean
}

interface Section {
  label: string
  value: string | AvatarItem[]
  icon: string
}

interface Tile {
  id: string
  type: string
  colSpan: number
  rowSpan: number
  props: Record<string, any>
}

interface BentoData {
  version: string
  meta: {
    title: string
    grid: { cols: number; gap: string; maxWidth: string; padding: string }
    brand: { accent: string; radius: string }
  }
  tiles: Tile[]
}

// Icon mapping
const iconMap: Record<string, Icon> = {
  Zap: Lightning,
  Folder,
  Users,
  ChevronRight: CaretRight,
  Phone,
  Video: VideoCamera,
  Bike: Bicycle,
  Dumbbell: Barbell,
  BedDouble: Bed,
  BadgeCheck: CheckCircle,
  CheckCircle2: CheckCircle,
}

// Color class mapping for avatar backgrounds
const colorClassMap: Record<string, { bg: string; text: string }> = {
  emerald: { bg: "bg-emerald-100", text: "text-emerald-700" },
  sky: { bg: "bg-sky-100", text: "text-sky-700" },
  amber: { bg: "bg-amber-100", text: "text-amber-700" },
  violet: { bg: "bg-violet-100", text: "text-violet-700" },
  rose: { bg: "bg-rose-100", text: "text-rose-700" },
  slate: { bg: "bg-slate-100", text: "text-slate-700" },
}

// Tile Renderers
function EventCardTile({ props }: { props: any }) {
  const Icon = props.badge?.icon ? iconMap[props.badge.icon] : null

  return (
    <Card className="h-full rounded-2xl border shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="flex-1">
          <CardTitle className="text-lg font-semibold">{props.title}</CardTitle>
          <p className="text-muted-foreground mt-1 text-sm font-medium">
            {props.time.start} - {props.time.end}
          </p>
        </div>
        {Icon && (
          <Icon
            className="h-5 w-5 text-violet-600"
            weight="duotone"
            aria-label={props.badge.icon}
          />
        )}
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {props.description}
        </p>

        <div className="bg-muted/10 flex flex-wrap items-start justify-between gap-4 rounded-xl border p-4">
          {props.sections.map((section: Section, idx: number) => {
            const SectionIcon = iconMap[section.icon]
            return (
              <div key={idx}>
                <div className="mb-1 flex items-center gap-2 font-medium">
                  {SectionIcon && <SectionIcon className="h-[18px] w-[18px]" />}
                  <span>{section.label}</span>
                </div>
                {typeof section.value === "string" ? (
                  <span className="text-muted-foreground text-sm">
                    {section.value}
                  </span>
                ) : (
                  <div className="flex -space-x-2">
                    {(section.value as AvatarItem[]).map((person, i) => {
                      const colorClass =
                        colorClassMap[person.color] || colorClassMap.violet
                      return (
                        <Avatar
                          key={i}
                          className="border-card h-7 w-7 border-2"
                        >
                          {person.image && (
                            <AvatarImage src={person.image} alt={person.name} />
                          )}
                          <AvatarFallback
                            className={cn(colorClass.bg, colorClass.text)}
                          >
                            {person.initials}
                          </AvatarFallback>
                        </Avatar>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

function StatSimpleTile({ props }: { props: any }) {
  const colorClass = colorClassMap[props.avatar.color] || colorClassMap.violet

  return (
    <Card className="flex h-full flex-col items-center justify-center rounded-2xl border shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="flex flex-col items-center gap-2 p-6">
        <Avatar className="h-12 w-12">
          {props.avatar.src && (
            <AvatarImage src={props.avatar.src} alt={props.label} />
          )}
          <AvatarFallback
            className={cn(colorClass.bg, colorClass.text, "text-lg font-bold")}
          >
            {props.avatar.initials}
          </AvatarFallback>
        </Avatar>
        <div className="text-3xl font-bold">{props.value}</div>
        <div className="text-muted-foreground text-sm">{props.label}</div>
      </CardContent>
    </Card>
  )
}

function TaskNextTile({ props }: { props: any }) {
  const CtaIcon = props.cta?.icon ? iconMap[props.cta.icon] : null

  return (
    <Card className="flex h-full flex-col justify-between rounded-2xl border shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="flex flex-col gap-2 p-6">
        <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          {props.meta}
        </p>
        <CardTitle className="text-base font-semibold">{props.title}</CardTitle>
        <p className="text-muted-foreground text-sm">
          {props.time.start} - {props.time.end}
        </p>
      </CardContent>
      {CtaIcon && (
        <div className="border-t p-4">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-between"
            aria-label={props.cta.label || "Open task"}
          >
            <span>{props.cta.label}</span>
            <CtaIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
    </Card>
  )
}

function PeopleListTile({ props }: { props: any }) {
  const TrailingIcon = props.trailingIcon ? iconMap[props.trailingIcon] : null

  return (
    <Card className="h-full rounded-2xl border shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="flex flex-col gap-2 p-4">
        {props.items.map((item: any, idx: number) => (
          <div
            key={idx}
            className="hover:bg-muted/50 flex items-center justify-between rounded-lg p-3 transition-colors"
          >
            <span className="text-sm font-medium">{item.name}</span>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="rounded-full">
                {item.count}
              </Badge>
              {TrailingIcon && (
                <TrailingIcon className="text-muted-foreground h-4 w-4" />
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function CallCardTile({ props }: { props: any }) {
  return (
    <Card className="flex h-full flex-col items-center justify-between rounded-2xl border shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
        <div className="relative flex items-center justify-center">
          {props.centerAvatars.map((person: AvatarItem, idx: number) => {
            const colorClass =
              colorClassMap[person.color] || colorClassMap.violet
            const isCenter = idx === 1
            const positions = ["translate-x-4", "z-20", "-translate-x-4"]
            const sizes = isCenter
              ? { width: 120, height: 120, className: "h-[120px] w-[120px]" }
              : { width: 80, height: 80, className: "h-20 w-20" }

            // Lighter background colors
            const lightBgClass =
              {
                rose: "bg-rose-50/90",
                slate: "bg-slate-50/90",
                amber: "bg-amber-50/90",
                emerald: "bg-emerald-50/90",
                sky: "bg-sky-50/90",
                violet: "bg-violet-50/90",
              }[person.color] || "bg-gray-50/90"

            return (
              <div
                key={idx}
                className={cn(
                  "relative flex items-center justify-center overflow-hidden rounded-full transition-all duration-300",
                  sizes.className,
                  "border-background border-[6px] shadow-lg",
                  lightBgClass,
                  positions[idx]
                )}
              >
                {person.image ? (
                  <NextImage
                    src={person.image}
                    alt={person.name}
                    width={sizes.width}
                    height={sizes.height}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <span
                    className={cn(
                      colorClass.text,
                      isCenter ? "text-2xl" : "text-xl",
                      "font-bold"
                    )}
                  >
                    {person.initials}
                  </span>
                )}
              </div>
            )
          })}
        </div>

        <div className="text-muted-foreground text-center text-sm">
          {props.status.text}
        </div>
      </CardContent>

      <div className="flex w-full gap-2 border-t px-4 pt-4">
        {props.actions.map((action: any, idx: number) => {
          const ActionIcon = iconMap[action.icon]
          const isJoinButton = action.label === "Join"
          return (
            <Button
              key={idx}
              variant={action.variant as any}
              className={cn(
                "flex-1 rounded-full",
                !action.label && "aspect-square",
                isJoinButton && "bg-green-500 text-white hover:bg-green-700"
              )}
              aria-label={action.label || action.icon}
            >
              {ActionIcon && <ActionIcon className="h-4 w-4" />}
              {action.label && <span className="ml-2">{action.label}</span>}
            </Button>
          )
        })}
      </div>
    </Card>
  )
}

function ActivitySimpleTile({ props }: { props: any }) {
  const Icon = props.icon ? iconMap[props.icon] : null

  const circles = [
    { size: 56, opacity: 0.4 },
    { size: 72, opacity: 0.3 },
    { size: 92, opacity: 0.2 },
    { size: 116, opacity: 0.12 },
    { size: 144, opacity: 0.08 },
  ]

  return (
    <Card className="flex h-full flex-col items-center justify-center overflow-hidden rounded-2xl border shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="relative flex flex-col items-center gap-3 p-6">
        {Icon && (
          <div className="relative flex h-12 w-12 items-center justify-center">
            {props.title === "Tennis" &&
              circles.map((circle, index) => (
                <span
                  key={index}
                  className="border-primary/20 absolute rounded-full border-2"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: `${circle.size}px`,
                    height: `${circle.size}px`,
                    transform: "translate(-50%, -50%)",
                    opacity: circle.opacity,
                  }}
                />
              ))}
            <div className="bg-muted/10 relative z-10 flex h-12 w-12 items-center justify-center rounded-full">
              <Icon className="h-6 w-6" />
            </div>
          </div>
        )}
        <CardTitle className="text-center text-base font-semibold">
          {props.title}
        </CardTitle>
        <Badge variant="secondary">{props.duration}</Badge>
      </CardContent>
    </Card>
  )
}

function EventCompactTile({ props }: { props: any }) {
  return (
    <Card className="flex h-full items-center justify-between rounded-2xl border p-6 shadow-sm transition-shadow hover:shadow-md">
      <CardTitle className="text-base font-semibold">{props.title}</CardTitle>
      <div className="text-muted-foreground text-sm font-medium">
        {props.time.start} - {props.time.end}
        {props.time.ampm && <span className="ml-1">{props.time.ampm}</span>}
      </div>
    </Card>
  )
}

function ActivityPanelTile({ props }: { props: any }) {
  const Icon = props.icon ? iconMap[props.icon] : null
  const FooterIcon = props.footer?.right?.icon
    ? iconMap[props.footer.right.icon]
    : null
  const [isPlaying, setIsPlaying] = React.useState(true)
  const [isLiked, setIsLiked] = React.useState(false)
  const [progress, setProgress] = React.useState(35)
  const [floatingHearts, setFloatingHearts] = React.useState<
    Array<{ id: number; left: number; top: number; offset: number }>
  >([])
  const heartIdRef = React.useRef(0)
  const heartButtonRef = React.useRef<HTMLButtonElement>(null)
  const cardContentRef = React.useRef<HTMLDivElement>(null)

  // Fixed heights for spectrum bars to prevent re-render issues
  const spectrumHeights = React.useMemo(
    () => Array.from({ length: 20 }, () => Math.random() * 60 + 20),
    []
  )

  const handleHeartClick = () => {
    const newLiked = !isLiked
    setIsLiked(newLiked)

    if (newLiked && heartButtonRef.current && cardContentRef.current) {
      const buttonRect = heartButtonRef.current.getBoundingClientRect()
      const cardRect = cardContentRef.current.getBoundingClientRect()

      const buttonCenterX =
        buttonRect.left - cardRect.left + buttonRect.width / 2
      const buttonTop = buttonRect.top - cardRect.top

      const hearts = Array.from({ length: 5 }, (_, i) => ({
        id: heartIdRef.current++,
        left: buttonCenterX,
        top: buttonTop + (Math.random() - 0.5) * 6, // Small vertical variation starting from top
        offset: (Math.random() - 0.5) * 40, // Horizontal drift during animation
      }))
      setFloatingHearts((prev) => [...prev, ...hearts])

      hearts.forEach((heart) => {
        setTimeout(() => {
          setFloatingHearts((prev) => prev.filter((h) => h.id !== heart.id))
        }, 2000)
      })
    }
  }

  // Spotify-like music player for Cycling
  if (props.title === "Cycling") {
    return (
      <Card className="relative flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition-shadow hover:shadow-md">
        <CardContent
          ref={cardContentRef}
          className="relative flex h-full flex-col justify-between p-6"
        >
          {/* Album cover and song info */}
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg shadow-lg">
              {/* Base gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500" />
              {/* Overlay pattern */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/50 via-transparent to-yellow-500/50" />
              {/* Circular accent */}
              <div className="absolute -top-4 -right-4 h-12 w-12 rounded-full bg-white/20 blur-xl" />
              <div className="absolute -bottom-2 -left-2 h-8 w-8 rounded-full bg-cyan-400/40 blur-lg" />
              {/* Geometric shapes */}
              <div className="absolute right-0 bottom-0 h-8 w-8 rotate-45 bg-white/30" />
              <div className="absolute top-2 left-2 h-3 w-3 rounded-full bg-white/50" />
              <div className="absolute bottom-3 left-4 h-2 w-2 rounded-full bg-yellow-300/70" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">
                {props.title || "Workout Mix"}
              </p>
              <p className="text-muted-foreground text-xs">Various Artists</p>
            </div>
            <button
              ref={heartButtonRef}
              onClick={handleHeartClick}
              className="text-muted-foreground hover:text-foreground relative flex-shrink-0 transition-colors"
              aria-label="Like song"
            >
              <Heart
                className={cn(
                  "h-5 w-5",
                  isLiked && "fill-red-500 text-red-500"
                )}
                weight={isLiked ? "fill" : "regular"}
              />
            </button>
          </div>

          {/* Floating Hearts */}
          {floatingHearts.map((heart) => (
            <div
              key={heart.id}
              className="pointer-events-none absolute text-red-500"
              style={
                {
                  left: `${heart.left}px`,
                  top: `${heart.top}px`,
                  transform: "translate(-50%, -50%)",
                  animation: "float-heart 2s ease-out forwards",
                  "--heart-offset": `${heart.offset}px`,
                } as React.CSSProperties
              }
            >
              <Heart className="h-4 w-4" weight="fill" />
            </div>
          ))}

          {/* Animated Spectrum */}
          {isPlaying && (
            <div className="flex h-16 items-center justify-center gap-1 py-2">
              {spectrumHeights.map((baseHeight, i) => (
                <div
                  key={i}
                  className="bg-primary w-1 rounded-full"
                  style={{
                    height: `${baseHeight}%`,
                    transform: "translateY(0)",
                    animation: `spectrum-animation ${1.2 + (i % 3) * 0.3}s ease-in-out infinite`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="bg-muted h-1 w-full overflow-hidden rounded-full">
              <div
                className="bg-primary h-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-muted-foreground flex justify-between text-xs">
              <span>1:24</span>
              <span>4:12</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="secondary"
              size="icon"
              className="h-12 w-12 rounded-full"
              aria-label="Previous track"
            >
              <SkipBack className="h-8 w-8" weight="fill" />
            </Button>
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              size="icon"
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 w-12 rounded-full shadow-lg hover:scale-105"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" weight="fill" />
              ) : (
                <Play className="h-6 w-6" weight="fill" />
              )}
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-12 w-12 rounded-full"
              aria-label="Next track"
            >
              <SkipForward className="h-8 w-8" weight="fill" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Original panel layout for other cards
  return (
    <Card className="flex h-full flex-col justify-between rounded-2xl border shadow-sm transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="bg-muted/50 flex h-10 w-10 items-center justify-center rounded-full">
                <Icon className="h-5 w-5" />
              </div>
            )}
            <div>
              <CardTitle className="text-lg font-semibold">
                {props.title}
              </CardTitle>
              <p className="text-muted-foreground text-sm">{props.meta}</p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <p className="text-muted-foreground text-xs italic">{props.hint}</p>

        {props.week && (
          <div className="flex justify-center gap-2">
            {props.week.days.map((day: any, idx: number) => (
              <button
                key={idx}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors",
                  day.active
                    ? "bg-violet-600 text-white"
                    : "bg-muted hover:bg-muted/80"
                )}
                aria-label={`Day ${day.day}`}
              >
                {day.day}
              </button>
            ))}
          </div>
        )}
      </CardContent>

      {props.footer && (
        <div className="flex items-center justify-between border-t p-4 text-sm">
          <span className="text-muted-foreground">
            {props.footer.left.label}
          </span>
          {props.footer.right && (
            <button className="flex items-center gap-1 font-medium transition-colors hover:text-violet-600">
              {props.footer.right.label}
              {FooterIcon && <FooterIcon className="h-4 w-4" />}
            </button>
          )}
        </div>
      )}
    </Card>
  )
}

function HabitRangeTile({ props }: { props: any }) {
  const Icon = props.icon ? iconMap[props.icon] : null

  const iconColorMap: Record<string, string> = {
    orange: "bg-orange-400",
    emerald: "bg-emerald-400",
    violet: "bg-violet-400",
    rose: "bg-rose-400",
    amber: "bg-amber-400",
    indigo: "bg-indigo-400",
  }

  const iconColor = iconColorMap[props.color] || iconColorMap.violet

  return (
    <Card className="flex h-full flex-col rounded-2xl border shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="flex flex-col gap-3 p-6">
        {Icon && (
          <div
            className={cn(
              "border-background flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 shadow-sm",
              iconColor
            )}
          >
            <Icon className="h-6 w-6 text-white" weight="fill" />
          </div>
        )}
        <div className="flex flex-col">
          <CardTitle className="mb-1 text-base font-bold">
            {props.title}
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            {props.timeRange.start} - {props.timeRange.end}
            {props.timeRange.ampm && (
              <span className="ml-1">{props.timeRange.ampm}</span>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function TaskTaggedTile({ props }: { props: any }) {
  const StatusIcon = props.status?.icon ? iconMap[props.status.icon] : null

  return (
    <Card className="relative flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="flex min-h-0 flex-1 flex-col gap-2 p-4">
        <p className="text-sm font-normal">{props.date}</p>
        <CardTitle className="text-lg font-bold">{props.title}</CardTitle>
      </CardContent>
      <div className="mt-6 flex items-center justify-between p-4">
        {props.status && (
          <span className="text-sm font-normal">{props.status.text}</span>
        )}
        {StatusIcon && (
          <div className="bg-foreground flex h-6 w-6 items-center justify-center rounded-full">
            <StatusIcon className="text-background h-4 w-4" weight="fill" />
          </div>
        )}
      </div>
    </Card>
  )
}

function TaskQuickTile({ props }: { props: any }) {
  const Icon = props.icon ? iconMap[props.icon] : null

  return (
    <Card className="relative flex h-full flex-col justify-end rounded-2xl border p-6 shadow-sm transition-shadow hover:shadow-md">
      {Icon && (
        <div className="absolute top-4 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-lg">
          <Icon className="h-7 w-7 text-white" weight="fill" />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-sm font-medium">
          {props.duration}
        </p>
        <CardTitle className="text-xl font-semibold">{props.title}</CardTitle>
      </div>
    </Card>
  )
}

function EventStripTile({ props }: { props: any }) {
  return (
    <Card className="flex h-full flex-col justify-center rounded-2xl border shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="flex flex-wrap items-center gap-3 p-6">
        <CardTitle className="text-base font-semibold">{props.title}</CardTitle>
        <span className="text-muted-foreground text-sm">
          {props.time.start} - {props.time.end}
        </span>
        <div className="flex gap-2">
          {props.chips.map((chip: string, idx: number) => (
            <Badge key={idx} variant="outline">
              {chip}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Main component with symmetric bento layout
const bentoData: BentoData = {
  version: "1.0",
  meta: {
    title: "Personal Planner Bento",
    grid: { cols: 12, gap: "4", maxWidth: "7xl", padding: "6" },
    brand: { accent: "violet", radius: "2xl" },
  },
  tiles: [
    // Row 1 - Top (12 cols total)
    {
      id: "club-meeting",
      type: "event.card",
      colSpan: 4,
      rowSpan: 4,
      props: {
        title: "Club Meeting",
        time: { start: "09:00", end: "12:30" },
        description:
          "Design and research for a user roadmap in a design project that I have to do with friends.",
        sections: [
          { label: "Category", value: "Personal", icon: "Folder" },
          {
            label: "With",
            value: [
              {
                name: "Maya",
                image: "/ui/memoji-person-female-1.png",
                initials: "MA",
                color: "emerald",
              },
              {
                name: "Justin",
                image: "/ui/memoji-person-male-2.png",
                initials: "JW",
                color: "sky",
              },
              {
                name: "Ari",
                image: "/ui/memoji-person-male-1.png",
                initials: "AR",
                color: "amber",
              },
            ],
            icon: "Users",
          },
        ],
        badge: { icon: "Zap", tone: "accent" },
      },
    },
    {
      id: "new-task-count",
      type: "stat.simple",
      colSpan: 2,
      rowSpan: 2,
      props: {
        value: "05",
        label: "New Task",
        avatar: {
          src: "/ui/memoji-person-male-3.png",
          initials: "MA",
          color: "violet",
        },
      },
    },
    {
      id: "design-app",
      type: "task.next",
      colSpan: 2,
      rowSpan: 2,
      props: {
        title: "Design App",
        time: { start: "09:00", end: "12:00" },
        meta: "Next Task",
        cta: { icon: "ChevronRight", label: "Open" },
      },
    },
    {
      id: "inbox-people",
      type: "people.list",
      colSpan: 4,
      rowSpan: 2,
      props: {
        items: [
          { name: "Jane Cooper", count: 5 },
          { name: "Monty Rodriguez", count: 11 },
          { name: "Tara Monzo", count: 27 },
        ],
        trailingIcon: "ChevronRight",
      },
    },
    // Row 2 (12 cols total)
    {
      id: "tennis",
      type: "activity.simple",
      colSpan: 2,
      rowSpan: 2,
      props: { duration: "45 Min", title: "Tennis", icon: "Dumbbell" },
    },
    {
      id: "client-meeting",
      type: "event.compact",
      colSpan: 2,
      rowSpan: 2,
      props: {
        title: "Client Meeting",
        time: { start: "09:00", end: "10:00", ampm: "PM" },
      },
    },
    {
      id: "live-call",
      type: "call.card",
      colSpan: 4,
      rowSpan: 4,
      props: {
        centerAvatars: [
          {
            name: "Maya",
            initials: "MA",
            color: "rose",
            image: "/ui/memoji-person-female-1.png",
          },
          {
            name: "Justin",
            initials: "JW",
            color: "slate",
            highlight: true,
            image: "/ui/memoji-person-male-2.png",
          },
          {
            name: "Ari",
            initials: "AR",
            color: "amber",
            image: "/ui/memoji-person-male-1.png",
          },
        ],
        status: { text: "Justin Wales • Started 5m ago" },
        actions: [
          { variant: "outline", icon: "Phone", label: "" },
          { variant: "default", icon: "Video", label: "Join" },
        ],
      },
    },
    {
      id: "cycling",
      type: "activity.panel",
      colSpan: 4,
      rowSpan: 4,
      props: {
        title: "Cycling",
        meta: "30 Min",
        icon: "Bike",
        hint: "Tap to display more information",
        footer: {
          left: { label: "Week Days" },
          right: { label: "Next Task", icon: "ChevronRight" },
        },
        week: {
          days: [
            { day: 15 },
            { day: 16, active: true },
            { day: 17 },
            { day: 18 },
            { day: 19 },
            { day: 20 },
          ],
        },
      },
    },
    // Row 3 (12 cols total)
    {
      id: "bedtime",
      type: "habit.range",
      colSpan: 2,
      rowSpan: 2,
      props: {
        title: "Bedtime",
        icon: "BedDouble",
        color: "orange",
        timeRange: { start: "09:00", end: "06:00", ampm: "A.M." },
      },
    },
    {
      id: "daily-yoga",
      type: "habit.range",
      colSpan: 2,
      rowSpan: 2,
      props: {
        title: "Daily Yoga",
        icon: "BadgeCheck",
        color: "emerald",
        timeRange: { start: "6:15", end: "7:00", ampm: "A.M." },
      },
    },
    {
      id: "reading-book",
      type: "task.tagged",
      colSpan: 2,
      rowSpan: 2,
      props: {
        date: "21 June",
        title: "Reading Book",
        status: { text: "Done", icon: "CheckCircle2" },
      },
    },
    {
      id: "meeting-team",
      type: "task.quick",
      colSpan: 2,
      rowSpan: 2,
      props: { title: "Meeting Team", duration: "30 Min", icon: "Video" },
    },
    // Row 4 (12 cols total)
    {
      id: "cs-study",
      type: "event.strip",
      colSpan: 4,
      rowSpan: 2,
      props: {
        title: "CS Study",
        time: { start: "09:00", end: "12:30" },
        chips: ["Personal", "Now"],
      },
    },
  ],
}

export function ShowcaseMasonry() {
  const { meta, tiles } = bentoData

  // Renderer selector
  const renderTile = (tile: Tile) => {
    switch (tile.type) {
      case "event.card":
        return <EventCardTile props={tile.props} />
      case "stat.simple":
        return <StatSimpleTile props={tile.props} />
      case "task.next":
        return <TaskNextTile props={tile.props} />
      case "people.list":
        return <PeopleListTile props={tile.props} />
      case "call.card":
        return <CallCardTile props={tile.props} />
      case "activity.simple":
        return <ActivitySimpleTile props={tile.props} />
      case "event.compact":
        return <EventCompactTile props={tile.props} />
      case "activity.panel":
        return <ActivityPanelTile props={tile.props} />
      case "habit.range":
        return <HabitRangeTile props={tile.props} />
      case "task.tagged":
        return <TaskTaggedTile props={tile.props} />
      case "task.quick":
        return <TaskQuickTile props={tile.props} />
      case "event.strip":
        return <EventStripTile props={tile.props} />
      default:
        return null
    }
  }

  return (
    <section className="container py-12 md:py-20">
      <div
        className={cn(
          "mx-auto grid gap-4",
          "auto-rows-[140px] grid-cols-2",
          "sm:auto-rows-[100px] sm:grid-cols-6",
          "lg:auto-rows-[75px] lg:grid-cols-12",
          "max-w-7xl"
        )}
      >
        {tiles.map((tile) => {
          // Compute responsive column spans
          const getColSpanClass = () => {
            if (tile.colSpan === 2) return "sm:col-span-2"
            if (tile.colSpan === 3) return "sm:col-span-3"
            if (tile.colSpan === 4) return "sm:col-span-4"
            if (tile.colSpan === 5) return "sm:col-span-5"
            return "sm:col-span-6"
          }

          const getLgColSpanClass = () => {
            const spans: Record<number, string> = {
              2: "lg:col-span-2",
              3: "lg:col-span-3",
              4: "lg:col-span-4",
              5: "lg:col-span-5",
              6: "lg:col-span-6",
            }
            return spans[tile.colSpan] || "lg:col-span-4"
          }

          return (
            <div
              key={tile.id}
              className={cn(
                // Mobile: full width or half
                tile.colSpan >= 4 ? "col-span-2" : "col-span-1",
                // Tablet
                getColSpanClass(),
                // Desktop
                getLgColSpanClass()
              )}
              style={{
                gridRow: `span ${tile.rowSpan}`,
              }}
            >
              {renderTile(tile)}
            </div>
          )
        })}
      </div>
    </section>
  )
}
