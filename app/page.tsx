"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MapPin, ExternalLink, Trophy } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Canadian {
  id: number
  name: string
  title: string
  location: string
  category: string
  description: string
  achievement: string
  avatar: string
  website?: string
}

const builders: Canadian[] = [
  {
    id: 1,
    name: "Ryan Reynolds",
    title: "Actor & Entrepreneur",
    location: "Vancouver, BC",
    category: "Entertainment",
    description:
      "From Vancouver comedy clubs to Hollywood A-lister, Ryan built a media empire spanning film, spirits, and sports. His authentic voice and business acumen turned him into one of the most influential Canadian exports.",
    achievement: "Built multiple 9-figure businesses while maintaining authentic Canadian humor",
    avatar: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 2,
    name: "Tobias Lütke",
    title: "Founder & CEO, Shopify",
    location: "Ottawa, ON",
    category: "Technology",
    description:
      "A German immigrant who couldn't find good e-commerce software, so he built Shopify. Today, his platform powers over 4 million businesses worldwide and has created countless entrepreneurial success stories.",
    achievement: "Democratized e-commerce for millions of entrepreneurs globally",
    avatar: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 3,
    name: "Margaret Atwood",
    title: "Author & Visionary",
    location: "Toronto, ON",
    category: "Literature",
    description:
      "Her dystopian masterpiece 'The Handmaid's Tale' predicted societal challenges decades before they emerged. Margaret's work continues to shape global conversations about freedom, power, and human rights.",
    achievement: "Authored works that became cultural phenomena and social movements",
    avatar: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 4,
    name: "Chris Hadfield",
    title: "Astronaut & Inspiration Leader",
    location: "Milton, ON",
    category: "Science",
    description:
      "From small-town Ontario to commanding the International Space Station, Chris showed the world that Canadians can reach for the stars. His space videos inspired millions to pursue STEM careers.",
    achievement: "First Canadian to command the International Space Station",
    avatar: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 5,
    name: "Céline Dion",
    title: "Global Music Icon",
    location: "Charlemagne, QC",
    category: "Music",
    description:
      "From singing in her family's piano bar to selling 250+ million records worldwide, Céline proved that talent, determination, and authenticity can conquer any stage. Her voice became Canada's gift to the world.",
    achievement: "One of the best-selling music artists of all time with 250M+ records sold",
    avatar: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 6,
    name: "David Suzuki",
    title: "Environmental Pioneer",
    location: "Vancouver, BC",
    category: "Environment",
    description:
      "For over 50 years, David has been Canada's environmental conscience. His work educated generations about climate change and inspired a global movement toward sustainable living.",
    achievement: "Educated millions about environmental science through 'The Nature of Things'",
    avatar: "/placeholder.svg?height=120&width=120",
  },
]

const categories = ["All", "Technology", "Entertainment", "Literature", "Science", "Music", "Environment"]

export default function BuildersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-700 mb-6">Celebrating the innovators and pioneers shaping Canada’s future in tech, science, and culture.</h2> 
        </div>
      </div>

       {/* Search and Filters */}
       <div className="mb-12 space-y-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Find your inspiration..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-3 bg-white border-gray-200 text-lg rounded-xl shadow-sm"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer transition-all px-4 py-2 text-sm font-medium rounded-full ${
                  selectedCategory === category
                    ? "bg-red-600 text-white hover:bg-red-700 shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

      <div className="space-y-8">
        {builders.map((builder) => (
          <Card key={builder.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  {/* Avatar Section */}
                  <div className="lg:w-80 flex-shrink-0 bg-gradient-to-br from-red-50 to-orange-50 p-8 flex items-center justify-center">
                    <Avatar>
                      <AvatarImage src={builder.avatar || "/placeholder.svg"} alt={builder.name} />
                    </Avatar>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-8 lg:p-10">
                    <div className="flex flex-col h-full">
                      {/* Header */}
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                          <div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-2">{builder.name}</h3>
                            <p className="text-xl text-red-600 font-medium mb-2">{builder.title}</p>
                            <div className="flex items-center text-gray-500 mb-3">
                              <MapPin className="h-4 w-4 mr-2" />
                              <span className="text-sm">{builder.location}</span>
                            </div>
                          </div>
                          <Badge className="bg-red-50 text-red-700 border-red-200 px-4 py-2 self-start">
                            {builder.category}
                          </Badge>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 leading-relaxed mb-6 text-base flex-1">{builder.description}</p>

                      {/* CTA */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-red-600 text-white px-8 py-3 rounded-full font-medium hover:bg-red-700 transition-colors">
                          Learn Their Story
                        </button>
                        {builder.website && (
                          <button className="flex items-center justify-center space-x-2 text-gray-600 hover:text-red-600 transition-colors px-8 py-3 border border-gray-300 rounded-full hover:border-red-300">
                            <ExternalLink className="h-4 w-4" />
                            <span>Visit Website</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Building Canada's Future
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          These builders represent the dedication, innovation, and craftsmanship that continue to shape 
          Canada's built environment. From sustainable construction to heritage preservation, they're 
          creating lasting legacies across our great nation.
        </p>
      </div>
    </div>
  );
}