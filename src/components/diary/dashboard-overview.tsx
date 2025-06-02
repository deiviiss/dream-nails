'use client'

import { EmotionDistributionChart } from './emotions/emotion-distribution-chart'
import FilterMonth from '@/components/monedex/filter-month'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { type EmotionSummary, type Thought } from '@/interfaces/thought.interface'

interface DashboardOverviewProps {
  thoughts: Thought[]
  emotionSummary: EmotionSummary[]
}

export function DashboardOverview({ thoughts, emotionSummary }: DashboardOverviewProps) {
  const defaultEmotion = { name: 'ninguna', value: 0 }

  const mostFrequentEmotion = emotionSummary.length
    ? emotionSummary.reduce((prev, current) =>
      current.value > prev.value ? current : prev
    )
    : defaultEmotion

  const totalEmotions = emotionSummary?.length || 0
  const totalThoughts = thoughts?.length || 0
  const totalEmotionsPercentage = totalThoughts > 0
    ? Math.round((mostFrequentEmotion.value / totalThoughts) * 100)
    : 0

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Track and analyze your emotions and thoughts over time</p>
        </div>
        <div className="flex items-center gap-2 text-primary">
          <FilterMonth />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Emotions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmotions}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Thoughts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalThoughts}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Frequent Emotion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mostFrequentEmotion.name}</div>
            {totalEmotionsPercentage}% of all thoughts
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="distribution" className="space-y-4">
        <TabsList>
          <TabsTrigger value="distribution">Emotion Distribution</TabsTrigger>
          <TabsTrigger value="timeline">Emotion Timeline</TabsTrigger>
        </TabsList>
        <TabsContent value="distribution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Emotion Distribution</CardTitle>
              <CardDescription>Breakdown of your emotions during the selected period</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              {/* <EmotionDistributionChart emotionSummary={emotionSummary} /> */}
              {emotionSummary.length === 0
                ? (<p className="text-muted-foreground">No emotion data for this period</p>)
                : (<EmotionDistributionChart emotionSummary={emotionSummary} />)}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Emotion Timeline</CardTitle>
              <CardDescription>Frequency of emotions over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              {/* <EmotionTimelineChart /> */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
