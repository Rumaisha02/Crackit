import React from 'react';
import * as LucideIcons from 'lucide-react';

/**
 * Standardized Icon wrapper for the Neo-Brutalist design system.
 *
 * Context -> Size mapping:
 *   navigation  20px
 *   button      18px
 *   card        22px  (mid-point of 20-24px range)
 *   status      16px
 *
 * strokeWidth is fixed at 2.5 for all contexts (bold neo-brutalist look).
 *
 * Usage:
 *   <Icon name="LayoutDashboard" context="navigation" />
 *   <Icon name="Trash2" context="button" />
 */

const CONTEXT_SIZES = {
  navigation: 20,
  button: 18,
  card: 22,
  status: 16,
};

const DEFAULT_STROKE_WIDTH = 2.5;

export const Icon = ({ name, context = 'button', className = '', style = {} }) => {
  const LucideIcon = LucideIcons[name];

  if (!LucideIcon) {
    console.warn(`[Icon] Unknown lucide icon: "${name}"`);
    return null;
  }

  const size = CONTEXT_SIZES[context] ?? CONTEXT_SIZES.button;

  return (
    <LucideIcon
      size={size}
      strokeWidth={DEFAULT_STROKE_WIDTH}
      className={className}
      style={{ flexShrink: 0, ...style }}
    />
  );
};
