import OpenAI from "openai";
import { CohereClient } from "cohere-ai";

/* const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Get embeddings for a list of strings
export async function getEmbeddings(texts: string[]) {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: texts,
  });
  return response.data.map((item) => item.embedding);
} */

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY || "",
});

export async function getEmbeddings(texts: string[]): Promise<number[][]> {
  const response = await cohere.embed({
    texts,
    model: "embed-english-v3.0", // or "embed-multilingual-v3.0"
    inputType: "search_document", // or "classification" or "search_query"
  });
  // Ensure we always return number[][]
  if (Array.isArray(response.embeddings)) {
    return response.embeddings as number[][];
  } else if (Array.isArray((response as any).body?.embeddings)) {
    return (response as any).body.embeddings as number[][];
  } else {
    throw new Error("Unexpected response format from Cohere embed API");
  }
}

// Calculate cosine similarity between two embeddings
export function cosineSimilarity(vecA: number[], vecB: number[]) {
  const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const normB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
  return dotProduct / (normA * normB);
}
