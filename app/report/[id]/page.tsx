import type { Metadata } from "next";
import { getSupabaseAdmin } from "@/lib/supabase/client";

type ReportPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: ReportPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `RedScreen report ${id.slice(0, 8)}…`,
    description: "Private structural audit report. Not indexed in search.",
    robots: { index: false, follow: false }
  };
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  let report: {
    url: string;
    performance_score: number;
    schema_score: number;
    issue_count: number;
    summary: string;
    created_at: string;
  } | null = null;

  if (supabase) {
    const { data } = await supabase
      .from("audits")
      .select("url,performance_score,schema_score,issue_count,summary,created_at")
      .eq("id", id)
      .single();
    report = data;
  }

  return (
    <main className="panel">
      <h1>RedScreen Report {id}</h1>
      {!supabase ? <p className="muted">Supabase is not configured yet.</p> : null}
      {supabase && !report ? <p className="muted">No report found for this id.</p> : null}
      {report ? (
        <div>
          <p>
            <strong>Target URL:</strong> {report.url}
          </p>
          <p>
            <strong>Performance:</strong> {report.performance_score}
          </p>
          <p>
            <strong>Schema:</strong> {report.schema_score}
          </p>
          <p>
            <strong>Issue Count:</strong> {report.issue_count}
          </p>
          <p>
            <strong>Summary:</strong> {report.summary}
          </p>
        </div>
      ) : null}
    </main>
  );
}
