import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function GoalProgressCard() {
  return (
    <div className="flex flex-col gap-6">
      <PositiveProgressCard />
      <NegativeProgressCard />
    </div>
  )
}

function PositiveProgressCard() {
  const totalPercent = 40
  const completedPercent = 28
  const inFlightPercent = 12
  const leadPercent = totalPercent + inFlightPercent

  return (
    <Card
      className="relative max-w-2xl gap-0 rounded-[20px] border shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
      role="group"
      aria-label="Goal progress card"
    >
      <CardHeader className="px-6 pb-3">
        <CardTitle className="text-xl font-light">Goal Progress</CardTitle>
      </CardHeader>

      <CardContent className="px-6 pt-1">
        <div className="space-y-2">
          <div className="relative h-[14px] w-full">
            <div
              className="absolute inset-0 overflow-hidden rounded-full bg-lime-200/60 dark:bg-lime-900/30"
              role="progressbar"
              aria-valuenow={totalPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Goal progress"
              id="goal-progress-description"
            >
              <div
                className="absolute inset-y-0 left-0 bg-lime-700 dark:bg-lime-600"
                style={{ width: `${completedPercent}%` }}
              />

              <div
                className="absolute inset-y-0 animate-[progress-diagonal_1.2s_linear_infinite] bg-[length:8px_8px]"
                style={{
                  left: `${completedPercent}%`,
                  width: `${inFlightPercent}%`,
                  backgroundImage:
                    "repeating-linear-gradient(45deg, rgb(77 124 15) 0px, rgb(77 124 15) 4px, rgb(101 163 13) 4px, rgb(101 163 13) 8px)",
                }}
              />
            </div>

            <div
              className="absolute top-1/2 size-[26px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[5px] border-white bg-lime-600 shadow-md dark:border-slate-950 dark:bg-lime-500"
              style={{ left: `${totalPercent}%` }}
              aria-label="Current progress 40 percent"
            />
          </div>

          <div className="space-y-0.5 pt-2">
            <p className="leading-[1.45] text-gray-600 dark:text-slate-400">
              You're{" "}
              <span className="font-semibold text-lime-600 dark:text-lime-400">
                ahead of pace
              </span>{" "}
              and should reach your goal{" "}
              <span className="font-semibold text-slate-900 dark:text-slate-50">
                {leadPercent}%
              </span>
            </p>
            <p className="t font-medium text-slate-900 dark:text-slate-50">
              ahead of schedule
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function NegativeProgressCard() {
  const totalPercent = 40
  const completedPercent = 28
  const inFlightPercent = 12
  const behindPercent = 30

  return (
    <Card
      className="relative max-w-2xl gap-0 rounded-[20px] border shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
      role="group"
      aria-label="Goal progress card"
    >
      <CardHeader className="px-6 pb-3">
        <CardTitle className="text-xl font-light">Goal Progress</CardTitle>
      </CardHeader>

      <CardContent className="px-6 pt-1">
        <div className="space-y-2">
          <div className="relative h-[14px] w-full">
            <div
              className="absolute inset-0 overflow-hidden rounded-full bg-rose-200/60 dark:bg-rose-900/30"
              role="progressbar"
              aria-valuenow={totalPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Goal progress"
              id="goal-progress-description-negative"
            >
              <div
                className="absolute inset-y-0 left-0 bg-rose-800 dark:bg-rose-700"
                style={{ width: `${completedPercent}%` }}
              />

              <div
                className="absolute inset-y-0 animate-[progress-diagonal_1.2s_linear_infinite] bg-[length:8px_8px]"
                style={{
                  left: `${completedPercent}%`,
                  width: `${inFlightPercent}%`,
                  backgroundImage:
                    "repeating-linear-gradient(45deg, rgb(153 27 27) 0px, rgb(153 27 27) 4px, rgb(185 28 28) 4px, rgb(185 28 28) 8px)",
                }}
              />
            </div>

            <div
              className="absolute top-1/2 size-[26px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[5px] border-white bg-rose-700 shadow-md dark:border-slate-950 dark:bg-rose-600"
              style={{ left: `${totalPercent}%` }}
              aria-label="Current progress 40 percent"
            />
          </div>

          <div className="space-y-0.5 pt-2">
            <p className="leading-[1.45] text-gray-600 dark:text-slate-400">
              You're{" "}
              <span className="font-semibold text-rose-600 dark:text-rose-400">
                behind pace
              </span>{" "}
              and should reach your goal{" "}
              <span className="font-semibold text-slate-900 dark:text-slate-50">
                {behindPercent}%
              </span>
            </p>
            <p className="font-medium text-slate-900 dark:text-slate-50">
              behind schedule
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
