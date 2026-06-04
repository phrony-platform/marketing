'use client';

import type { LucideIcon } from 'lucide-react';
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

export type Accent = 'violet' | 'sky' | 'emerald' | 'amber';

export type CodePanelLine = {
  n: number;
  indent?: number;
  node?: ReactNode;
  /** Empty row height multiplier (e.g. 1 = one line, 1.5 = extra breathing room between blocks). */
  spacer?: number;
};

export const accentStyles: Record<
  Accent,
  { chip: string; icon: string; line: string; dot: string }
> = {
  violet: {
    chip: 'border-violet-500/30 bg-violet-500/10 shadow-[0_0_24px_-4px_rgba(139,92,246,0.25)]',
    icon: 'text-violet-600 dark:text-violet-300',
    line: 'bg-violet-500/10 border-violet-500/25 dark:bg-violet-500/12',
    dot: 'bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.5)] dark:bg-violet-400',
  },
  sky: {
    chip: 'border-sky-500/30 bg-sky-500/10 shadow-[0_0_24px_-4px_rgba(56,189,248,0.2)]',
    icon: 'text-sky-600 dark:text-sky-300',
    line: 'bg-sky-500/10 border-sky-500/25 dark:bg-sky-500/12',
    dot: 'bg-sky-500 shadow-[0_0_8px_rgba(56,189,248,0.5)] dark:bg-sky-400',
  },
  emerald: {
    chip: 'border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_24px_-4px_rgba(52,211,153,0.2)]',
    icon: 'text-emerald-600 dark:text-emerald-300',
    line: 'bg-emerald-500/10 border-emerald-500/25 dark:bg-emerald-500/12',
    dot: 'bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.5)] dark:bg-emerald-400',
  },
  amber: {
    chip: 'border-amber-500/30 bg-amber-500/10 shadow-[0_0_24px_-4px_rgba(251,191,36,0.2)]',
    icon: 'text-amber-600 dark:text-amber-300',
    line: 'bg-amber-500/10 border-amber-500/25 dark:bg-amber-500/12',
    dot: 'bg-amber-500 shadow-[0_0_8px_rgba(251,191,36,0.45)] dark:bg-amber-400',
  },
};

export type IllustrationTone = 'default' | 'subtle' | 'manifest';

export type CodePanelHighlightMode = 'block' | 'rows';

export const accentStylesSubtle: Record<
  Accent,
  { chip: string; icon: string; line: string; dot: string }
> = {
  violet: {
    chip: 'border-border bg-background shadow-none',
    icon: 'text-muted-foreground',
    line: 'border border-border/80 border-l-2 border-l-violet-600/40 bg-muted/25',
    dot: 'bg-muted-foreground/40',
  },
  sky: {
    chip: 'border-border bg-background shadow-none',
    icon: 'text-muted-foreground',
    line: 'border border-border/80 border-l-2 border-l-sky-600/40 bg-muted/25',
    dot: 'bg-muted-foreground/40',
  },
  emerald: {
    chip: 'border-border bg-background shadow-none',
    icon: 'text-muted-foreground',
    line: 'border border-border/80 border-l-2 border-l-emerald-600/40 bg-muted/25',
    dot: 'bg-muted-foreground/40',
  },
  amber: {
    chip: 'border-border bg-background shadow-none',
    icon: 'text-muted-foreground',
    line: 'border border-border/80 border-l-2 border-l-amber-600/40 bg-muted/25',
    dot: 'bg-muted-foreground/40',
  },
};

/** Neutral highlight for manifest editor rows — no accent color. */
export const accentStylesManifest: Record<
  Accent,
  { chip: string; icon: string; line: string; dot: string }
> = {
  violet: {
    chip: 'border-border bg-background',
    icon: 'text-muted-foreground',
    line: 'bg-muted/35',
    dot: 'bg-muted-foreground/40',
  },
  sky: {
    chip: 'border-border bg-background',
    icon: 'text-muted-foreground',
    line: 'bg-muted/35',
    dot: 'bg-muted-foreground/40',
  },
  emerald: {
    chip: 'border-border bg-background',
    icon: 'text-muted-foreground',
    line: 'bg-muted/35',
    dot: 'bg-muted-foreground/40',
  },
  amber: {
    chip: 'border-border bg-background',
    icon: 'text-muted-foreground',
    line: 'bg-muted/35',
    dot: 'bg-muted-foreground/40',
  },
};

