import React from "react";
import Link from "next/link";
import { Mail, Github, Twitter, MapPin, Phone, Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t border-border pt-12 pb-6 px-4 mt-16 text-base">
    {/* Grid Sections */}
    <div className="container mx-auto px-4 grid gap-12 sm:grid-cols-2 md:grid-cols-3 text-center justify-items-center">
      
      {/* Built With */}
      <div>
        <h3 className="font-semibold text-lg mb-3 text-primary">Built With</h3>
        <ul className="space-y-1 text-[15px] text-muted-foreground">
          <li><a href="https://docs.github.com/en/rest" target="_blank" className="inline-flex items-center gap-1 hover:text-primary transition-colors">GitHub REST API <ExternalLinkIcon /></a></li>
          <li><a href="https://docs.github.com/en/graphql" target="_blank" className="inline-flex items-center gap-1 hover:text-primary transition-colors">GitHub GraphQL API <ExternalLinkIcon /></a></li>
          <li><a href="https://nextjs.org/" target="_blank" className="inline-flex items-center gap-1 hover:text-primary transition-colors">Next.js <ExternalLinkIcon /></a></li>
          <li><a href="https://bolt.new/" target="_blank" className="inline-flex items-center gap-1 hover:text-primary transition-colors">Bolt AI <ExternalLinkIcon /></a></li>
          <li><a href="https://cohere.ai/" target="_blank" className="inline-flex items-center gap-1 hover:text-primary transition-colors">Cohere AI <ExternalLinkIcon /></a></li>
          <li><a href="https://www.typescriptlang.org/" target="_blank" className="inline-flex items-center gap-1 hover:text-primary transition-colors">TypeScript <ExternalLinkIcon /></a></li>
        </ul>
      </div>
  
      {/* Connect */}
      <div>
        <h3 className="font-semibold text-lg mb-3 text-primary">Connect</h3>
        <ul className="space-y-1 text-[15px] text-muted-foreground">
          <li><a href="#" className="inline-flex items-center gap-1 hover:text-primary transition-colors"><Twitter className="h-4 w-4" /> Twitter <ExternalLinkIcon /></a></li>
          <li><a href="mailto:info@example.com" className="inline-flex items-center gap-1 hover:text-primary transition-colors"><Mail className="h-4 w-4" /> Email <ExternalLinkIcon /></a></li>
          <li><a href="https://github.com/extinctsion/productiveai" target="_blank" className="inline-flex items-center gap-1 hover:text-primary transition-colors"><Github className="h-4 w-4" /> GitHub <ExternalLinkIcon /></a></li>
        </ul>
      </div>
  
      {/* Project / Resources */}
      <div>
        <h3 className="font-semibold text-lg mb-3 text-primary">Project</h3>
        <ul className="space-y-1 text-[15px] text-muted-foreground">
          <li><a href="https://github.com/extinctsion/productiveai" target="_blank" className="hover:text-primary transition-colors">Source Code</a></li>
          <li><a href="https://opensource.org/licenses/MIT" target="_blank" className="hover:text-primary transition-colors">MIT License <ExternalLinkIcon /></a></li>
        </ul>
      </div>
  
    </div>
  
    {/* Bottom Bar */}
    <div className="container mx-auto px-4 flex flex-col items-center justify-center mt-12 pt-6 border-t border-border text-center">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <span className="font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Productive AI
        </span>
      </div>
      <div className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Productive AI. All rights reserved.
      </div>
    </div>
  </footer>
  
  
  );
}

function ExternalLinkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="inline h-3 w-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 13V19A2 2 0 0 1 16 21H6A2 2 0 0 1 4 19V9A2 2 0 0 1 6 7H12M15 3H21M21 3V9M21 3L10 14" />
    </svg>
  );
} 