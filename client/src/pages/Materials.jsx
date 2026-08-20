import { useEffect, useState } from "react";
import { Copy, Check, Image as ImageIcon, MessageSquare, Film } from "lucide-react";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { getReferralLink } from "../lib/format";
import { Spinner } from "../components/ui";

const typeIcon = {
  banner: ImageIcon,
  story: ImageIcon,
  caption: MessageSquare,
  video: Film,
};

export default function Materials() {
  const { user } = useAuth();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    api.get("/materials").then((res) => setMaterials(res.data.materials)).finally(() => setLoading(false));
  }, []);

  function copyCaption(material) {
    const link = user ? getReferralLink(user.referralCode) : "";
    const text = `${material.captionText}\n\n${link}`;
    navigator.clipboard.writeText(text);
    setCopiedId(material._id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold sm:text-3xl">Materials</h1>
      <p className="mt-1 max-w-lg text-sm text-[var(--color-text-muted)]">
        Ready-to-post banners and captions. Your referral link is added automatically when you copy a caption.
      </p>

      {loading ? (
        <div className="flex h-48 items-center justify-center"><Spinner className="h-6 w-6 text-[var(--color-text-muted)]" /></div>
      ) : materials.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-[var(--color-border)] p-10 text-center text-sm text-[var(--color-text-muted)]">
          No materials available yet — check back soon.
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-2 gap-2.5 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {materials.map((m) => {
            const Icon = typeIcon[m.type] || ImageIcon;
            return (
              <div key={m._id} className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-md">
                <div>
                  {m.fileUrl ? (
                    <img src={m.fileUrl} alt={m.title} className="aspect-[4/3] w-full object-cover" />
                  ) : (
                    <div className="flex aspect-[4/3] w-full items-center justify-center bg-gradient-to-br from-[var(--color-yellow)]/10 to-[var(--color-surface-raised)]">
                      <Icon size={24} className="text-[var(--color-text-faint)]" />
                    </div>
                  )}
                  <div className="p-2.5 sm:p-4">
                    <span className="inline-flex w-fit items-center gap-1 rounded-full bg-[var(--color-border)] px-2 py-0.5 text-[8px] sm:text-[10px] font-bold uppercase tracking-wide text-[var(--color-text-muted)]">
                      {m.type}
                    </span>
                    <h3 className="mt-1.5 font-[family-name:var(--font-display)] text-xs sm:text-sm font-bold text-white line-clamp-1 sm:line-clamp-2">
                      {m.title}
                    </h3>
                    {m.captionText && (
                      <p className="mt-1 line-clamp-2 flex-1 text-[10px] sm:text-xs leading-relaxed text-[var(--color-text-muted)]">
                        {m.captionText}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-2.5 pt-0 sm:p-4 sm:pt-0">
                  <div className="flex flex-col xs:flex-row gap-1.5 sm:gap-2">
                    {m.captionText && (
                      <button
                        onClick={() => copyCaption(m)}
                        className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-[var(--color-yellow)] py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold text-[var(--color-ink)] transition active:scale-95 hover:bg-[var(--color-amber)]"
                      >
                        {copiedId === m._id ? <Check size={12} /> : <Copy size={12} />}
                        <span>{copiedId === m._id ? "Copied" : "Caption"}</span>
                      </button>
                    )}
                    {m.fileUrl && (
                      <a
                        href={m.fileUrl}
                        download
                        className="flex items-center justify-center rounded-lg border border-[var(--color-border)] px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold text-[var(--color-text)] transition hover:border-[var(--color-yellow)]"
                      >
                        Download
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
