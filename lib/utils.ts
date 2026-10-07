import { createCn } from "cn/config"

/**
 * cn() that knows our theme scales, so `text-label` merges as a font size
 * (not a colour) and `px-page` / `gap-gutter` as spacing.
 * Keep these lists in sync with the @theme blocks in app/globals.css.
 * Generated components in components/ui import cn from here, not from "cn".
 */
export const cn = createCn({
  extend: {
    theme: {
      text: [
        "greeting",
        "numeral",
        "section",
        "project",
        "statement",
        "menu",
        "list",
        "body",
        "data",
        "label",
        "name",
        "layer",
        "tool",
        "year",
        "degree",
        "contact",
        "case",
        "key",
        "lead",
      ],
      spacing: ["page", "gutter"],
      blur: ["pill", "menu"],
    },
  },
})