export function resolveAccentStyles(tone: IllustrationTone = 'default') {
  if (tone === 'manifest') {
    return accentStylesManifest;
  }
  if (tone === 'subtle') {
    return accentStylesSubtle;
  }
  return accentStyles;
}

export const YAML_LINE_HEIGHT = 27;
export const YAML_LINE_GAP = 1;
export const YAML_INDENT_PX = 16;

export type CodePanelSize = 'compact' | 'default' | 'lg';

export type CodePanelMetrics = {
  lineHeight: number;
  lineGap: number;
  indentPx: number;
  rowClass: string;
  lineNumClass: string;
  codeClass: string;
  gutterClass: string;
  gapClass: string;
};

export const codePanelSizes: Record<CodePanelSize, CodePanelMetrics> = {
  compact: {
    lineHeight: 20,
    lineGap: 1,
    indentPx: 12,
    rowClass: 'h-5',
    lineNumClass: 'text-[10px]',
    codeClass: 'text-[10px] leading-none',
    gutterClass: 'grid-cols-[1.75rem_minmax(0,1fr)]',
    gapClass: 'gap-1.5',
  },
  default: {
    lineHeight: YAML_LINE_HEIGHT,
    lineGap: YAML_LINE_GAP,
    indentPx: YAML_INDENT_PX,
    rowClass: 'h-[27px]',
    lineNumClass: 'text-[11px] sm:text-xs',
    codeClass: 'text-xs leading-none sm:text-[13px]',
    gutterClass: 'grid-cols-[2.25rem_minmax(0,1fr)] sm:grid-cols-[2.5rem_minmax(0,1fr)]',
    gapClass: 'gap-2.5 sm:gap-3',
  },
  lg: {
    lineHeight: 40,
    lineGap: 2,
    indentPx: 22,
    rowClass: 'h-[40px]',
    lineNumClass: 'text-sm sm:text-base',
    codeClass: 'text-base leading-none sm:text-lg md:text-xl',
    gutterClass: 'grid-cols-[2.75rem_minmax(0,1fr)] sm:grid-cols-[3.25rem_minmax(0,1fr)]',
    gapClass: 'gap-3 sm:gap-4',
  },
};

export function YamlKey({ children }: { children: ReactNode }) {
  return <span className="text-sky-700 dark:text-sky-300">{children}</span>;
}

export function YamlStr({ children }: { children: ReactNode }) {
  return <span className="text-emerald-700 dark:text-emerald-300">{children}</span>;
}

export function YamlNum({ children }: { children: ReactNode }) {
  return <span className="text-amber-700 dark:text-amber-200">{children}</span>;
}

/** Restrained syntax tokens for manifest editor illustrations. */
export function YamlKeyManifest({ children }: { children: ReactNode }) {
  return <span className="text-muted-foreground">{children}</span>;
}

export function YamlStrManifest({ children }: { children: ReactNode }) {
  return <span className="text-foreground">{children}</span>;
}

export function YamlNumManifest({ children }: { children: ReactNode }) {
  return <span className="text-foreground/90">{children}</span>;
}

/** Muted emphasis for highlighted values in deploy / run step illustrations. */
export function StepHighlight({ children }: { children: ReactNode }) {
  return <span className="text-muted-foreground">{children}</span>;
}

export function CodeMuted({ children }: { children: ReactNode }) {
  return <span className="text-muted-foreground">{children}</span>;
}

export function CodePrompt({ children }: { children: ReactNode }) {
  return <span className="text-muted-foreground/80">{children}</span>;
}

export function CodeFn({ children }: { children: ReactNode }) {
  return <span className="text-violet-700 dark:text-violet-300">{children}</span>;
}

function getLineHeight(
  line: CodePanelLine,
  metrics: Pick<CodePanelMetrics, 'lineHeight'>,
) {
  if (line.spacer != null) {
    return metrics.lineHeight * line.spacer;
  }

  return metrics.lineHeight;
}

