import { formatRealmLevel } from "./realms";
import { RARITY_COLORS } from "./flames";
import type { ScanResult } from "./types";
import { ATTRIBUTE_META } from "./utils";

/**
 * Client-side share helpers for a scan result: a plain-text reading, a
 * deep-link that reproduces the destiny, and a branded PNG "trading card"
 * rendered with the Canvas 2D API (no extra dependencies).
 */

/** Plain-text summary suitable for clipboards and share sheets. */
export function buildReadingText(r: ScanResult): string {
  const lines = [
    "⚔️ Dou Qi Realm Scanner — Battle Through the Heavens",
    `Cultivator: ${r.name}`,
    `Realm: ${r.realm.name} ${formatRealmLevel(r.realmIndex, r.level)}`.trim(),
    `Attribute: ${r.attribute} · Soul Realm: ${r.soulRealm}`,
    `Talent: ${r.talent}/100 · Potential: ${r.potential}`,
  ];
  if (r.flames.length) {
    lines.push(
      `Heavenly Flame${r.flames.length > 1 ? "s" : ""}: ` +
        r.flames
          .map((f) => `${f.name} (Rank #${f.rank}, ${f.rarity})`)
          .join(" + "),
    );
  }
  if (r.isXiaoYanDestiny) lines.push("Title: Destined Successor of Xiao Yan");
  return lines.join("\n");
}

/**
 * A shareable URL that reproduces this destiny. Because the scan is
 * deterministic per name, the recipient sees the exact same result.
 */
export function buildShareUrl(r: ScanResult): string {
  const origin =
    typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}/?name=${encodeURIComponent(r.name)}#scanner`;
}

/** A filesystem-friendly file name for the downloaded card. */
export function shareFileName(r: ScanResult): string {
  const slug =
    r.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "cultivator";
  return `dou-qi-scan-${slug}.png`;
}

const DISPLAY_FONT = "Cinzel, Georgia, serif";
const BODY_FONT = "Inter, system-ui, sans-serif";
const CJK_FONT = "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', serif";

/** Best-effort: wait for the custom fonts so canvas text matches the site. */
async function ensureFonts(): Promise<void> {
  try {
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (!fonts) return;
    await Promise.all([
      fonts.load("900 96px Cinzel"),
      fonts.load("700 40px Cinzel"),
      fonts.load("600 26px Inter"),
      fonts.load("400 30px Inter"),
      fonts.load("italic 400 30px Inter"),
    ]).catch(() => undefined);
    await fonts.ready;
  } catch {
    /* fall back to generic families in the font strings */
  }
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const attempt = line ? `${line} ${word}` : word;
    if (ctx.measureText(attempt).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = attempt;
    }
  }
  if (line) lines.push(line);
  return lines;
}

const W = 1080;
const PAD = 72;
const CONTENT_W = W - PAD * 2;
const GAP = 44;
const FATE_PAD = 34;
const FATE_LINE = 44;
const FLAME_H = 316;

/**
 * Render the result to an offscreen canvas. Height is computed from the
 * content so nothing is ever clipped, whatever the destiny.
 */
