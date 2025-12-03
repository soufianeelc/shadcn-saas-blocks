"use client"

import { useState } from "react"
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const WEEKDAY_NAMES = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"]

const EVENTS: Record<string, string> = {
  "2025-01-07": "Team meeting at 10:00 AM",
  "2025-01-17": "Today is a good day, like every other day! Enjoy your time.",
  "2025-01-31": "Project deadline - Submit final reports",
  "2025-02-14": "Valentine's Day celebration",
  "2025-02-20": "Product launch event",
  "2025-10-26": "Current day - you're viewing this calendar!",
}

function generateCalendarDays(currentMonth: Date) {
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 }) // Monday
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 })

  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  })

  return days.map((date) => {
    const dateStr = format(date, "yyyy-MM-dd")
    return {
      date,
      num: date.getDate(),
      outside: !isSameMonth(date, currentMonth),
      event: dateStr in EVENTS,
    }
  })
}

export default function NeonCalendar() {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(today)
  const [selectedDate, setSelectedDate] = useState(today)

  const days = generateCalendarDays(currentDate)
  const selectedStr = format(selectedDate, "yyyy-MM-dd")

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const selectedEvent =
    EVENTS[selectedStr] ||
    "No events scheduled for this day. Enjoy your free time!"

  return (
    <Card
      className="bg-card mx-auto w-full max-w-md gap-0 rounded-3xl border p-4 shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
      role="group"
      aria-label="Calendar"
    >
      <CardHeader className="px-4 pt-3 pb-2">
        <div className="bg-muted/50 flex items-center justify-between rounded-2xl border px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-accent/10 h-9 w-9 rounded-full"
            aria-label="Previous month"
            onClick={handlePrevMonth}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <CardTitle className="text-xl font-semibold tracking-wide">
            {format(currentDate, "MMMM, yyyy")}
          </CardTitle>

          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-accent/10 h-9 w-9 rounded-full"
            aria-label="Next month"
            onClick={handleNextMonth}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-4 pt-2 pb-4">
        <div
          className="bg-muted/50 rounded-2xl border p-5"
          role="grid"
          aria-label="Month grid"
        >
          <div className="mb-3 grid grid-cols-7 gap-y-3" role="row">
            {WEEKDAY_NAMES.map((day) => (
              <span
                key={day}
                className="text-muted-foreground text-center text-xs tracking-wide"
              >
                {day}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-3" role="rowgroup">
            {days.map((day, idx) => {
              const isSelected = isSameDay(day.date, selectedDate)
              const hasEvent = day.event
              const isTodayDate = isToday(day.date)

              return (
                <button
                  key={idx}
                  role="gridcell"
                  aria-label={
                    isSelected
                      ? `Selected date, ${day.num}`
                      : isTodayDate
                        ? `Today, ${day.num}`
                        : `${day.num}`
                  }
                  onClick={() => handleDateSelect(day.date)}
                  className={`relative mx-auto grid h-9 w-9 place-items-center rounded-full text-[15px] font-medium transition-colors ${day.outside ? "opacity-40" : ""} ${isTodayDate ? "ring-2 ring-[hsl(var(--neon-accent))]/20" : ""} ${
                    isSelected
                      ? "bg-[hsl(var(--neon-accent))] text-[hsl(var(--neon-selected-text))] shadow-[0_2px_10px_hsl(var(--neon-accent)/.5)]"
                      : "hover:bg-accent/10"
                  } `}
                >
                  {day.num}
                  {hasEvent && (
                    <span
                      className="absolute right-1 bottom-1 h-[5px] w-[5px] rounded-full bg-[hsl(var(--neon-accent-dot))]"
                      aria-hidden="true"
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <div className="bg-muted/50 mt-5 rounded-2xl border p-5">
          <div className="flex items-center gap-2 font-semibold text-[hsl(var(--neon-accent))]">
            <Calendar className="h-4 w-4" />
            <span>{format(selectedDate, "d MMMM, yyyy")}</span>
          </div>
          <p
            id="calendar-note"
            className="text-muted-foreground mt-2 text-[15px] leading-relaxed"
          >
            {selectedEvent}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
