'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data - replace with actual API calls in a real application
const mockContent = {
  articles: [
    { id: 1, title: "10 Tips for Better Sleep", category: "Wellness", author: "Dr. Sleep", date: "2023-06-01" },
    { id: 2, title: "The Benefits of High-Intensity Interval Training", category: "Fitness", author: "Coach Max", date: "2023-05-28" },
    { id: 3, title: "Understanding Macronutrients", category: "Nutrition", author: "Nutritionist Nancy", date: "2023-05-25" },
  ],
  videos: [
    { id: 1, title: "20-Minute Full Body Workout", category: "Fitness", duration: "20:15", thumbnail: "/placeholder.svg" },
    { id: 2, title: "Meal Prep for Beginners", category: "Nutrition", duration: "15:30", thumbnail: "/placeholder.svg" },
    {
      id: 3,
      title: "5-Minute Meditation for Stress Relief",
      category: "Wellness",
      duration: "5:00",
      thumbnail: "/placeholder.svg"
    },
  ]
}

export function ContentLibraryComponent() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredArticles = mockContent.articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredVideos = mockContent.videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Content Library</h1>
      <Input
        type="search"
        placeholder="Search content..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6"
      />
      <Tabs defaultValue="articles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>
        <TabsContent value="articles">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map(article => (
              <Card key={article.id}>
                <CardHeader>
                  <CardTitle>{article.title}</CardTitle>
                  <CardDescription>{article.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>By {article.author}</p>
                  <p>Published on {article.date}</p>
                </CardContent>
                <CardFooter>
                  <Button>Read Article</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="videos">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map(video => (
              <Card key={video.id}>
                <CardHeader>
                  <CardTitle>{video.title}</CardTitle>
                  <CardDescription>{video.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover mb-2" />
                  <p>Duration: {video.duration}</p>
                </CardContent>
                <CardFooter>
                  <Button>Watch Video</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}