export async function renderShareCard(
  result: ScanResult,
): Promise<HTMLCanvasElement> {
  await ensureFonts();

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = 100; // temporary; resized after measuring.
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");

  // --- Measure the variable-height sections -----------------------------
  ctx.font = `italic 400 30px ${BODY_FONT}`;
  const fateLines = wrapText(ctx, result.fate, CONTENT_W - FATE_PAD * 2);
  const fateH = FATE_PAD * 2 + 30 + 18 + fateLines.length * FATE_LINE;

  const flameHeader = 56;
  let flamesH: number;
  if (result.flames.length === 0) flamesH = 132;
  else flamesH = flameHeader + FLAME_H; // 1 or 2 flames share one row.

  let total = PAD; // top padding
  total += 96 + GAP; // brand
  total += 150 + GAP; // cultivator name
  total += 380 + GAP; // realm ring
  total += 150 + GAP; // info tiles
  total += 120 + GAP; // talent
  total += fateH + GAP; // fate
  if (result.isXiaoYanDestiny) total += 96 + GAP; // destiny badge
  total += flamesH + GAP; // flames
  total += 96; // footer
  total += PAD; // bottom padding

  canvas.height = Math.round(total);

  // --- Background -------------------------------------------------------
  const realmColor = result.realm.color;
  const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
  bg.addColorStop(0, "#0a0a1f");
  bg.addColorStop(1, "#050816");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, canvas.height);

  const glow = ctx.createRadialGradient(
    W / 2,
    140,
    0,
    W / 2,
    140,
    W * 0.9,
  );
  glow.addColorStop(0, `${realmColor}2e`);
  glow.addColorStop(0.5, "#1b144022");
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, canvas.height);

  // Frame
  ctx.strokeStyle = "rgba(255,215,0,0.28)";
  ctx.lineWidth = 2;
  roundRect(ctx, 24, 24, W - 48, canvas.height - 48, 40);
  ctx.stroke();

  // --- Content flow -----------------------------------------------------
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  let y = PAD;

  // Brand
  ctx.fillStyle = "#FFD700";
  ctx.font = `600 26px ${BODY_FONT}`;
  drawTracked(ctx, "BATTLE THROUGH THE HEAVENS", W / 2, y + 26, 6);
  ctx.fillStyle = "#e6e1ff";
  ctx.font = `700 40px ${DISPLAY_FONT}`;
  ctx.fillText("Dou Qi Realm Scanner", W / 2, y + 82);
  y += 96 + GAP;

  // Cultivator name
  ctx.fillStyle = "#8f9bb3";
  ctx.font = `600 26px ${BODY_FONT}`;
  drawTracked(ctx, "CULTIVATOR", W / 2, y + 26, 8);
  ctx.fillStyle = "#ffffff";
  ctx.font = `900 84px ${DISPLAY_FONT}`;
  const nameText = fitText(ctx, result.name, CONTENT_W, 84, 44, DISPLAY_FONT, "900");
  ctx.fillText(nameText.text, W / 2, y + 60 + nameText.size * 0.5);
  y += 150 + GAP;

  // Realm ring
  const ringCx = W / 2;
  const ringR = 150;
  const ringCy = y + ringR;
  const ringGlow = ctx.createRadialGradient(
    ringCx,
    ringCy - 20,
    0,
    ringCx,
    ringCy,
    ringR + 40,
  );
  ringGlow.addColorStop(0, `${realmColor}44`);
  ringGlow.addColorStop(1, "transparent");
  ctx.fillStyle = ringGlow;
  ctx.beginPath();
  ctx.arc(ringCx, ringCy, ringR + 40, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.shadowColor = realmColor;
  ctx.shadowBlur = 50;
  ctx.strokeStyle = realmColor;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(ringCx, ringCy, ringR, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = realmColor;
  ctx.font = `900 120px ${CJK_FONT}`;
  ctx.save();
  ctx.shadowColor = realmColor;
  ctx.shadowBlur = 30;
  ctx.fillText(result.realm.cn, ringCx, ringCy + 26);
  ctx.restore();

  ctx.fillStyle = "#c7cbe0";
  ctx.font = `600 24px ${BODY_FONT}`;
  drawTracked(ctx, result.realm.name.toUpperCase(), ringCx, ringCy + 92, 4);

  const levelText = formatRealmLevel(result.realmIndex, result.level);
  if (levelText) {
    ctx.fillStyle = realmColor;
    ctx.font = `700 34px ${DISPLAY_FONT}`;
    ctx.fillText(levelText, ringCx, y + 300 + 40);
  }
  y += 380 + GAP;

  // Info tiles
  const attr = ATTRIBUTE_META[result.attribute];
  const tileGap = 24;
  const tileW = (CONTENT_W - tileGap * 2) / 3;
  const tileH = 150;
  drawTile(ctx, PAD, y, tileW, tileH, "DOU QI ATTRIBUTE", result.attribute, attr.color);
  drawTile(ctx, PAD + tileW + tileGap, y, tileW, tileH, "SOUL REALM", result.soulRealm, "#38BDF8");
  drawTile(ctx, PAD + (tileW + tileGap) * 2, y, tileW, tileH, "POTENTIAL", result.potential, "#8B5CF6");
  y += 150 + GAP;

  // Talent bar
  ctx.textAlign = "left";
  ctx.fillStyle = "#8f9bb3";
  ctx.font = `600 24px ${BODY_FONT}`;
  drawTracked(ctx, "TALENT RATING", PAD, y + 24, 4, "left");
  ctx.textAlign = "right";
  ctx.fillStyle = "#FFD700";
  ctx.font = `800 40px ${DISPLAY_FONT}`;
  ctx.fillText(`${result.talent}`, PAD + CONTENT_W - 60, y + 34);
  ctx.fillStyle = "#6b7280";
  ctx.font = `600 24px ${BODY_FONT}`;
  ctx.fillText("/100", PAD + CONTENT_W, y + 34);
  ctx.textAlign = "left";

  const barY = y + 62;
  const barH = 22;
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  roundRect(ctx, PAD, barY, CONTENT_W, barH, barH / 2);
  ctx.fill();
  const barW = Math.max((CONTENT_W * result.talent) / 100, barH);
  const barGrad = ctx.createLinearGradient(PAD, 0, PAD + CONTENT_W, 0);
  barGrad.addColorStop(0, "#38bdf8");
  barGrad.addColorStop(0.55, "#8b5cf6");
  barGrad.addColorStop(1, "#ffd700");
  ctx.fillStyle = barGrad;
  roundRect(ctx, PAD, barY, barW, barH, barH / 2);
  ctx.fill();
  y += 120 + GAP;

  // Fate reading
  ctx.fillStyle = "rgba(255,255,255,0.03)";
  roundRect(ctx, PAD, y, CONTENT_W, fateH, 28);
  ctx.fill();
  ctx.fillStyle = "#FFD700";
  ctx.fillRect(PAD, y + 16, 4, fateH - 32);
  ctx.textAlign = "left";
  ctx.fillStyle = "#FFD700";
  ctx.font = `600 24px ${BODY_FONT}`;
  drawTracked(ctx, "FATE READING", PAD + FATE_PAD, y + FATE_PAD + 20, 4, "left");
  ctx.fillStyle = "#cbd2e6";
  ctx.font = `italic 400 30px ${BODY_FONT}`;
  fateLines.forEach((line, i) => {
    ctx.fillText(
      line,
      PAD + FATE_PAD,
      y + FATE_PAD + 20 + 34 + i * FATE_LINE,
    );
  });
  ctx.textAlign = "center";
  y += fateH + GAP;

  // Xiao Yan destiny badge
  if (result.isXiaoYanDestiny) {
    ctx.save();
    const badgeGrad = ctx.createLinearGradient(PAD, y, PAD + CONTENT_W, y);
    badgeGrad.addColorStop(0, "rgba(255,215,0,0.12)");
    badgeGrad.addColorStop(1, "rgba(239,68,68,0.12)");
    ctx.fillStyle = badgeGrad;
    roundRect(ctx, PAD, y, CONTENT_W, 96, 24);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,215,0,0.5)";
    ctx.lineWidth = 1.5;
    roundRect(ctx, PAD, y, CONTENT_W, 96, 24);
    ctx.stroke();
    ctx.fillStyle = "#FFD700";
    ctx.font = `700 34px ${DISPLAY_FONT}`;
    ctx.fillText("★ Destined Successor of Xiao Yan ★", W / 2, y + 60);
    ctx.restore();
    y += 96 + GAP;
  }

  // Heavenly flames
  ctx.fillStyle = "#FFD700";
  ctx.font = `600 26px ${BODY_FONT}`;
  const flameTitle =
    result.flames.length === 0
      ? "NO HEAVENLY FLAME"
      : result.isDualFlame
        ? "DUAL HEAVENLY FLAME FUSION"
        : "HEAVENLY FLAME OBTAINED";
  drawTracked(ctx, flameTitle, W / 2, y + 26, 5);

  if (result.flames.length === 0) {
    ctx.fillStyle = "rgba(255,255,255,0.03)";
    roundRect(ctx, PAD, y + flameHeader, CONTENT_W, 76, 24);
    ctx.fill();
    ctx.fillStyle = "#94a3b8";
    ctx.font = `400 26px ${BODY_FONT}`;
    ctx.fillText(
      "The strongest fires are seized by those who refuse to give up.",
      W / 2,
      y + flameHeader + 48,
    );
  } else {
    const panelY = y + flameHeader;
    if (result.flames.length === 1) {
      drawFlamePanel(ctx, PAD, panelY, CONTENT_W, result.flames[0]!);
    } else {
      const half = (CONTENT_W - tileGap) / 2;
      drawFlamePanel(ctx, PAD, panelY, half, result.flames[0]!);
      drawFlamePanel(ctx, PAD + half + tileGap, panelY, half, result.flames[1]!);
    }
  }
  y += flamesH + GAP;

  // Footer
  ctx.fillStyle = "#6b7280";
  ctx.font = `500 24px ${BODY_FONT}`;
  ctx.textAlign = "center";
  ctx.fillText("Same name, same destiny — the heavens never lie twice.", W / 2, y + 40);

  return canvas;
}

