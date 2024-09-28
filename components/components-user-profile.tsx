'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function UserProfile() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    age: '30',
    gender: 'male',
    height: '180',
    weight: '75',
    activityLevel: 'moderate',
    goals: ['Weight Loss', 'Improve Endurance'],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="health">Health Information</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={profile.name} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={profile.email} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" name="age" type="number" value={profile.age} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label>Gender</Label>
              <RadioGroup name="gender" value={profile.gender} onValueChange={(value) => handleSelectChange('gender', value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="health" className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input id="height" name="height" type="number" value={profile.height} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input id="weight" name="weight" type="number" value={profile.weight} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="activityLevel">Activity Level</Label>
              <Select name="activityLevel" value={profile.activityLevel} onValueChange={(value) => handleSelectChange('activityLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="light">Light Activity</SelectItem>
                  <SelectItem value="moderate">Moderate Activity</SelectItem>
                  <SelectItem value="high">High Activity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="goals" className="space-y-4">
          <div className="grid gap-2">
            <Label>Fitness Goals</Label>
            <div className="grid gap-2">
              {['Weight Loss', 'Muscle Gain', 'Improve Endurance', 'Better Sleep', 'Reduce Stress'].map((goal) => (
                <div key={goal} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={goal}
                    checked={profile.goals.includes(goal)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setProfile(prev => ({ ...prev, goals: [...prev.goals, goal] }))
                      } else {
                        setProfile(prev => ({ ...prev, goals: prev.goals.filter(g => g !== goal) }))
                      }
                    }}
                    className="form-checkbox h-5 w-5 text-primary"
                  />
                  <Label htmlFor={goal}>{goal}</Label>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <Button className="mt-6">Save Changes</Button>
    </div>
  )
}