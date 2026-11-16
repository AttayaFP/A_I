import { JobStatus } from "@/types/video";

interface StatusIndicatorProps {
  status: JobStatus;
  jobId: string;
}

export function StatusIndicator({ status, jobId }: StatusIndicatorProps) {
  const steps: { key: JobStatus; label: string; desc: string }[] = [
    {
      key: "queued",
      label: "DALAM ANTREAN",
      desc: "Pekerjaan diterima dalam antrean sistem lokal",
    },
    {
      key: "processing",
      label: "SEDANG DIPROSES",
      desc: "Mensintesis bingkai dan merender gerakan visual",
    },
    {
      key: "completed",
      label: "SELESAI",
      desc: "Sekuen video selesai dikompilasi dan siap diputar",
    },
  ];

  const getStepState = (stepKey: JobStatus) => {
    if (status === "failed") return "failed";
    if (status === "completed") return "done";
    if (status === "processing") {
      if (stepKey === "queued") return "done";
      if (stepKey === "processing") return "active";
      return "pending";
    }
    if (status === "queued") {
      if (stepKey === "queued") return "active";
      return "pending";
    }
    return "pending";
  };

  const getStatusLabel = () => {
    if (status === "queued") return "DALAM ANTREAN";
    if (status === "processing") return "SEDANG DIPROSES";
    if (status === "completed") return "SELESAI";
    if (status === "failed") return "GAGAL";
    return status;
  };

  return (
    <div className="w-full flex flex-col gap-6 bg-[#1a1a1a] border border-[#27272a] rounded-[8px] p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#27272a]">
        <div className="flex items-center gap-3">
          <span
            className={`w-2.5 h-2.5 rounded-[2px] ${
              status === "completed"
                ? "bg-emerald-500"
                : status === "failed"
                ? "bg-red-500"
                : "bg-amber-400 animate-pulse"
            }`}
          />
          <span className="text-[14px] uppercase tracking-[0.35px] text-white font-medium">
            STATUS: {getStatusLabel()}
          </span>
        </div>
        <span className="text-[12px] font-mono text-[#767d88] tracking-normal">
          ID PEKERJAAN: {jobId}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step) => {
          const stepState = getStepState(step.key);

          return (
            <div
              key={step.key}
              className={`p-4 rounded-[4px] border transition-colors flex flex-col gap-2 ${
                stepState === "active"
                  ? "border-white bg-[#030303] text-white"
                  : stepState === "done"
                  ? "border-[#27272a] bg-[#030303]/60 text-zinc-300"
                  : "border-[#27272a] bg-[#030303]/20 text-[#3f3f3f]"
              }`}
            >
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.35px]">
                <span
                  className={
                    stepState === "active"
                      ? "text-white font-semibold"
                      : stepState === "done"
                      ? "text-[#767d88]"
                      : "text-[#3f3f3f]"
                  }
                >
                  {step.label}
                </span>
                <span>
                  {stepState === "done" && "✓"}
                  {stepState === "active" && "●"}
                  {stepState === "pending" && "—"}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-[#767d88]">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
