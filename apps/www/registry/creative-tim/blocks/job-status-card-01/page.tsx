import { Clock } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

export default function JobStatusCard() {
  return (
    <Card className="relative max-w-2xl rounded-2xl p-6 shadow-lg">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <Badge className="rounded-full bg-orange-500 px-2 py-1 text-sm text-white dark:bg-orange-600">
            <span className="mr-1.5 size-4 rounded-full bg-white dark:bg-gray-900"></span>
            In Progress
          </Badge>
          <span className="text-muted-foreground text-[13px]">#YQZNFA</span>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-baseline gap-2">
            <h3 className="text-foreground text-[40px] leading-none font-light tracking-tighter">
              $200-250
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-base text-emerald-500 dark:text-emerald-400">
              +14%
            </span>
            <span className="text-base text-emerald-500 dark:text-emerald-400">
              +$25,26
            </span>
          </div>

          <div className="relative flex flex-col gap-1">
            <div className="absolute top-[24px] bottom-[24px] left-[7px] w-2 border-l-2 border-dashed border-orange-200 dark:border-orange-800" />

            <div className="relative z-10 flex items-start gap-3">
              <div className="mt-0.5">
                <div className="h-4 w-4 rounded-full bg-orange-500 dark:bg-orange-600" />
              </div>
              <p className="text-foreground flex-1 text-[15px] leading-snug">
                1248 N Highland Ave, Los Angeles, CA 90038
              </p>
            </div>

            <div className="relative z-10 mt-1 flex items-start gap-3">
              <div className="mt-0.5">
                <div className="h-4 w-4 rounded-full border-2 border-orange-200 bg-white dark:border-orange-800 dark:bg-gray-950" />
              </div>
              <p className="text-muted-foreground flex-1 text-[15px] leading-snug">
                2530 W 8th St, Los Angeles, CA 90057
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-gray-400 dark:text-gray-500">
              Oct 2, 2025
            </span>
            <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500">
              <Clock className="h-3.5 w-3.5" />
              <span className="text-sm">00:43:52</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
