import type { Project } from "@/data/projects";

export type RepoStats = { stars: number; forks: number };

// Unique per build, so a cached response can't carry old counts into a new deployment.
const BUILD_STAMP = Date.now();

async function fetchRepoStats(repo: string): Promise<RepoStats | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${repo}?build=${BUILD_STAMP}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
      },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      stargazers_count?: number;
      forks_count?: number;
    };
    if (typeof data.stargazers_count !== "number") return null;
    return { stars: data.stargazers_count, forks: data.forks_count ?? 0 };
  } catch {
    return null;
  }
}

export async function getProjectStats(
  project: Project,
): Promise<RepoStats | null> {
  if (!project.repo) return null;
  return (await fetchRepoStats(project.repo)) ?? project.fallbackStats ?? null;
}
