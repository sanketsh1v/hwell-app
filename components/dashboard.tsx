'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock data - replace with actual API calls in a real application
const mockData = {
  workoutPlan: [
    { day: 'Monday', activity: 'Cardio', duration: '30 min' },
    { day: 'Wednesday', activity: 'Strength Training', duration: '45 min' },
    { day: 'Friday', activity: 'Yoga', duration: '60 min' },
  ],
  nutritionPlan: [
    { meal: 'Breakfast', suggestion: 'Oatmeal with berries and nuts' },
    { meal: 'Lunch', suggestion: 'Grilled chicken salad' },
    { meal: 'Dinner', suggestion: 'Baked salmon with roasted vegetables' },
  ],
  healthMetrics: [
    { date: '2023-01-01', weight: 70, sleep: 7, steps: 8000 },
    { date: '2023-01-08', weight: 69.5, sleep: 7.5, steps: 8500 },
    { date: '2023-01-15', weight: 69, sleep: 8, steps: 9000 },
    { date: '2023-01-22', weight: 68.5, sleep: 7.5, steps: 9500 },
  ]
}

export function DashboardComponent() {
  const [activeTab, setActiveTab] = useState('overview')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Wellness Dashboard</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="workout">Workout Plan</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition Plan</TabsTrigger>
          <TabsTrigger value="metrics">Health Metrics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Workouts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Sleep</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7.5 hrs</div>
                <p className="text-xs text-muted-foreground">+0.5 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="w-[80%]" />
                <p className="text-xs text-muted-foreground mt-2">66% towards weight goal</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7 days</div>
                <p className="text-xs text-muted-foreground">Keep it up!</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="workout">
          <Card>
            <CardHeader>
              <CardTitle>Your Workout Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {mockData.workoutPlan.map((workout, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="font-medium">{workout.day}</span>
                    <span>{workout.activity}</span>
                    <span>{workout.duration}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="nutrition">
          <Card>
            <CardHeader>
              <CardTitle>Your Nutrition Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {mockData.nutritionPlan.map((meal, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="font-medium">{meal.meal}</span>
                    <span>{meal.suggestion}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="metrics">
          <Card>
            <CardHeader>
              <CardTitle>Health Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockData.healthMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="weight" stroke="#8884d8" />
                  <Line yAxisId="right" type="monotone" dataKey="sleep" stroke="#82ca9d" />
                  <Line yAxisId="right" type="monotone" dataKey="steps" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}