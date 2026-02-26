type OutputFormat = "json" | "md";

type MetricsReport = {
  report_window: {
    from: string;
    to: string;
  };
  metrics: {
    copilot_comment_acceptance_rate: number | null;
    confirmed_defect_prevention_proxy: number | null;
    false_positive_rate: number | null;
    review_cycle_time_hours: number | null;
    post_merge_bug_rate: number | null;
    rework_reopen_rate: number | null;
  };
  notes: string[];
};

const HELP_TEXT = `review:metrics

Usage:
  bun run review:metrics [--from=YYYY-MM-DD] [--to=YYYY-MM-DD] [--format=json|md]

Options:
  --from=YYYY-MM-DD   Report start date (default: 7 days ago)
  --to=YYYY-MM-DD     Report end date (default: today)
  --format=json|md    Output format (default: json)
  --help              Show this help text
`;

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function parseIsoDate(value: string, flagName: string): Date {
  if (!DATE_PATTERN.test(value)) {
    throw new Error(`Invalid ${flagName} value "${value}". Expected YYYY-MM-DD.`);
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid ${flagName} date "${value}".`);
  }

  const normalized = date.toISOString().slice(0, 10);
  if (normalized !== value) {
    throw new Error(`Invalid ${flagName} date "${value}".`);
  }

  return date;
}

function parseArgs(argv: string[]): { from: string; to: string; format: OutputFormat; help: boolean } {
  const args = argv.slice(2);
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const defaults = {
    from: weekAgo.toISOString().slice(0, 10),
    to: now.toISOString().slice(0, 10),
    format: "json" as OutputFormat,
    help: false,
  };

  const parsed = { ...defaults };

  for (const arg of args) {
    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
      continue;
    }
    if (arg.startsWith("--from=")) {
      parsed.from = arg.replace("--from=", "");
      continue;
    }
    if (arg.startsWith("--to=")) {
      parsed.to = arg.replace("--to=", "");
      continue;
    }
    if (arg.startsWith("--format=")) {
      const value = arg.replace("--format=", "");
      if (value === "json" || value === "md") {
        parsed.format = value;
        continue;
      }
      throw new Error(`Invalid format "${value}". Use json or md.`);
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  const fromDate = parseIsoDate(parsed.from, "--from");
  const toDate = parseIsoDate(parsed.to, "--to");
  if (fromDate.getTime() > toDate.getTime()) {
    throw new Error(`Invalid date range: --from (${parsed.from}) must be <= --to (${parsed.to}).`);
  }

  return parsed;
}

function buildPlaceholderReport(from: string, to: string): MetricsReport {
  return {
    report_window: { from, to },
    metrics: {
      copilot_comment_acceptance_rate: null,
      confirmed_defect_prevention_proxy: null,
      false_positive_rate: null,
      review_cycle_time_hours: null,
      post_merge_bug_rate: null,
      rework_reopen_rate: null,
    },
    notes: [
      "Scaffold mode: metric values are placeholders.",
      "Connect data extractors for pull requests, triage labels, and issue links.",
    ],
  };
}

function renderMarkdown(report: MetricsReport): string {
  return [
    "# Copilot Review Metrics Report",
    "",
    `- from: ${report.report_window.from}`,
    `- to: ${report.report_window.to}`,
    "",
    "## Metrics",
    `- copilot_comment_acceptance_rate: ${String(report.metrics.copilot_comment_acceptance_rate)}`,
    `- confirmed_defect_prevention_proxy: ${String(report.metrics.confirmed_defect_prevention_proxy)}`,
    `- false_positive_rate: ${String(report.metrics.false_positive_rate)}`,
    `- review_cycle_time_hours: ${String(report.metrics.review_cycle_time_hours)}`,
    `- post_merge_bug_rate: ${String(report.metrics.post_merge_bug_rate)}`,
    `- rework_reopen_rate: ${String(report.metrics.rework_reopen_rate)}`,
    "",
    "## Notes",
    ...report.notes.map((note) => `- ${note}`),
  ].join("\n");
}

function main(): void {
  const { from, to, format, help } = parseArgs(Bun.argv);
  if (help) {
    console.log(HELP_TEXT);
    return;
  }

  const report = buildPlaceholderReport(from, to);

  if (format === "md") {
    console.log(renderMarkdown(report));
    return;
  }

  console.log(JSON.stringify(report, null, 2));
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : "Unknown error";
  console.error(`review:metrics failed: ${message}`);
  process.exit(1);
}
