import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

// `layers`: the Toolkit's giant-word disclosure rows (no chevrons, rules between rows).
const accordionVariants = cva("flex w-full flex-col", {
  variants: {
    variant: {
      default: "overflow-hidden rounded-2xl border",
      layers: "border-t border-foreground",
    },
  },
  defaultVariants: { variant: "default" },
})

const accordionItemVariants = cva("", {
  variants: {
    variant: {
      default: "not-last:border-b data-open:bg-muted/50",
      layers: "border-b",
    },
  },
  defaultVariants: { variant: "default" },
})

const accordionTriggerVariants = cva(
  "group/accordion-trigger relative flex flex-1 text-left transition-all outline-none aria-disabled:pointer-events-none aria-disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "items-start justify-between gap-6 border border-transparent p-4 text-sm font-medium hover:underline **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
        // transition-none: `transition-all` would animate the focus ring's offset in.
        layers: "focus-ring flex-wrap items-baseline gap-x-4 gap-y-2 py-4.5 transition-none md:gap-x-6",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

const accordionPanelVariants = cva(
  "overflow-hidden data-open:animate-accordion-down data-closed:animate-accordion-up",
  {
    variants: {
      variant: {
        default: "px-4 text-sm",
        layers: "",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

function Accordion({
  className,
  variant,
  ...props
}: AccordionPrimitive.Root.Props & VariantProps<typeof accordionVariants>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn(accordionVariants({ variant }), className)}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  variant,
  ...props
}: AccordionPrimitive.Item.Props & VariantProps<typeof accordionItemVariants>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(accordionItemVariants({ variant }), className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  variant = "default",
  ...props
}: AccordionPrimitive.Trigger.Props & VariantProps<typeof accordionTriggerVariants>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(accordionTriggerVariants({ variant }), className)}
        {...props}
      >
        {children}
        {variant === "default" ? (
          <>
            <ChevronDownIcon data-slot="accordion-trigger-icon" className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden" />
            <ChevronUpIcon data-slot="accordion-trigger-icon" className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline" />
          </>
        ) : null}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

const accordionBodyVariants = cva(
  "h-(--accordion-panel-height) data-ending-style:h-0 data-starting-style:h-0",
  {
    variants: {
      variant: {
        default:
          "pt-0 pb-4 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
        // The layer body lays out its own spacing.
        layers: "",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

function AccordionContent({
  className,
  children,
  variant,
  ...props
}: AccordionPrimitive.Panel.Props & VariantProps<typeof accordionPanelVariants>) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className={accordionPanelVariants({ variant })}
      {...props}
    >
      <div className={cn(accordionBodyVariants({ variant }), className)}>
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
