export interface Product {
  id: string;
  name: string;
  logo: string;
  description: string;
  similarity: number;
  features: {
    overlapping: string[];
    missing: string[];
  };
  github: string;
  stars?: number;
  forks?: number;
  contributors?: number;
  topics?: string[];
  owner?: string;
  repo_url?: string;
  code_matches?: any[];
}

// GitHub API response interface
export interface GitHubRepository {
  repo_name: string;
  owner: string;
  repo_url: string;
  repo_description: string;
  stars: number;
  forks: number;
  contributors?: number;
  topics: string[];
  readme_content: string;
  code_matches: any[];
}

// ✅ Transform GitHub repo → Product format
export function transformGitHubToProduct(
  repo: GitHubRepository,
  userFeatures: string[]
): Product {
  const repoText = `${repo.repo_description} ${repo.readme_content} ${repo.topics.join(' ')}`.toLowerCase();
  const userFeaturesLower = userFeatures.map(f => f.toLowerCase());

  const overlappingFeatures = userFeaturesLower.filter(feature =>
    repoText.includes(feature)
  );

  const missingFeatures = userFeaturesLower.filter(feature =>
    !repoText.includes(feature)
  );

  const similarity = Math.min(
    10,
    (overlappingFeatures.length / userFeatures.length) * 10 + 2
  );

  const avatarUrl = repo.owner
    ? `https://github.com/${repo.owner}.png`
    : "/placeholder.svg";

  return {
    id: `${repo.owner}/${repo.repo_name}`,
    name: repo.repo_name,
    logo: avatarUrl,
    description: repo.repo_description || "No description available",
    similarity: Math.round(similarity * 10) / 10,
    features: {
      overlapping: overlappingFeatures,
      missing: missingFeatures,
    },
    github: repo.repo_url,
    stars: repo.stars,
    forks: repo.forks,
    contributors: repo.contributors,
    topics: repo.topics,
    owner: repo.owner,
    repo_url: repo.repo_url,
    code_matches: repo.code_matches,
  };
}
