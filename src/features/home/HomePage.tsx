import { Card, CardBody, Chip } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { BasePageLayout } from "../BasePageLayout";
import { UserService, PageService } from "../../services";
import { LinkService } from "../../services/pages/LinkService";
import { useAsync, useSetPageHeader } from "../../hooks";
import { routes } from "../../app/routes";
import { Link, Page, PageType, LinkType, StreamPlatform } from "../../data/entities/pages";
import {
  FaLayerGroup, FaGlobe, FaEdit, FaLink,
  FaChartBar, FaQrcode, FaMagic, FaArrowRight,
  FaBell, FaSpotify,
} from "react-icons/fa";
import { SiApplemusic } from "react-icons/si";

const pageService = new PageService();
const linkService = new LinkService();

// ── Mini bar ───────────────────────────────────────────────────────────────────
function MiniBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="w-full h-1.5 bg-default-100 rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  );
}

// ── Stat card ──────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, iconBg, iconColor, sub }: {
  label: string; value: number | string; icon: React.ReactNode;
  iconBg: string; iconColor: string; sub?: string;
}) {
  return (
    <Card className="border border-default-200 shadow-none">
      <CardBody className="flex flex-row items-center gap-4 p-5">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
          <span className={`text-xl ${iconColor}`}>{icon}</span>
        </div>
        <div>
          <p className="text-2xl font-bold leading-none">{value}</p>
          <p className="text-sm text-default-500 mt-1">{label}</p>
          {sub && <p className="text-xs text-default-400 mt-0.5">{sub}</p>}
        </div>
      </CardBody>
    </Card>
  );
}