export function getHighlightBounds(
  lines: readonly CodePanelLine[],
  highlightNums: readonly number[],
  metrics: Pick<CodePanelMetrics, 'lineHeight' | 'lineGap'> = codePanelSizes.default,
) {
  const firstIdx = lines.findIndex((line) => line.n === highlightNums[0]);
  const lastIdx = lines.findIndex((line) => line.n === highlightNums[highlightNums.length - 1]);
  let top = 0;

  for (let index = 0; index < firstIdx; index += 1) {
    top += getLineHeight(lines[index], metrics) + metrics.lineGap;
  }

  let height = 0;
  for (let index = firstIdx; index <= lastIdx; index += 1) {
    height += getLineHeight(lines[index], metrics);
    if (index < lastIdx) {
      height += metrics.lineGap;
    }
  }

  return { top, height, center: top + height / 2 };
}

export function resolveHighlightInset(
  size: CodePanelSize,
  showLineNumbers: boolean,
  override?: { left?: number; right?: number },
) {
  if (override) {
    return { left: override.left ?? 0, right: override.right ?? 0 };
  }

  if (showLineNumbers) {
    if (size === 'lg') {
      return { left: 68, right: 12 };
    }
    if (size === 'compact') {
      return { left: 40, right: 4 };
    }
    return { left: 52, right: 8 };
  }

  if (size === 'lg') {
    return { left: -8, right: 56 };
  }
  if (size === 'compact') {
    return { left: -4, right: 28 };
  }
  return { left: -4, right: 40 };
}

type CodePanelChipConfig = {
  label: string;
  icon: LucideIcon;
  accent: Accent;
};

function CodePanelChip({
  chip,
  highlightBounds,
  placement = 'center',
  tone = 'default',
}: {
  chip: CodePanelChipConfig;
  highlightBounds: { top: number; height: number; center: number };
  placement?: 'center' | 'above';
  tone?: IllustrationTone;
}) {
  const styles = resolveAccentStyles(tone)[chip.accent];
  const Icon = chip.icon;
  const top = placement === 'center' ? highlightBounds.center : highlightBounds.top;
  const subtle = tone === 'subtle';

  return (
    <div
      className={cn(
        'absolute right-1 z-10 flex items-center gap-1.5 rounded-sm border bg-background px-2 py-1 whitespace-nowrap sm:right-2 sm:gap-2 sm:px-2.5 sm:py-1.5',
        subtle ? 'border-border' : 'rounded-md border bg-background/95 backdrop-blur-sm',
        !subtle && styles.chip,
        subtle && styles.chip,
      )}
      style={{
        top,
        transform: placement === 'center' ? 'translateY(-50%)' : 'translateY(calc(-100% - 6px))',
      }}
    >
      <span
        className={cn(
          'flex size-6 items-center justify-center rounded-sm border border-border bg-muted/40 sm:size-7',
          styles.icon,
        )}
      >
        <Icon className="size-3.5" strokeWidth={1.75} aria-hidden />
      </span>
      <span
        className={cn(
          'font-mono font-medium uppercase text-foreground',
          subtle ? 'text-[10px] tracking-[0.12em] sm:text-[11px]' : 'text-xs tracking-[0.14em] sm:text-sm',
        )}
      >
        {chip.label}
      </span>
      {!subtle ? <span className={cn('size-1.5 shrink-0 rounded-full', styles.dot)} aria-hidden /> : null}
    </div>
  );
}

function resolveLineDimClass({
  lineNum,
  highlighted,
  dimOthers,
  focusViewport,
  firstHighlight,
  lastHighlight,
  dimOpacity,
}: {
  lineNum: number;
  highlighted: boolean;
  dimOthers: boolean;
  focusViewport: boolean;
  firstHighlight: number;
  lastHighlight: number;
  dimOpacity: string;
}) {
  if (!dimOthers || highlighted) {
    return null;
  }

  if (focusViewport) {
    if (lineNum < firstHighlight) {
      return 'opacity-20';
    }
    if (lineNum > lastHighlight) {
      return 'opacity-30';
    }
  }

  return dimOpacity;
}

