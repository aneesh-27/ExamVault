import React from "react";
import {
  LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis,
  Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { WEEKLY_ACTIVITY, SCORE_TREND, TOPIC_MASTERY_RADAR } from "../data/mockData";

function ProgressPage({ go }) {
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
              <CartesianGrid strokeDasharray="3 3" stroke="#EDEAE1" />
              <XAxis dataKey="attempt" tick={{ fontSize: 11 }} stroke="#6B7280" />
              <YAxis tick={{ fontSize: 11 }} stroke="#6B7280" domain={[0, 100]} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E7E4DA", fontSize: 12 }} />
              <Line type="monotone" dataKey="score" stroke="#14213D" strokeWidth={2.5} dot={{ r: 4, fill: "#E8A33D" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="sa-card sa-card-lg p-5">
          <h3 className="font-semibold text-sm mb-3">Topic Mastery</h3>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={TOPIC_MASTERY_RADAR}>
              <PolarGrid stroke="#EDEAE1" />
              <PolarAngleAxis dataKey="topic" tick={{ fontSize: 10, fill: "#6B7280" }} />
              <Radar dataKey="value" stroke="#E8A33D" fill="#E8A33D" fillOpacity={0.35} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="sa-card sa-card-lg p-5 lg:col-span-2">
          <h3 className="font-semibold text-sm mb-3">Weekly Study Activity</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={WEEKLY_ACTIVITY}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EDEAE1" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="#6B7280" />
              <YAxis tick={{ fontSize: 11 }} stroke="#6B7280" />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E7E4DA", fontSize: 12 }} />
              <Bar dataKey="hours" fill="#14213D" radius={[6, 6, 0, 0]} />
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
            <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0" style={{ background: "var(--accent-soft)", color: "var(--accent-ink)" }}>1</span>Revise Routing Algorithms</li>
            <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0" style={{ background: "var(--accent-soft)", color: "var(--accent-ink)" }}>2</span>Take the TCP/IP quiz
              <button onClick={() => go("quiz-setup")} className="ml-auto text-xs font-medium" style={{ color: "var(--info)" }}>Start →</button>
            </li>
            <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0" style={{ background: "var(--accent-soft)", color: "var(--accent-ink)" }}>3</span>Review Transport Layer flashcards
              <button onClick={() => go("flashcards")} className="ml-auto text-xs font-medium" style={{ color: "var(--info)" }}>Start →</button>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}


export default ProgressPage;
