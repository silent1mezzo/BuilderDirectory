"use client"

import { useState } from "react"
import useSWR from "swr"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Search, MapPin, ExternalLink, Trophy } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card";

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

const categories = ["All", "Technology", "Entertainment", "Literature", "Science", "Music", "Environment"]

export default function BuildersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // TODO: Would need to paginate results
  const { data: builders, error, isLoading } = useSWR<Canadian[]>(
    "/builders/api/v1/builders/",
  )

  // TODO: Search Bar + Categories would need to build a dynamic URL vs filter on all of the results
  const filteredBuilders = builders?.filter((builder) => {
    const matchesSearch = builder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         builder.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         builder.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || builder.category === selectedCategory
    return matchesSearch && matchesCategory
  }) || []

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to load builders</h2>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    )
  }

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
                    ? "bg-[#932f2f] text-white hover:bg-red-700 shadow-md"
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
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#932f2f] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading builders...</p>
            </div>
          </div>
        ) : filteredBuilders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No builders found matching your criteria.</p>
          </div>
        ) : (
          filteredBuilders.map((builder) => (
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
                            <p className="text-xl text-[#932f2f] font-medium mb-2">{builder.title}</p>
                            <div className="flex items-center text-gray-500 mb-3">
                              <MapPin className="h-4 w-4 mr-2" />
                              <span className="text-sm">{builder.location}</span>
                            </div>
                          </div>
                          <Badge className="bg-[#932f2f] text-white border-red-200 px-4 py-2 self-start">
                            {builder.category}
                          </Badge>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 leading-relaxed mb-6 text-base flex-1">{builder.description}</p>

                      {/* CTA */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-[#932f2f] text-white px-8 py-3 rounded-full font-medium hover:bg-red-700 transition-colors">
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
          ))
        )}
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