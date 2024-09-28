'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function UserProfile() {
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: '',
    goals: [],
    dietaryPreferences: []
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleSliderChange = (name, value) => {
    setProfile(prev => ({ ...prev, [name]: value[0] }))
  }

  const handleNext = () => {
    setStep(prev => prev + 1)
  }

  const handleSubmit = () => {
    // Here you would typically send the profile data to your backend
    console.log('Profile submitted:', profile)
    // Redirect to dashboard or next step
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">Create Your Wellness Profile</h1>
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={profile.name} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input id="age" name="age" type="number" value={profile.age} onChange={handleInputChange} />
          </div>
          <div>
            <Label>Gender</Label>
            <RadioGroup name="gender" value={profile.gender} onValueChange={(value) => handleInputChange({ target: { name: 'gender', value } })}>
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
          <Button onClick={handleNext}>Next</Button>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="height">Height (cm)</Label>
            <Input id="height" name="height" type="number" value={profile.height} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input id="weight" name="weight" type="number" value={profile.weight} onChange={handleInputChange} />
          </div>
          <div>
            <Label>Activity Level</Label>
            <Select name="activityLevel" value={profile.activityLevel} onValueChange={(value) => handleInputChange({ target: { name: 'activityLevel', value } })}>
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
          <Button onClick={handleNext}>Next</Button>
        </div>
      )}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <Label>Fitness Goals</Label>
            <div className="space-y-2">
              {['Weight Loss', 'Muscle Gain', 'Improve Endurance', 'Better Sleep', 'Reduce Stress'].map((goal) => (
                <div key={goal} className="flex items-center">
                  <input
                    type="checkbox"
                    id={goal}
                    name="goals"
                    value={goal}
                    checked={profile.goals.includes(goal)}
                    onChange={(e) => {
                      const value = e.target.value
                      setProfile(prev => ({
                        ...prev,
                        goals: e.target.checked
                          ? [...prev.goals, value]
                          : prev.goals.filter(g => g !== value)
                      }))
                    }}
                    className="mr-2"
                  />
                  <Label htmlFor={goal}>{goal}</Label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Label>Dietary Preferences</Label>
            <div className="space-y-2">
              {['Vegetarian', 'Vegan', 'Keto', 'Paleo', 'Gluten-Free'].map((pref) => (
                <div key={pref} className="flex items-center">
                  <input
                    type="checkbox"
                    id={pref}
                    name="dietaryPreferences"
                    value={pref}
                    checked={profile.dietaryPreferences.includes(pref)}
                    onChange={(e) => {
                      const value = e.target.value
                      setProfile(prev => ({
                        ...prev,
                        dietaryPreferences: e.target.checked
                          ? [...prev.dietaryPreferences, value]
                          : prev.dietaryPreferences.filter(p => p !== value)
                      }))
                    }}
                    className="mr-2"
                  />
                  <Label htmlFor={pref}>{pref}</Label>
                </div>
              ))}
            </div>
          </div>
          <Button onClick={handleSubmit}>Complete Profile</Button>
        </div>
      )}
    </div>
  )
}