import type {
  LeaderboardEntry,
  LeaderboardPeriod,
  LeaderboardResponse,
} from "../../data/peringkat/types.ts";
import { generateDemoEntries } from "../../data/peringkat/demoPlayers.ts";
import { sanitizeNickname } from "../../data/peringkat/profanity.ts";
import { calculateLevel } from "../../data/levels.ts";
import type { PlayerState } from "../../types/player.ts";
import { getLocalDateKey, getLocalWeekKey } from "../../data/missions.ts";

/**
 * Calculates next Monday at 00:00 local time
 */
export function getNextWeeklyResetDate(currentDate = new Date()): Date {
  const nextMonday = new Date(currentDate);
  const day = nextMonday.getDay(); // 0 is Sunday, 1 is Monday
  const daysUntilMonday = day === 0 ? 1 : 8 - day;
  nextMonday.setDate(nextMonday.getDate() + daysUntilMonday);
  nextMonday.setHours(0, 0, 0, 0);
  return nextMonday;
}

export interface ILeaderboardService {
  getLeaderboard(
    period: LeaderboardPeriod,
    state: PlayerState,
    currentDate?: Date
  ): LeaderboardResponse;
}

/**
 * Demo / Client-side implementation of leaderboard service.
 * In production with a backend, this can be swapped with RemoteLeaderboardService
 * that calls GET /api/leaderboard?period=... and POST /api/leaderboard/score.
 */
export class DemoLeaderboardService implements ILeaderboardService {
  getLeaderboard(
    period: LeaderboardPeriod,
    state: PlayerState,
    currentDate = new Date()
  ): LeaderboardResponse {
    const effectiveDate = new Date(currentDate);
    if (state.simulatedDateOffsetDays) {
      effectiveDate.setDate(effectiveDate.getDate() + state.simulatedDateOffsetDays);
    }

    const weekKey = getLocalWeekKey(effectiveDate);
    const dayOfWeek = effectiveDate.getDay();

    // 1. Get demo participants
    const demoEntries = generateDemoEntries(period, weekKey, dayOfWeek);

    // 2. Prepare current user entry
    const showOnBoard = state.leaderboard?.showOnBoard ?? true;
    const rawNickname = state.nickname || "Pahlawan Bumi";
    const sanitizedName = sanitizeNickname(rawNickname);
    const displayNickname = showOnBoard ? sanitizedName : "Pemain Rahasia";
    const displayAvatar = showOnBoard ? state.avatar || "🤖" : "🕵️";

    const userXp =
      period === "mingguan"
        ? (state.xpLog && state.xpLog.weekKey === weekKey ? state.xpLog.weeklyXp : 0)
        : state.xp;

    const userLvl = calculateLevel(userXp);

    // Calculate user trend based on stored snapshot if available
    let trend: "naik" | "turun" | "tetap" = "tetap";
    let trendDelta = 0;
    const prevSnapshotRank =
      period === "mingguan"
        ? state.leaderboard?.rankSnapshot?.weeklyRank
        : state.leaderboard?.rankSnapshot?.allTimeRank;

    const userEntry: LeaderboardEntry = {
      id: "current-user",
      isCurrentUser: true,
      isDemo: false,
      rank: 0,
      nickname: displayNickname,
      avatar: displayAvatar,
      level: userLvl.level,
      title: userLvl.title,
      xp: userXp,
      trend: "tetap",
      trendDelta: 0,
      sticker: state.inventory?.equipped?.stiker,
      badgeCount: Object.keys(state.achievements?.badges || {}).length,
    };

    // 3. Combine and sort descending by XP
    const all = [...demoEntries, userEntry];
    all.sort((a, b) => {
      if (b.xp !== a.xp) return b.xp - a.xp;
      // Tie breaker: real user first, then alphabetically
      if (a.isCurrentUser) return -1;
      if (b.isCurrentUser) return 1;
      return a.id.localeCompare(b.id);
    });

    // 4. Assign ranks
    all.forEach((entry, idx) => {
      entry.rank = idx + 1;
    });

    // Determine current user rank and trend
    const finalUserEntry = all.find((e) => e.isCurrentUser)!;
    if (prevSnapshotRank && prevSnapshotRank > 0) {
      if (finalUserEntry.rank < prevSnapshotRank) {
        trend = "naik";
        trendDelta = prevSnapshotRank - finalUserEntry.rank;
      } else if (finalUserEntry.rank > prevSnapshotRank) {
        trend = "turun";
        trendDelta = finalUserEntry.rank - prevSnapshotRank;
      } else {
        trend = "tetap";
        trendDelta = 0;
      }
    }
    finalUserEntry.trend = trend;
    finalUserEntry.trendDelta = trendDelta;

    const nextReset = getNextWeeklyResetDate(effectiveDate).toISOString();

    return {
      period,
      weekKey,
      entries: all,
      currentUserEntry: finalUserEntry,
      totalParticipants: all.length,
      nextResetDate: nextReset,
    };
  }
}

/**
 * Helper to extract slice around user if user is > rank 10
 */
export function getSurroundingEntries(
  entries: LeaderboardEntry[],
  currentUserRank: number
): LeaderboardEntry[] {
  if (currentUserRank <= 10) return [];
  const userIdx = entries.findIndex((e) => e.isCurrentUser);
  if (userIdx === -1) return [];

  const start = Math.max(0, userIdx - 1);
  const end = Math.min(entries.length, userIdx + 2);
  return entries.slice(start, end);
}

// Default export singleton service
export const leaderboardService: ILeaderboardService = new DemoLeaderboardService();
