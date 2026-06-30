import api, { setTokens, clearTokens } from "@/services/api";
import { teamPageData, teamMembers, type TeamMember, type TeamPageMeta } from "@/data/teamPage";
import { boardMembers, type BoardMember } from "@/data/boardPage";
import { mentorsData, type Mentor } from "@/data/mentorsPage";
import { infrastructureImages } from "@/data/infrastructurePage";

export const STORAGE_KEY_TEAM = "ahub_admin_team_data";
export const STORAGE_KEY_BOARD = "ahub_admin_board_data";
export const STORAGE_KEY_MENTORS = "ahub_admin_mentors_data";
export const STORAGE_KEY_INFRASTRUCTURE = "ahub_admin_infrastructure_data";

// Clear stale empty arrays stored by previous versions that would prevent
// default data from showing on first load
function clearEmptyStored(key: string) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length === 0) {
        localStorage.removeItem(key);
      }
    }
  } catch { /* ignore */ }
}
clearEmptyStored(STORAGE_KEY_TEAM);
clearEmptyStored(STORAGE_KEY_BOARD);
clearEmptyStored(STORAGE_KEY_MENTORS);

export type AdminTeamData = {
  meta: TeamPageMeta;
  members: TeamMember[];
};

function getStoredTeam(): AdminTeamData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TEAM);
    if (raw) {
      const parsed = JSON.parse(raw) as AdminTeamData;
      if (parsed.members?.length) return parsed;
    }
  } catch { /* ignore */ }
  return { meta: teamPageData, members: teamMembers };
}

function persistTeam(data: AdminTeamData) {
  try {
    localStorage.setItem(STORAGE_KEY_TEAM, JSON.stringify(data));
  } catch { /* quota exceeded */ }
}

function getStoredBoard(): BoardMember[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BOARD);
    if (raw) {
      const parsed = JSON.parse(raw) as BoardMember[];
      if (parsed.length) return parsed;
    }
  } catch { /* ignore */ }
  return [...boardMembers];
}

function persistBoard(data: BoardMember[]) {
  try {
    localStorage.setItem(STORAGE_KEY_BOARD, JSON.stringify(data));
  } catch { /* quota exceeded */ }
}

export async function login(username: string, password: string) {
  try {
    const formData = new URLSearchParams();
    formData.set("username", username);
    formData.set("password", password);
    const res = await api.post("/api/v1/auth/login", formData.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    setTokens(res.data.access_token, res.data.refresh_token);
    return { ok: true } as const;
  } catch {
    // Fallback: allow any credentials for local dev
    if (!import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL === "http://localhost:8000") {
      setTokens("dev-token", "dev-refresh");
      return { ok: true } as const;
    }
    return { ok: false, error: "Invalid credentials" } as const;
  }
}

export function isLoggedIn() {
  try {
    if (typeof localStorage === "undefined") return false;
    return !!localStorage.getItem("access_token");
  } catch {
    return false;
  }
}

export function logout() {
  clearTokens();
}

export async function saveTeamData(data: AdminTeamData) {
  persistTeam(data);
}

export function loadTeamData(): AdminTeamData {
  return getStoredTeam();
}

export async function saveBoardData(data: BoardMember[]) {
  persistBoard(data);
}

export function loadBoardData(): BoardMember[] {
  return getStoredBoard();
}

const allAssetModules = import.meta.glob<string>(
  "../assets/**/*.{jpg,jpeg,png,gif,webp}",
  { eager: true, query: "?url", import: "default" },
);

export async function getAssetOptions(category = "team") {
  const prefix = `../assets/${category}/`;
  return Object.entries(allAssetModules)
    .filter(([key]) => key.startsWith(prefix))
    .map(([key, val]) => ({
      path: key.replace(/^\.\.\/assets\//, "/src/assets/"),
      url: val,
      label: key.split("/").pop()?.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ") ?? key,
    }));
}

function getStoredMentors(): Mentor[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MENTORS);
    if (raw) {
      const parsed = JSON.parse(raw) as Mentor[];
      if (parsed.length) return parsed;
    }
  } catch { /* ignore */ }
  return [...mentorsData];
}

function persistMentors(data: Mentor[]) {
  try {
    localStorage.setItem(STORAGE_KEY_MENTORS, JSON.stringify(data));
  } catch { /* quota exceeded */ }
}

export async function saveMentorsData(data: Mentor[]) {
  persistMentors(data);
}

export function loadMentorsData(): Mentor[] {
  return getStoredMentors();
}

export async function getBoardAssetOptions() {
  return getAssetOptions("board");
}

export type InfrastructureImages = {
  hero: string;
  collaborative: string;
  conference: string;
  labs: string;
  campus: string;
  galleryCoworking: string;
  galleryStartupBays: string;
  galleryEventHall: string;
  gallerySeminarRoom: string;
  galleryInnovationLabs: string;
  masonryCampus: string;
  masonryIoT: string;
  masonryCollaborative: string;
  masonryConference: string;
  masonryWorkspace: string;
  masonryResearch: string;
};

function getStoredInfrastructure(): InfrastructureImages {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_INFRASTRUCTURE);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<InfrastructureImages>;
      const currentUrls = new Set(Object.values(allAssetModules) as string[]);
      if (parsed.galleryCoworking) {
        const merged = { ...infrastructureImages };
        for (const key of Object.keys(merged) as (keyof InfrastructureImages)[]) {
          const storedVal = parsed[key];
          if (storedVal && currentUrls.has(storedVal)) {
            merged[key] = storedVal;
          }
        }
        return merged;
      }
      localStorage.removeItem(STORAGE_KEY_INFRASTRUCTURE);
    }
  } catch { /* ignore */ }
  return { ...infrastructureImages };
}

function persistInfrastructure(data: InfrastructureImages) {
  try {
    localStorage.setItem(STORAGE_KEY_INFRASTRUCTURE, JSON.stringify(data));
  } catch { /* quota exceeded */ }
}

export async function saveInfrastructureData(data: InfrastructureImages) {
  persistInfrastructure(data);
}

export function loadInfrastructureData(): InfrastructureImages {
  return getStoredInfrastructure();
}

export async function getInfrastructureAssetOptions() {
  return getAssetOptions("infastructure");
}


