"use client"

import * as React from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DownloadIcon,
  PlusIcon,
  RefreshCwIcon,
  SearchIcon,
} from "lucide-react"

const trafficData = [
  { day: "Mon", sessions: 1180 },
  { day: "Tue", sessions: 1430 },
  { day: "Wed", sessions: 1820 },
  { day: "Thu", sessions: 1560 },
  { day: "Fri", sessions: 2040 },
  { day: "Sat", sessions: 1390 },
  { day: "Sun", sessions: 1010 },
]

const chartConfig: ChartConfig = {
  sessions: {
    label: "Sessions",
    color: "var(--chart-1)",
  },
}

const stats = [
  { label: "Revenue", value: "$48,290", delta: "+12.4%", trend: "up" as const },
  { label: "Active users", value: "2,841", delta: "+4.1%", trend: "up" as const },
  { label: "Conversion", value: "3.6%", delta: "0.0%", trend: "flat" as const },
  { label: "Churn", value: "1.2%", delta: "+0.3%", trend: "down" as const },
]

const activity = [
  {
    project: "Onboarding redesign",
    owner: "Jamie Lin",
    initials: "JL",
    status: "Completed",
    variant: "secondary" as const,
    updated: "2h ago",
  },
  {
    project: "Billing API migration",
    owner: "Ravi Kapoor",
    initials: "RK",
    status: "In progress",
    variant: "outline" as const,
    updated: "5h ago",
  },
  {
    project: "Q3 roadmap review",
    owner: "Elena Moss",
    initials: "EM",
    status: "Pending",
    variant: "outline" as const,
    updated: "1d ago",
  },
  {
    project: "Notification service",
    owner: "Jamie Lin",
    initials: "JL",
    status: "Failed",
    variant: "destructive" as const,
    updated: "2d ago",
  },
]

const team = [
  { name: "Jamie Lin", role: "Product designer", initials: "JL" },
  { name: "Ravi Kapoor", role: "Engineer", initials: "RK" },
  { name: "Elena Moss", role: "PM", initials: "EM" },
]

export default function DashboardPage() {
  const [range, setRange] = React.useState<"day" | "week" | "month">("week")

  return (
    <div className="min-h-screen bg-muted p-4 sm:p-6 lg:p-10 dark:bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-xl font-semibold">Overview</h1>
            <p className="text-sm text-muted-foreground">
              Here&apos;s what&apos;s happening across your projects this week.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <DownloadIcon data-icon="inline-start" />
              Export
            </Button>
            <Button>
              <PlusIcon data-icon="inline-start" />
              New Project
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <ButtonGroup>
            <Button
              variant={range === "day" ? "secondary" : "outline"}
              onClick={() => setRange("day")}
            >
              Day
            </Button>
            <Button
              variant={range === "week" ? "secondary" : "outline"}
              onClick={() => setRange("week")}
            >
              Week
            </Button>
            <Button
              variant={range === "month" ? "secondary" : "outline"}
              onClick={() => setRange("month")}
            >
              Month
            </Button>
          </ButtonGroup>
          <Button variant="ghost" size="icon">
            <RefreshCwIcon />
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">
                  {stat.label}
                </span>
                <span className="font-heading text-2xl font-semibold">
                  {stat.value}
                </span>
                <Badge
                  variant={
                    stat.trend === "down" ? "destructive" : "secondary"
                  }
                  className="w-fit"
                >
                  {stat.trend === "up" && <ArrowUpIcon data-icon="inline-start" />}
                  {stat.trend === "down" && (
                    <ArrowDownIcon data-icon="inline-start" />
                  )}
                  {stat.delta}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Weekly traffic</CardTitle>
              <CardDescription>Sessions by day, last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="aspect-auto h-64">
                <BarChart data={trafficData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="sessions"
                    fill="var(--color-sessions)"
                    radius={6}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team</CardTitle>
              <CardDescription>3 members active this week</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {team.map((member) => (
                <Item key={member.name} variant="outline" size="sm">
                  <ItemMedia variant="image">
                    <Avatar className="size-9">
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{member.name}</ItemTitle>
                    <ItemDescription>{member.role}</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button variant="ghost" size="icon-sm">
                      <SearchIcon />
                    </Button>
                  </ItemActions>
                </Item>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>
              Latest updates across your projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {activity.map((row) => (
                  <TableRow key={row.project}>
                    <TableCell className="font-medium">
                      {row.project}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-6">
                          <AvatarFallback className="text-[10px]">
                            {row.initials}
                          </AvatarFallback>
                        </Avatar>
                        {row.owner}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={row.variant}>{row.status}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {row.updated}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
