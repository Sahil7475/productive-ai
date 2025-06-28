export interface Product {
  id: string;
  name: string;
  logo: string;
  description: string;
  similarity: number;
  features: {
    overlapping: string[];
    missing: string[];
    extra: string[];
    apiFeatures: string[];
  };
  github: string;
  stars?: number;
  forks?: number;
  contributors?: number;
  topics?: string[];
  owner?: string;
  repo_url?: string;
  code_matches?: any[];
  archived:boolean;
  growth?: {
    commits_last_month: number;
    new_contributors_last_month: number;
    issues_closed_last_month: number;
    stars_gained_last_month: number;
    growth_score: number;
  };
  createdAt?: string;
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
  archived:boolean;  
  ai_similarity:number;
  createdAt?: string;
}

// Function to extract features from repository text
function extractFeaturesFromText(text: string): string[] {
  const commonFeatures = [
    'authentication', 'authorization', 'user management', 'dashboard', 'analytics',
    'reporting', 'notifications', 'email', 'chat', 'messaging', 'calendar',
    'scheduling', 'time tracking', 'project management', 'task management',
    'file upload', 'file management', 'search', 'filtering', 'sorting',
    'pagination', 'export', 'import', 'backup', 'restore', 'sync',
    'mobile app', 'responsive', 'dark mode', 'light mode', 'themes',
    'api', 'webhook', 'integration', 'plugin', 'extension', 'customization',
    'multi-language', 'localization', 'internationalization', 'accessibility',
    'real-time', 'websocket', 'push notification', 'offline', 'caching',
    'database', 'sql', 'nosql', 'orm', 'migration', 'seeding',
    'testing', 'unit test', 'integration test', 'e2e test', 'ci/cd',
    'deployment', 'docker', 'kubernetes', 'cloud', 'aws', 'azure', 'gcp',
    'monitoring', 'logging', 'error tracking', 'performance', 'optimization',
    'security', 'encryption', 'ssl', 'https', 'oauth', 'jwt', '2fa',
    'payment', 'billing', 'subscription', 'pricing', 'freemium',
    'social login', 'google', 'facebook', 'twitter', 'github', 'linkedin',
    'admin panel', 'moderation', 'content management', 'cms',
    'blog', 'forum', 'comment', 'rating', 'review', 'feedback',
    'gamification', 'achievement', 'badge', 'leaderboard', 'points',
    'collaboration', 'team', 'workspace', 'invitation', 'permission',
    'version control', 'git', 'branch', 'merge', 'pull request',
    'documentation', 'help', 'support', 'faq', 'tutorial', 'guide'
  ];

  const textLower = text.toLowerCase();
  return commonFeatures.filter(feature => textLower.includes(feature));
}

export function transformGitHubToProduct(
  repo: GitHubRepository,
  userFeatures: string[],
  similarityOverride?: number
): Product {
  const repoText = `${repo.repo_description} ${repo.readme_content} ${repo.topics.join(" ")}`.toLowerCase();
  const userFeaturesLower = userFeatures.map(f => f.toLowerCase());
  
  const apiFeatures = extractFeaturesFromText(`${repo.repo_description} ${repo.readme_content} ${repo.topics.join(" ")}`);
  
  const repoFeatures = apiFeatures.map(f => f.toLowerCase());



  // Overlapping: features in both user input and repo
const overlappingFeatures = userFeaturesLower.filter(feature => repoText.includes(feature));

// Extra: features in user input but NOT in repo
const extraFeatures = userFeaturesLower.filter(feature => !repoText.includes(feature));

// Missing: features in repo but NOT in user input
const missingFeatures = repoFeatures.filter(feature => !userFeaturesLower.includes(feature));


  // ✅ Use AI score if provided, fallback to basic calc
  const similarity = similarityOverride !== undefined
    ? similarityOverride / 10
    : Math.min(10, (overlappingFeatures.length / userFeatures.length) * 10 + 2);

  const avatarUrl = repo.owner ? `https://github.com/${repo.owner}.png` : "/placeholder.svg";

  return {
    id: `${repo.owner}/${repo.repo_name}`,
    name: repo.repo_name,
    logo: avatarUrl,
    description: repo.repo_description || "No description available",
    similarity: Math.round(similarity * 10) / 10,
    features: {
      overlapping: overlappingFeatures,
      missing: missingFeatures,
      extra: extraFeatures,
      apiFeatures: apiFeatures,
    },
    github: repo.repo_url,
    stars: repo.stars,
    forks: repo.forks,
    contributors: repo.contributors,
    topics: repo.topics,
    owner: repo.owner,
    archived: repo.archived,
    repo_url: repo.repo_url,
    code_matches: repo.code_matches,
    createdAt: repo.createdAt,
  };
}
  