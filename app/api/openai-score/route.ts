import { NextRequest, NextResponse } from "next/server";
import { getEmbeddings, cosineSimilarity } from "@/lib/embedding";

export async function POST(req: NextRequest) {
  const { userInput, repositories } = await req.json();
  
  // userInput: { name: string, description: string, features: string[] }
  // repositories: your GitHub API results
  
  // 1️⃣ Make embeddings for the user input:
  const userText = `${userInput.description}. ${userInput.features.join(". ")}`;
  const userEmbeddings = await getEmbeddings([userText]);

  // 2️⃣ Make embeddings for each repo: name + desc + readme + code snippets
  const repoTexts = repositories.map((repo: any) => {
    const codeSnippets = repo.code_matches?.map((c: any) => c.snippet).join("\n") || "";
    return `${repo.repo_name}. ${repo.repo_description}. ${repo.readme_content}. ${codeSnippets}`;
  });

  const repoEmbeddings = await getEmbeddings(repoTexts);

  // 3️⃣ Compute similarity for each repo
  const results = repositories.map((repo: any, idx: number) => {
    const score = cosineSimilarity(userEmbeddings[0], repoEmbeddings[idx]);
    return {
      ...repo,
      ai_similarity: Math.round(score * 1000) / 10, // e.g. 82.3%
    };
  });

  return NextResponse.json({ results });
}
