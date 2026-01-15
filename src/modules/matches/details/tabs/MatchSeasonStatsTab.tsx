"use client";

import {
  BarChart3,
  TrendingUp,
  Shield,
  Zap,
  Target,
  BookOpen,
} from "lucide-react";
import Image from "next/image";
import React from "react";

import { NoData, SkeletonCardLoader } from "@/components";
import { Card, CardContent } from "@/components/ui/card";
import {
  MatchDetailView,
  MatchListItem,
  MatchesTeamStats,
  TeamStatistics,
} from "@/types/matches";

import { useMatchDetail } from "../../hooks";

interface Props {
  match: MatchListItem;
}

const StatRow: React.FC<{
  label: string;
  homeValue: string | number | undefined;
  awayValue: string | number | undefined;
  suffix?: string;
  isHigherBetter?: boolean;
}> = ({ label, homeValue, awayValue, suffix = "", isHigherBetter = true }) => {
  const h = Number(homeValue) || 0;
  const a = Number(awayValue) || 0;

  let hColor = "text-white";
  let aColor = "text-white";

  if (h !== a) {
    if (isHigherBetter) {
      if (h > a) hColor = "text-primary-green";
      else aColor = "text-primary-green";
    } else {
      if (h < a) hColor = "text-primary-green";
      else aColor = "text-primary-green";
    }
  }

  return (
    <div className="flex flex-col gap-2 py-3 border-b border-white/5 last:border-0">
      <div className="flex justify-between items-center px-1">
        <span className={`text-sm font-bold ${hColor}`}>
          {homeValue ?? "-"}
          {suffix}
        </span>
        <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest">
          {label}
        </span>
        <span className={`text-sm font-bold ${aColor}`}>
          {awayValue ?? "-"}
          {suffix}
        </span>
      </div>
      <div className="flex gap-1.5 h-1.5 w-full rounded-full overflow-hidden bg-white/5">
        <div
          className={`h-full transition-all duration-500 ${h > a ? "bg-primary-green" : "bg-white/20"}`}
          style={{ width: `${(h / (h + a || 1)) * 100}%` }}
        />
        <div
          className={`h-full transition-all duration-500 ${a > h ? "bg-primary-green" : "bg-white/20"}`}
          style={{ width: `${(a / (h + a || 1)) * 100}%` }}
        />
      </div>
    </div>
  );
};

const StatSection: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, icon, children }) => (
  <Card className="bg-primary-gray/5 border-primary-gray/20 overflow-hidden p-0">
    <CardContent className="p-0">
      <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
        {icon}
        <h3 className="text-sm font-bold text-white/90 uppercase tracking-wider">
          {title}
        </h3>
      </div>
      <div className="p-4 space-y-1">{children}</div>
    </CardContent>
  </Card>
);