// ── Coming-soon card ───────────────────────────────────────────────────────────
function ComingSoonCard({ icon, title, description, iconBg, iconColor }: {
  icon: React.ReactNode; title: string; description: string;
  iconBg: string; iconColor: string;
}) {
  return (
    <Card className="border border-default-200 shadow-none opacity-80">
      <CardBody className="flex flex-row items-center gap-4 p-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>
          <span className={`text-lg ${iconColor}`}>{icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm">{title}</p>
          <p className="text-xs text-default-400 mt-0.5 leading-snug">{description}</p>
        </div>
        <Chip size="sm" variant="flat" color="default" className="shrink-0 text-xs">Soon</Chip>
      </CardBody>
    </Card>
  );
}

// ── Recent page row ────────────────────────────────────────────────────────────
const PAGE_TYPE_COLORS: Record<PageType, "primary" | "secondary" | "success" | "warning"> = {
  [PageType.Profile]: "primary",
  [PageType.Song]:    "secondary",
  [PageType.Album]:   "success",
  [PageType.Event]:   "warning",
};

function RecentPageRow({ page, userName, linkCount }: { page: Page; userName: string; linkCount: number }) {
  const navigate = useNavigate();
  const url = page.type === PageType.Profile
    ? `lnkn.my/${userName}`
    : `lnkn.my/${userName}/${page.slug}`;

  return (
    <div
      className="flex items-center gap-3 py-3 px-1 cursor-pointer rounded-lg hover:bg-default-50 transition-colors group"
      onClick={() => navigate(routes.pages.page.index.replace(":id", page.id.toString()))}
    >
      <div className="w-9 h-9 rounded-lg bg-default-100 flex items-center justify-center shrink-0">
        <FaLayerGroup className="text-default-400 text-sm" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm truncate">{page.name}</p>
        <p className="text-xs text-default-400 truncate">{url}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs text-default-400">{linkCount} btn{linkCount !== 1 ? "s" : ""}</span>
        <Chip size="sm" variant="flat" color={PAGE_TYPE_COLORS[page.type] ?? "default"} className="text-xs hidden sm:flex">
          {page.type}
        </Chip>
        <FaArrowRight className="text-default-300 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export function HomePage() {
  useSetPageHeader("Dashboard");
  const navigate = useNavigate();
  const userInfo = UserService.getUserInfo();

  const { value: pages, loading: pagesLoading } = useAsync(() => pageService.getAll(), []);
  const { value: links, loading: linksLoading } = useAsync(() => linkService.getAll(), []);

  if (!UserService.isSignedIn()) return <></>;

  const loading = pagesLoading || linksLoading;

  // ── Computed stats ─────────────────────────────────────────────────────────
  const totalPages  = pages?.length ?? 0;
  const livePages   = pages?.filter(p => p.isPublished).length ?? 0;
  const draftPages  = pages?.filter(p => !p.isPublished).length ?? 0;
  const totalLinks  = links?.length ?? 0;

  // Link type breakdown
  const streamLinks  = links?.filter(l => l.type === LinkType.stream).length ?? 0;
  const defaultLinks = links?.filter(l => l.type === LinkType.default).length ?? 0;

  // Platform breakdown (parse theme string)
  const parsePlatform = (l: Link): string | null => {
    try { return (JSON.parse(l.theme as any))?.platform ?? null; } catch { return null; }
  };
  const spotifyCount     = links?.filter(l => parsePlatform(l) === StreamPlatform.spotify).length ?? 0;
  const appleMusicCount  = links?.filter(l => parsePlatform(l) === StreamPlatform.appleMusic).length ?? 0;

  // Link counts per page
  const linksByPage = new Map<number, number>();
  links?.forEach(l => linksByPage.set(l.pageId, (linksByPage.get(l.pageId) ?? 0) + 1));

  // Pages needing attention: live but 0 buttons
  const needsAttention = pages?.filter(p => p.isPublished && (linksByPage.get(p.id) ?? 0) === 0) ?? [];

  // Page type distribution
  const byType = Object.values(PageType).map(t => ({
    type: t,
    count: pages?.filter(p => p.type === t).length ?? 0,
  })).filter(x => x.count > 0);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <BasePageLayout>
      <div className="space-y-8 py-2">

        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-bold">{greeting}{userInfo?.userName ? `, ${userInfo.userName}` : ""}.</h1>
          <p className="text-default-500 text-sm mt-1">Here's an overview of your LNKN presence.</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Pages" value={loading ? "—" : totalPages}
            icon={<FaLayerGroup />} iconBg="bg-primary-100" iconColor="text-primary" />
          <StatCard label="Live Pages" value={loading ? "—" : livePages}
            icon={<FaGlobe />} iconBg="bg-success-100" iconColor="text-success-600"
            sub={totalPages > 0 ? `${Math.round((livePages / totalPages) * 100)}% published` : undefined} />
          <StatCard label="Drafts" value={loading ? "—" : draftPages}
            icon={<FaEdit />} iconBg="bg-warning-100" iconColor="text-warning-600" />
          <StatCard label="Total Buttons" value={loading ? "—" : totalLinks}
            icon={<FaLink />} iconBg="bg-secondary-100" iconColor="text-secondary-600"
            sub={totalPages > 0 ? `avg ${(totalLinks / totalPages).toFixed(1)} per page` : undefined} />
        </div>

        {/* Middle row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Recent pages */}
          <Card className="border border-default-200 shadow-none lg:col-span-2">
            <CardBody className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="font-bold text-sm text-default-600 uppercase tracking-wider">Your Pages</p>
                <button className="text-xs text-primary hover:underline font-medium"
                  onClick={() => navigate(routes.pages.index)}>View all</button>
              </div>

              {loading && (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3 py-3 animate-pulse">
                      <div className="w-9 h-9 rounded-lg bg-default-100" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-default-100 rounded w-2/3" />
                        <div className="h-2 bg-default-100 rounded w-1/3" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!loading && pages?.length === 0 && (
                <div className="flex flex-col items-center justify-center py-10 gap-3">
                  <FaLayerGroup className="text-default-200" size={32} />
                  <p className="text-sm text-default-400">No pages yet.</p>
                  <button className="text-sm text-primary font-medium hover:underline"
                    onClick={() => navigate(routes.pages.index)}>Create your first page →</button>
                </div>
              )}

              {!loading && (pages?.length ?? 0) > 0 && (() => {
                const TYPE_ORDER = [PageType.Profile, PageType.Song, PageType.Album, PageType.Event];
                const byType = (a: Page, b: Page) => TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type);
                const live  = pages!.filter(p => p.isPublished).sort(byType);
                const draft = pages!.filter(p => !p.isPublished).sort(byType);
                return (
                  <div className="space-y-4">
                    {live.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-2 h-2 rounded-full bg-success-500 shrink-0" />
                          <p className="text-xs font-semibold uppercase tracking-wider text-default-500">Live</p>
                          <span className="text-xs text-default-400">({live.length})</span>
                        </div>
                        <div className="divide-y divide-default-100">
                          {live.map(page => (
                            <RecentPageRow key={page.id} page={page} userName={userInfo?.userName ?? ""} linkCount={linksByPage.get(page.id) ?? 0} />
                          ))}
                        </div>
                      </div>
                    )}
                    {draft.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-2 h-2 rounded-full bg-warning-400 shrink-0" />
                          <p className="text-xs font-semibold uppercase tracking-wider text-default-500">Drafts</p>
                          <span className="text-xs text-default-400">({draft.length})</span>
                        </div>
                        <div className="divide-y divide-default-100">
                          {draft.map(page => (
                            <RecentPageRow key={page.id} page={page} userName={userInfo?.userName ?? ""} linkCount={linksByPage.get(page.id) ?? 0} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </CardBody>
          </Card>

          {/* Right column */}
          <div className="flex flex-col gap-4">

            {/* Button breakdown */}
            <Card className="border border-default-200 shadow-none">
              <CardBody className="p-5 space-y-4">
                <p className="font-bold text-sm text-default-600 uppercase tracking-wider">Button Breakdown</p>

                {loading ? (
                  <div className="space-y-3 animate-pulse">
                    <div className="h-3 bg-default-100 rounded w-full" />
                    <div className="h-3 bg-default-100 rounded w-3/4" />
                  </div>
                ) : totalLinks === 0 ? (
                  <p className="text-xs text-default-400">No buttons added yet.</p>
                ) : (
                  <div className="space-y-3">
                    {/* Streaming vs Standard */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-default-600">Streaming</span>
                        <span className="font-semibold">{streamLinks}</span>
                      </div>
                      <MiniBar value={streamLinks} max={totalLinks} color="#452bc5" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-default-600">Standard</span>
                        <span className="font-semibold">{defaultLinks}</span>
                      </div>
                      <MiniBar value={defaultLinks} max={totalLinks} color="#7828c8" />
                    </div>

                    {/* Platform split */}
                    {streamLinks > 0 && (
                      <>
                        <div className="border-t border-default-100 pt-3 space-y-2">
                          <p className="text-xs text-default-400 font-medium">Streaming Platforms</p>
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1.5">
                              <FaSpotify color="#1DB954" />
                              <span>Spotify</span>
                            </div>
                            <span className="font-semibold">{spotifyCount}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1.5">
                              <SiApplemusic color="#fc3c44" />
                              <span>Apple Music</span>
                            </div>
                            <span className="font-semibold">{appleMusicCount}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </CardBody>
            </Card>

            {/* Page type distribution */}
            {!loading && byType.length > 0 && (
              <Card className="border border-default-200 shadow-none">
                <CardBody className="p-5 space-y-3">
                  <p className="font-bold text-sm text-default-600 uppercase tracking-wider">Pages by Type</p>
                  {byType.map(({ type, count }) => (
                    <div key={type} className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-default-600">{type}</span>
                        <span className="font-semibold">{count}</span>
                      </div>
                      <MiniBar value={count} max={totalPages} color="hsl(var(--nextui-primary))" />
                    </div>
                  ))}
                </CardBody>
              </Card>
            )}

            {/* Needs attention */}
            {!loading && needsAttention.length > 0 && (
              <Card className="border border-warning-200 bg-warning-50 shadow-none">
                <CardBody className="p-4 space-y-2">
                  <p className="font-bold text-sm text-warning-700 uppercase tracking-wider">Needs Attention</p>
                  <p className="text-xs text-warning-600">
                    {needsAttention.length} live page{needsAttention.length > 1 ? "s" : ""} with no buttons.
                  </p>
                  <div className="space-y-1">
                    {needsAttention.slice(0, 3).map(p => (
                      <button
                        key={p.id}
                        className="w-full text-left text-xs text-warning-700 font-medium hover:underline truncate block"
                        onClick={() => navigate(routes.pages.page.index.replace(":id", p.id.toString()))}
                      >
                        → {p.name}
                      </button>
                    ))}
                  </div>
                </CardBody>
              </Card>
            )}

          </div>
        </div>

        {/* Coming soon */}
        <div className="space-y-3">
          <p className="font-bold text-sm text-default-600 uppercase tracking-wider">Coming Soon</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <ComingSoonCard icon={<FaChartBar />} title="Analytics"
              description="Track link clicks, page views, and visitor insights."
              iconBg="bg-primary-100" iconColor="text-primary" />
            <ComingSoonCard icon={<FaQrcode />} title="QR Codes"
              description="Auto-generated QR codes for every page you publish."
              iconBg="bg-secondary-100" iconColor="text-secondary-600" />
            <ComingSoonCard icon={<FaMagic />} title="Custom Domain"
              description="Connect your own domain to your profile page."
              iconBg="bg-success-100" iconColor="text-success-600" />
            <ComingSoonCard icon={<FaBell />} title="Notifications"
              description="Get notified when fans visit or click your links."
              iconBg="bg-warning-100" iconColor="text-warning-600" />
          </div>
        </div>

        {/* CTA */}
        <Card className="border border-default-200 shadow-none bg-default-50">
          <CardBody className="flex flex-row items-center justify-between gap-4 p-5 flex-wrap">
            <div>
              <p className="font-semibold">Ready to grow your audience?</p>
              <p className="text-sm text-default-500 mt-0.5">Create a new page and start sharing your music.</p>
            </div>
            <button
              className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity shrink-0"
              onClick={() => navigate(routes.pages.index)}
            >
              Manage Pages
            </button>
          </CardBody>
        </Card>

      </div>
    </BasePageLayout>
  );
}

export default HomePage;
