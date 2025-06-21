export interface Product {
  id: string
  name: string
  logo: string
  description: string
  similarity: number
  features: {
    overlapping: string[]
    missing: string[]
  }
  github: string
}

export const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Taskcafe",
    logo: "/placeholder.svg?height=40&width=40",
    description: "A simple task management tool with time tracking.",
    similarity: 8.3,
    features: {
      overlapping: ["task management", "time tracking"],
      missing: ["calendar", "real-time chat"],
    },
    github: "https://github.com/example/taskcafe",
  },
  {
    id: "2",
    name: "TimeHero",
    logo: "/placeholder.svg?height=40&width=40",
    description: "AI-powered scheduling and task automation.",
    similarity: 7.1,
    features: {
      overlapping: ["calendar", "team collaboration"],
      missing: ["real-time chat", "time tracking"],
    },
    github: "https://github.com/example/timehero",
  },
  {
    id: "3",
    name: "Clockify",
    logo: "/placeholder.svg?height=40&width=40",
    description: "Time tracking software for teams and freelancers.",
    similarity: 9.2,
    features: {
      overlapping: ["time tracking", "team collaboration", "reporting"],
      missing: ["calendar integration", "chat"],
    },
    github: "https://github.com/example/clockify",
  },
  {
    id: "4",
    name: "Notion",
    logo: "/placeholder.svg?height=40&width=40",
    description: "All-in-one workspace for notes, tasks, and collaboration.",
    similarity: 6.8,
    features: {
      overlapping: ["task management", "team collaboration", "notes"],
      missing: ["time tracking", "calendar sync"],
    },
    github: "https://github.com/example/notion",
  },
  {
    id: "5",
    name: "Asana",
    logo: "/placeholder.svg?height=40&width=40",
    description: "Project management and team collaboration platform.",
    similarity: 7.9,
    features: {
      overlapping: ["task management", "team collaboration", "calendar"],
      missing: ["time tracking", "real-time chat"],
    },
    github: "https://github.com/example/asana",
  },
]

export function searchProducts(features: string[]): Product[] {
  // Simple mock search - in reality, this would use AI/ML for similarity matching
  return dummyProducts
    .map((product) => ({
      ...product,
      similarity: Math.random() * 3 + 7, // Random similarity between 7-10
    }))
    .sort((a, b) => b.similarity - a.similarity)
}

export function getProductById(id: string): Product | undefined {
  return dummyProducts.find((product) => product.id === id)
}
