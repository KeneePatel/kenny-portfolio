import type { ContactCopy, FooterCopy } from "./types"

/* Contact and footer copy, from the art-direction canvas. */
export const contact: ContactCopy = {
  label: "Contact · the noise is gone",
  title: { filled: "Have something interesting to", outlined: "build?" },
  copy: {
    idle: "Copy",
    done: "Copied ✓",
    failed: "Couldn’t copy",
    announceDone: "Email address copied.",
    announceFailed: "Couldn’t copy the email address. Select it instead.",
  },
  live: { before: "It’s", after: "in Halifax right now." },
}

export const footer: FooterCopy = {
  place: "Halifax, Nova Scotia",
  copyright: "© 2026",
  backToTop: "Back to top ↑",
}
