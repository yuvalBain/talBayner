import { LeadForm } from "@/components/forms/lead-form";
import { cn } from "@/lib/cn";
import { forwardRef, type HTMLAttributes } from "react";

type ContactUsProps = HTMLAttributes<HTMLDivElement>;

const ContactUs = forwardRef<HTMLDivElement, ContactUsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div>
        <div
          ref={ref}
          className={cn("mx-auto max-w-6xl px-4 py-12", className)}
          {...props}
        >
          <h1 className="text-3xl font-semibold text-foreground">צור קשר</h1>

          <LeadForm />
        </div>
      </div>
    );
  }
);

export { ContactUs, type ContactUsProps };