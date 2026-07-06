import type { AccentColor } from './types'

export interface AccentStyle {
  /** Annotation card colors (light + dark) */
  card: string
  /** Ring shown when the card is active */
  ring: string
  /** Translucent highlight applied to active code lines */
  lineBg: string
  /** Left border applied to active code lines */
  lineBorder: string
  /** Small gutter marker / color chip */
  marker: string
  /** currentColor class for SVG connector lines */
  connector: string
}

// Full literal class strings so Tailwind's scanner picks every one up.
export const accentStyles: Record<AccentColor, AccentStyle> = {
  slate: {
    card: 'bg-slate-100 border-slate-400 text-slate-900 dark:bg-slate-400/10 dark:border-slate-500 dark:text-slate-100',
    ring: 'ring-slate-400',
    lineBg: 'bg-slate-400/15',
    lineBorder: 'border-slate-400',
    marker: 'bg-slate-400',
    connector: 'text-slate-500 dark:text-slate-400',
  },
  blue: {
    card: 'bg-blue-50 border-blue-400 text-blue-950 dark:bg-blue-400/10 dark:border-blue-500 dark:text-blue-100',
    ring: 'ring-blue-400',
    lineBg: 'bg-blue-400/15',
    lineBorder: 'border-blue-400',
    marker: 'bg-blue-400',
    connector: 'text-blue-500 dark:text-blue-400',
  },
  sky: {
    card: 'bg-sky-50 border-sky-400 text-sky-950 dark:bg-sky-400/10 dark:border-sky-500 dark:text-sky-100',
    ring: 'ring-sky-400',
    lineBg: 'bg-sky-400/15',
    lineBorder: 'border-sky-400',
    marker: 'bg-sky-400',
    connector: 'text-sky-500 dark:text-sky-400',
  },
  indigo: {
    card: 'bg-indigo-50 border-indigo-400 text-indigo-950 dark:bg-indigo-400/10 dark:border-indigo-500 dark:text-indigo-100',
    ring: 'ring-indigo-400',
    lineBg: 'bg-indigo-400/15',
    lineBorder: 'border-indigo-400',
    marker: 'bg-indigo-400',
    connector: 'text-indigo-500 dark:text-indigo-400',
  },
  green: {
    card: 'bg-green-50 border-green-500 text-green-950 dark:bg-green-400/10 dark:border-green-600 dark:text-green-100',
    ring: 'ring-green-500',
    lineBg: 'bg-green-400/15',
    lineBorder: 'border-green-500',
    marker: 'bg-green-500',
    connector: 'text-green-600 dark:text-green-400',
  },
  teal: {
    card: 'bg-teal-50 border-teal-500 text-teal-950 dark:bg-teal-400/10 dark:border-teal-600 dark:text-teal-100',
    ring: 'ring-teal-500',
    lineBg: 'bg-teal-400/15',
    lineBorder: 'border-teal-500',
    marker: 'bg-teal-500',
    connector: 'text-teal-600 dark:text-teal-400',
  },
  red: {
    card: 'bg-red-50 border-red-400 text-red-950 dark:bg-red-400/10 dark:border-red-500 dark:text-red-100',
    ring: 'ring-red-400',
    lineBg: 'bg-red-400/15',
    lineBorder: 'border-red-400',
    marker: 'bg-red-400',
    connector: 'text-red-500 dark:text-red-400',
  },
  rose: {
    card: 'bg-rose-50 border-rose-400 text-rose-950 dark:bg-rose-400/10 dark:border-rose-500 dark:text-rose-100',
    ring: 'ring-rose-400',
    lineBg: 'bg-rose-400/15',
    lineBorder: 'border-rose-400',
    marker: 'bg-rose-400',
    connector: 'text-rose-500 dark:text-rose-400',
  },
  amber: {
    card: 'bg-amber-50 border-amber-400 text-amber-950 dark:bg-amber-400/10 dark:border-amber-500 dark:text-amber-100',
    ring: 'ring-amber-400',
    lineBg: 'bg-amber-400/15',
    lineBorder: 'border-amber-400',
    marker: 'bg-amber-400',
    connector: 'text-amber-500 dark:text-amber-400',
  },
  orange: {
    card: 'bg-orange-50 border-orange-400 text-orange-950 dark:bg-orange-400/10 dark:border-orange-500 dark:text-orange-100',
    ring: 'ring-orange-400',
    lineBg: 'bg-orange-400/15',
    lineBorder: 'border-orange-400',
    marker: 'bg-orange-400',
    connector: 'text-orange-500 dark:text-orange-400',
  },
  purple: {
    card: 'bg-purple-50 border-purple-400 text-purple-950 dark:bg-purple-400/10 dark:border-purple-500 dark:text-purple-100',
    ring: 'ring-purple-400',
    lineBg: 'bg-purple-400/15',
    lineBorder: 'border-purple-400',
    marker: 'bg-purple-400',
    connector: 'text-purple-500 dark:text-purple-400',
  },
  pink: {
    card: 'bg-pink-50 border-pink-400 text-pink-950 dark:bg-pink-400/10 dark:border-pink-500 dark:text-pink-100',
    ring: 'ring-pink-400',
    lineBg: 'bg-pink-400/15',
    lineBorder: 'border-pink-400',
    marker: 'bg-pink-400',
    connector: 'text-pink-500 dark:text-pink-400',
  },
}
