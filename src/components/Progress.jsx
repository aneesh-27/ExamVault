import React from "react";
import {
  LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis,
  Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { WEEKLY_ACTIVITY, SCORE_TREND, TOPIC_MASTERY_RADAR } from "../data/mockData";
import { useTheme } from "../context/ThemeContext";

function ProgressPage({ go }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const gridStroke = isDark ? "#222C40" : "#EDEAE1";
  const axisStroke = isDark ? "#94A3B8" : "#6B7280";
  const tooltipStyle = {
    background: isDark ? "#131926" : "#FFFFFF",
    borderRadius: 10,
    border: `1px solid ${isDark ? "#222C40" : "#E7E4DA"}`,
    color: isDark ? "#F1F5F9" : "#1C2130",
    fontSize: 12,
  };
  const lineStroke = isDark ? "#F59E0B" : "#14213D";
  const barFill = isDark ? "#38BDF8" : "#14213D";

  return (
    <div className="sa-fade-in space-y-6">
      <div>
        <h2 className="sa-serif text-2xl font-semibold">Progress</h2>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>A full view of your preparation across every document.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[["Overall Prep", "72%"], ["Study Time", "18.4 hrs"], ["Streak", "5 days"], ["Questions", "145"]].map(([l, v]) => (
          <div key={l} className="sa-card p-4">
            <div className="sa-serif text-xl font-semibold">{v}</div>
            <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{l}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="sa-card sa-card-lg p-5">
          <h3 className="font-semibold text-sm mb-3">Quiz Score Over Time</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={SCORE_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="attempt" tick={{ fontSize: 11 }} stroke={axisStroke} />
              <YAxis tick={{ fontSize: 11 }} stroke={axisStroke} domain={[0, 100]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="score" stroke={lineStroke} strokeWidth={2.5} dot={{ r: 4, fill: "var(--accent)" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="sa-card sa-card-lg p-5">
          <h3 className="font-semibold text-sm mb-3">Topic Mastery</h3>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={TOPIC_MASTERY_RADAR}>
              <PolarGrid stroke={gridStroke} />
              <PolarAngleAxis dataKey="topic" tick={{ fontSize: 10, fill: axisStroke }} />
              <Radar dataKey="value" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.35} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="sa-card sa-card-lg p-5 lg:col-span-2">
          <h3 className="font-semibold text-sm mb-3">Weekly Study Activity</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={WEEKLY_ACTIVITY}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke={axisStroke} />
              <YAxis tick={{ fontSize: 11 }} stroke={axisStroke} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="hours" fill={barFill} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="sa-card sa-card-lg p-5">
          <h3 className="font-semibold text-sm mb-3">Your Weak Areas</h3>
          <div className="space-y-2">
            {TOPIC_MASTERY_RADAR.filter((t) => t.value < 70).sort((a, b) => a.value - b.value).map((t) => (
              <div key={t.topic} className="flex items-center justify-between text-sm px-3 py-2 rounded-lg" style={{ background: "var(--danger-soft)" }}>
                <span>{t.topic}</span>
                <span className="font-semibold" style={{ color: "var(--danger)" }}>{t.value}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="sa-card sa-card-lg p-5">
          <h3 className="font-semibold text-sm mb-3">Recommended Next Steps</h3>
          <ol className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0" style={{ background: "var(--accent-soft)", color: "var(--accent-ink)" }}>1</span>
              <span>Revise Routing Algorithms</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0" style={{ background: "var(--accent-soft)", color: "var(--accent-ink)" }}>2</span>
              <span>Take the TCP/IP quiz</span>
              <button onClick={() => go("quiz-setup")} className="ml-auto text-xs font-medium hover:underline" style={{ color: "var(--info)" }}>Start →</button>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0" style={{ background: "var(--accent-soft)", color: "var(--accent-ink)" }}>3</span>
              <span>Review Transport Layer flashcards</span>
              <button onClick={() => go("flashcards")} className="ml-auto text-xs font-medium hover:underline" style={{ color: "var(--info)" }}>Start →</button>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default ProgressPage;