function drawTracked(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  tracking: number,
  align: "center" | "left" = "center",
): void {
  const chars = [...text];
  const widths = chars.map((c) => ctx.measureText(c).width + tracking);
  const total = widths.reduce((a, b) => a + b, 0) - tracking;
  let cursor = align === "center" ? x - total / 2 : x;
  const prevAlign = ctx.textAlign;
  ctx.textAlign = "left";
  chars.forEach((c, i) => {
    ctx.fillText(c, cursor, y);
    cursor += widths[i]!;
  });
  ctx.textAlign = prevAlign;
}

function fitText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxSize: number,
  minSize: number,
  family: string,
  weight: string,
): { text: string; size: number } {
  let size = maxSize;
  while (size > minSize) {
    ctx.font = `${weight} ${size}px ${family}`;
    if (ctx.measureText(text).width <= maxWidth) break;
    size -= 2;
  }
  ctx.font = `${weight} ${size}px ${family}`;
  if (ctx.measureText(text).width <= maxWidth) return { text, size };
  // Still too wide at the minimum size: ellipsize.
  let clipped = text;
  while (clipped.length > 1 && ctx.measureText(`${clipped}…`).width > maxWidth) {
    clipped = clipped.slice(0, -1);
  }
  return { text: `${clipped}…`, size };
}