export function CodePanelIllustration({
  lines,
  highlightLines,
  chip,
  dimOthers = true,
  nowrap = false,
  chipPlacement = 'center',
  showLineNumbers = true,
  size = 'default',
  highlightInset,
  tone = 'default',
  highlightMode = 'block',
  focusViewport = false,
  className,
}: {
  lines: readonly CodePanelLine[];
  highlightLines: readonly number[];
  chip?: CodePanelChipConfig;
  dimOthers?: boolean;
  nowrap?: boolean;
  chipPlacement?: 'center' | 'above';
  showLineNumbers?: boolean;
  size?: CodePanelSize;
  highlightInset?: { left?: number; right?: number };
  tone?: IllustrationTone;
  highlightMode?: CodePanelHighlightMode;
  /** Clip to container height and vertically center the highlighted block with edge fades. */
  focusViewport?: boolean;
  className?: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [focusOffset, setFocusOffset] = useState(0);
  const metrics = codePanelSizes[size];
  const highlightSet = new Set<number>(highlightLines);
  const firstHighlight = highlightLines[0]!;
  const lastHighlight = highlightLines[highlightLines.length - 1]!;
  const highlightBounds = getHighlightBounds(lines, highlightLines, metrics);
  const highlightPadding = resolveHighlightInset(size, showLineNumbers, highlightInset);
  const isManifest = tone === 'manifest';
  const rowHighlight = highlightMode === 'rows';
  const styles =
    chip && !rowHighlight ? resolveAccentStyles(tone)[chip.accent] : rowHighlight ? resolveAccentStyles(tone).emerald : null;
  const dimOpacity = isManifest ? 'opacity-40' : 'opacity-55';
  const rowHighlightClass = isManifest ? 'bg-muted/40' : 'bg-muted/35';
  const panelHeight = lines.reduce((total, line, index) => {
    total += getLineHeight(line, metrics);
    if (index < lines.length - 1) {
      total += metrics.lineGap;
    }
    return total;
  }, 0);

  useLayoutEffect(() => {
    if (!focusViewport) {
      return;
    }

    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const updateOffset = () => {
      setFocusOffset(viewport.clientHeight / 2 - highlightBounds.center);
    };

    updateOffset();
    const observer = new ResizeObserver(updateOffset);
    observer.observe(viewport);

    return () => observer.disconnect();
  }, [focusViewport, highlightBounds.center, panelHeight]);

  const codePanel = (
    <div className="relative" style={{ minHeight: panelHeight }}>
      {chip ? (
        <CodePanelChip
          chip={chip}
          highlightBounds={highlightBounds}
          placement={chipPlacement}
          tone={tone}
        />
      ) : null}

      {styles && !rowHighlight ? (
        <div
          className={cn('pointer-events-none absolute rounded-sm', styles.line)}
          style={{
            top: highlightBounds.top,
            height: highlightBounds.height,
            left: highlightPadding.left,
            right: highlightPadding.right,
          }}
        />
      ) : null}

      <div className="relative grid" style={{ rowGap: metrics.lineGap }}>
        {lines.map((line) => {
          const { n, indent = 0, node, spacer } = line;
          const rowHeight = getLineHeight(line, metrics);
          const highlighted = highlightSet.has(n);

          if (spacer != null) {
            return <div key={n} aria-hidden style={{ height: rowHeight }} />;
          }

          return (
            <div
              key={n}
              className={cn(
                'grid items-center',
                metrics.gapClass,
                metrics.rowClass,
                showLineNumbers ? metrics.gutterClass : 'grid-cols-1',
                rowHighlight && highlighted && rowHighlightClass,
                resolveLineDimClass({
                  lineNum: n,
                  highlighted,
                  dimOthers,
                  focusViewport,
                  firstHighlight,
                  lastHighlight,
                  dimOpacity,
                }),
              )}
              style={{ height: rowHeight }}
            >
              {showLineNumbers ? (
                <span
                  className={cn(
                    'select-none text-right font-mono tabular-nums text-muted-foreground/70',
                    metrics.lineNumClass,
                    isManifest && 'border-r border-border/60 pr-3 sm:pr-4',
                    rowHighlight && highlighted && 'text-muted-foreground',
                  )}
                >
                  {n}
                </span>
              ) : null}
              <div
                className={cn(
                  'min-w-0 font-mono text-foreground',
                  metrics.codeClass,
                  nowrap ? 'whitespace-nowrap' : 'break-all',
                  isManifest && 'tracking-tight',
                )}
                style={{ paddingLeft: indent * metrics.indentPx }}
              >
                {node}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div
      className={cn('relative min-w-0 text-left', focusViewport && 'h-full min-h-0', className)}
      aria-hidden
    >
      {focusViewport ? (
        <div ref={viewportRef} className="relative h-full min-h-0 overflow-hidden">
          <div
            className="relative will-change-transform"
            style={{ transform: `translateY(${focusOffset}px)` }}
          >
            {codePanel}
          </div>
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[min(32%,8rem)] bg-gradient-to-b from-background via-background/90 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[min(28%,7rem)] bg-gradient-to-b from-transparent via-background/85 to-background"
            aria-hidden
          />
        </div>
      ) : (
        codePanel
      )}
    </div>
  );
}

export function AnimatedCodePanelIllustration({
  lines,
  highlightLines,
  chip,
  dimOthers = true,
  chipPlacement = 'center',
  className,
  highlightKey,
}: {
  lines: readonly CodePanelLine[];
  highlightLines: readonly number[];
  chip?: CodePanelChipConfig;
  dimOthers?: boolean;
  chipPlacement?: 'center' | 'above';
  className?: string;
  highlightKey?: string;
}) {
  const highlightSet = new Set<number>(highlightLines);
  const highlightBounds = getHighlightBounds(lines, highlightLines);
  const styles = chip ? accentStyles[chip.accent] : null;
  const ChipIcon = chip?.icon;

  const panelHeight = lines.length * YAML_LINE_HEIGHT + (lines.length - 1) * YAML_LINE_GAP;

  return (
    <div className={cn('relative min-w-0 overflow-hidden text-left', className)} aria-hidden>
      <div className="relative overflow-hidden" style={{ minHeight: panelHeight }}>
        {chip && ChipIcon && styles ? (
          <motion.div
            className={cn(
              'absolute right-1 z-10 flex items-center gap-1.5 rounded-md border bg-background/95 px-2 py-1 whitespace-nowrap backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300 sm:right-2 sm:gap-2 sm:px-2.5 sm:py-1.5',
              styles.chip,
            )}
            animate={{
              top: chipPlacement === 'center' ? highlightBounds.center : highlightBounds.top,
              y: chipPlacement === 'center' ? '-50%' : 'calc(-100% - 6px)',
            }}
            transition={{ type: 'spring', stiffness: 420, damping: 34, mass: 0.75 }}
          >
            <span
              className={cn(
                'flex size-6 items-center justify-center rounded-sm border border-border bg-muted/60 sm:size-7',
                styles.icon,
              )}
            >
              <ChipIcon className="size-4" strokeWidth={1.75} aria-hidden />
            </span>
            <span className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-foreground sm:text-sm">
              {chip.label}
            </span>
            <span className={cn('size-1.5 shrink-0 rounded-full', styles.dot)} aria-hidden />
          </motion.div>
        ) : null}

        {styles ? (
          <motion.div
            key={highlightKey ?? highlightLines.join('-')}
            className={cn('pointer-events-none absolute rounded-sm border', styles.line)}
            initial={false}
            animate={{
              top: highlightBounds.top,
              height: highlightBounds.height,
              ...resolveHighlightInset('default', true),
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        ) : null}

        <div className="relative grid overflow-hidden" style={{ rowGap: YAML_LINE_GAP }}>
          {lines.map(({ n, indent = 0, node }) => {
            const highlighted = highlightSet.has(n);
            return (
              <div
                key={n}
                className={cn(
                  'grid h-[27px] grid-cols-[2.25rem_minmax(0,1fr)] items-center gap-2.5 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-3',
                  dimOthers && (highlighted ? 'opacity-100' : 'opacity-55'),
                )}
              >
                <span className="select-none text-right font-mono text-[11px] tabular-nums text-muted-foreground sm:text-xs">
                  {n}
                </span>
                <div
                  className="min-w-0 overflow-hidden font-mono text-xs leading-none text-foreground sm:text-[13px]"
                  style={{ paddingLeft: indent * YAML_INDENT_PX }}
                >
                  {node}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