const MatchSeasonStatsTab: React.FC<Props> = ({ match }) => {
  const seasonId = match.season?.id;

  const { data, isLoading } = useMatchDetail(
    match.id,
    MatchDetailView.SEASON_STATS,
    undefined,
    undefined,
    seasonId,
  );

  const stats = data as MatchesTeamStats;

  if (isLoading) return <SkeletonCardLoader />;
  if (!seasonId || !stats)
    return <NoData message="Season statistics not available" />;

  const home = stats.home;
  const away = stats.away;

  return (
    <div className="max-w-7xl mx-auto py-6 space-y-8">
      <div className="flex items-center justify-between px-4 sm:px-8">
        <div className="flex flex-col items-center gap-3 flex-1">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-2xl p-3 border border-white/10 shadow-xl">
            {home.logo && (
              <Image
                src={home.logo}
                alt={home.name}
                width={80}
                height={80}
                className="object-contain w-full h-full"
              />
            )}
          </div>
          <span className="text-sm sm:text-lg font-black text-white text-center line-clamp-1">
            {home.name}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1 px-4">
          <div className="bg-primary-green/20 text-primary-green text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
            Season Comparison
          </div>
          <span className="text-2xl font-black text-white/20 italic">VS</span>
          <span className="text-[10px] font-bold text-white/40 uppercase text-center max-w-[100px]">
            {match.season?.name}
          </span>
        </div>

        <div className="flex flex-col items-center gap-3 flex-1">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-2xl p-3 border border-white/10 shadow-xl">
            {away.logo && (
              <Image
                src={away.logo}
                alt={away.name}
                width={80}
                height={80}
                className="object-contain w-full h-full"
              />
            )}
          </div>
          <span className="text-sm sm:text-lg font-black text-white text-center line-clamp-1">
            {away.name}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 px-4">
        <StatSection
          title="General"
          icon={<BarChart3 className="w-4 h-4 text-blue-500" />}
        >
          <StatRow
            label="Matches Played"
            homeValue={home.stats.games_played}
            awayValue={away.stats.games_played}
          />
          <StatRow
            label="Wins"
            homeValue={home.stats.wins}
            awayValue={away.stats.wins}
          />
          <StatRow
            label="Draws"
            homeValue={home.stats.draws}
            awayValue={away.stats.draws}
          />
          <StatRow
            label="Losses"
            homeValue={home.stats.losses}
            awayValue={away.stats.losses}
            isHigherBetter={false}
          />
          <StatRow
            label="Points Per Game"
            homeValue={home.stats.points_per_game}
            awayValue={away.stats.points_per_game}
          />
          <StatRow
            label="Win Rate"
            homeValue={
              home.stats.games_played
                ? (
                    ((home.stats.wins || 0) / home.stats.games_played) *
                    100
                  ).toFixed(1)
                : 0
            }
            awayValue={
              away.stats.games_played
                ? (
                    ((away.stats.wins || 0) / away.stats.games_played) *
                    100
                  ).toFixed(1)
                : 0
            }
            suffix="%"
          />
        </StatSection>

        {/* Attack */}
        <StatSection
          title="Attack"
          icon={<Zap className="w-4 h-4 text-yellow-500" />}
        >
          <StatRow
            label="Goals For"
            homeValue={home.stats.goals_for}
            awayValue={away.stats.goals_for}
          />
          <StatRow
            label="Expected Goals"
            homeValue={home.stats.expected_goals}
            awayValue={away.stats.expected_goals}
          />
          <StatRow
            label="Shots Per Game"
            homeValue={
              home.stats.games_played
                ? ((home.stats.shots || 0) / home.stats.games_played).toFixed(1)
                : 0
            }
            awayValue={
              away.stats.games_played
                ? ((away.stats.shots || 0) / away.stats.games_played).toFixed(1)
                : 0
            }
          />
          <StatRow
            label="Shot Acc."
            homeValue={home.stats.shot_on_target_percentage}
            awayValue={away.stats.shot_on_target_percentage}
            suffix="%"
          />
          <StatRow
            label="Conversion"
            homeValue={home.stats.shot_conversion_rate}
            awayValue={away.stats.shot_conversion_rate}
            suffix="%"
          />
          <StatRow
            label="Corners"
            homeValue={
              home.stats.games_played
                ? ((home.stats.corners || 0) / home.stats.games_played).toFixed(
                    1,
                  )
                : 0
            }
            awayValue={
              away.stats.games_played
                ? ((away.stats.corners || 0) / away.stats.games_played).toFixed(
                    1,
                  )
                : 0
            }
          />
        </StatSection>

        {/* Defense */}
        <StatSection
          title="Defense"
          icon={<Shield className="w-4 h-4 text-primary-green" />}
        >
          <StatRow
            label="Goals Against"
            homeValue={home.stats.goals_against}
            awayValue={away.stats.goals_against}
            isHigherBetter={false}
          />
          <StatRow
            label="Clean Sheets"
            homeValue={home.stats.clean_sheets}
            awayValue={away.stats.clean_sheets}
          />
          <StatRow
            label="Rating"
            homeValue={home.stats.rating}
            awayValue={away.stats.rating}
          />
          <StatRow
            label="Tackles"
            homeValue={
              home.stats.games_played
                ? ((home.stats.tackles || 0) / home.stats.games_played).toFixed(
                    1,
                  )
                : 0
            }
            awayValue={
              away.stats.games_played
                ? ((away.stats.tackles || 0) / away.stats.games_played).toFixed(
                    1,
                  )
                : 0
            }
          />
          <StatRow
            label="Interceptions"
            homeValue={
              home.stats.interception_stats?.total
                ? (
                    home.stats.interception_stats.total /
                    (home.stats.games_played || 1)
                  ).toFixed(1)
                : 0
            }
            awayValue={
              away.stats.interception_stats?.total
                ? (
                    away.stats.interception_stats.total /
                    (away.stats.games_played || 1)
                  ).toFixed(1)
                : 0
            }
          />
        </StatSection>

        {/* Discipline & Others */}
        <StatSection
          title="Discipline & Style"
          icon={<BookOpen className="w-4 h-4 text-purple-500" />}
        >
          <StatRow
            label="Yellow Cards"
            homeValue={home.stats.yellow_cards}
            awayValue={away.stats.yellow_cards}
            isHigherBetter={false}
          />
          <StatRow
            label="Red Cards"
            homeValue={home.stats.red_cards}
            awayValue={away.stats.red_cards}
            isHigherBetter={false}
          />
          <StatRow
            label="Possession"
            homeValue={home.stats.possession}
            awayValue={away.stats.possession}
            suffix="%"
          />
          <StatRow
            label="Pass Accuracy"
            homeValue={home.stats.pass_stats?.accuracy_percentage}
            awayValue={away.stats.pass_stats?.accuracy_percentage}
            suffix="%"
          />
          <StatRow
            label="Avg. Age"
            homeValue={home.stats.average_player_age}
            awayValue={away.stats.average_player_age}
            isHigherBetter={false}
          />
          <StatRow
            label="Avg. Height"
            homeValue={home?.stats?.average_player_height ?? 0}
            awayValue={away?.stats?.average_player_height ?? 0}
            suffix="cm"
          />
        </StatSection>
      </div>

      {/* Goal Results & Halves (Detailed Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-4">
        <Card className="bg-primary-gray/5 border-primary-gray/20 p-4 flex flex-col items-center gap-2">
          <Target className="w-6 h-6 text-red-500" />
          <span className="text-[10px] font-bold text-white/40 uppercase">
            Scored First
          </span>
          <div className="flex w-full justify-between items-baseline mt-2">
            <span className="text-xl font-black text-white">
              {home.stats.goal_results?.scored_first ?? 0}
            </span>
            <span className="text-xs font-bold text-white/20">vs</span>
            <span className="text-xl font-black text-white">
              {away.stats.goal_results?.scored_first ?? 0}
            </span>
          </div>
        </Card>

        <Card className="bg-primary-gray/5 border-primary-gray/20 p-4 flex flex-col items-center gap-2">
          <TrendingUp className="w-6 h-6 text-orange-500" />
          <span className="text-[10px] font-bold text-white/40 uppercase">
            Both Halves Scored
          </span>
          <div className="flex w-full justify-between items-baseline mt-2">
            <span className="text-xl font-black text-white">
              {home.stats.half_results?.scored_both_halves ?? 0}
            </span>
            <span className="text-xs font-bold text-white/20">vs</span>
            <span className="text-xl font-black text-white">
              {away.stats.half_results?.scored_both_halves ?? 0}
            </span>
          </div>
        </Card>

        <Card className="bg-primary-gray/5 border-primary-gray/20 p-4 flex flex-col items-center gap-2">
          <BarChart3 className="w-6 h-6 text-indigo-500" />
          <span className="text-[10px] font-bold text-white/40 uppercase">
            Avg. Player Rating
          </span>
          <div className="flex w-full justify-between items-baseline mt-2">
            <span className="text-xl font-black text-white">
              {home.stats.rating?.toFixed(1) ?? "0.0"}
            </span>
            <span className="text-xs font-bold text-white/20">vs</span>
            <span className="text-xl font-black text-white">
              {away.stats.rating?.toFixed(1) ?? "0.0"}
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MatchSeasonStatsTab;