function drawTile(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  label: string,
  value: string,
  color: string,
): void {
  ctx.fillStyle = "rgba(255,255,255,0.03)";
  roundRect(ctx, x, y, w, h, 24);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  roundRect(ctx, x, y, w, h, 24);
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.fillStyle = color;
  const value1 = fitText(ctx, value, w - 24, 30, 20, DISPLAY_FONT, "700");
  ctx.font = `700 ${value1.size}px ${DISPLAY_FONT}`;
  ctx.fillText(value1.text, x + w / 2, y + h / 2 + 4);

  ctx.fillStyle = "#6b7280";
  ctx.font = `600 18px ${BODY_FONT}`;
  drawTracked(ctx, label, x + w / 2, y + h - 26, 2);
}

function drawFlamePanel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  flame: ScanResult["flames"][number],
): void {
  const color = RARITY_COLORS[flame.rarity];
  ctx.save();
  ctx.fillStyle = "rgba(255,255,255,0.04)";
  roundRect(ctx, x, y, w, FLAME_H, 28);
  ctx.fill();
  ctx.strokeStyle = `${color}66`;
  ctx.lineWidth = 1.5;
  roundRect(ctx, x, y, w, FLAME_H, 28);
  ctx.stroke();

  const pad = 28;
  // rarity badge + rank
  ctx.textAlign = "left";
  ctx.fillStyle = `${color}26`;
  const badge = flame.rarity.toUpperCase();
  ctx.font = `700 18px ${BODY_FONT}`;
  const bw = ctx.measureText(badge).width + 24 + badge.length * 2;
  roundRect(ctx, x + pad, y + pad, bw, 34, 17);
  ctx.fill();
  ctx.fillStyle = color;
  drawTracked(ctx, badge, x + pad + 12, y + pad + 23, 2, "left");
  ctx.textAlign = "right";
  ctx.fillStyle = "#cbd2e6";
  ctx.font = `700 22px ${DISPLAY_FONT}`;
  ctx.fillText(`Rank #${flame.rank}`, x + w - pad, y + pad + 24);

  // flame name
  ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff";
  const name = fitText(ctx, flame.name, w - pad * 2, 30, 20, DISPLAY_FONT, "700");
  ctx.font = `700 ${name.size}px ${DISPLAY_FONT}`;
  ctx.fillText(name.text, x + pad, y + pad + 84);

  // description (clamped to 2 lines, with an ellipsis when truncated)
  ctx.fillStyle = "#94a3b8";
  ctx.font = `400 22px ${BODY_FONT}`;
  const descWidth = w - pad * 2;
  const allDesc = wrapText(ctx, flame.description, descWidth);
  const descLines = allDesc.slice(0, 2);
  if (allDesc.length > 2 && descLines.length === 2) {
    let last = descLines[1]!;
    while (last.length && ctx.measureText(`${last}…`).width > descWidth) {
      last = last.slice(0, -1);
    }
    descLines[1] = `${last.trimEnd()}…`;
  }
  descLines.forEach((line, i) => {
    ctx.fillText(line, x + pad, y + pad + 126 + i * 32);
  });

  // stats
  const statY = y + FLAME_H - 84;
  const statGap = 16;
  const statW = (w - pad * 2 - statGap) / 2;
  drawStat(ctx, x + pad, statY, statW, "POWER LEVEL", flame.powerLevel.toLocaleString("en-US"), color);
  drawStat(ctx, x + pad + statW + statGap, statY, statW, "COMPATIBILITY", `${flame.compatibility}%`, color);
  ctx.restore();
}

function drawStat(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  label: string,
  value: string,
  color: string,
): void {
  ctx.fillStyle = "rgba(255,255,255,0.05)";
  roundRect(ctx, x, y, w, 64, 18);
  ctx.fill();
  ctx.textAlign = "center";
  ctx.fillStyle = color;
  const v = fitText(ctx, value, w - 16, 26, 16, DISPLAY_FONT, "700");
  ctx.font = `700 ${v.size}px ${DISPLAY_FONT}`;
  ctx.fillText(v.text, x + w / 2, y + 30);
  ctx.fillStyle = "#6b7280";
  ctx.font = `600 15px ${BODY_FONT}`;
  drawTracked(ctx, label, x + w / 2, y + 52, 1.5);
  ctx.textAlign = "left";
}

/** Convert a canvas to a PNG blob. */
export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Failed to export image"));
    }, "image/png");
  });
}
