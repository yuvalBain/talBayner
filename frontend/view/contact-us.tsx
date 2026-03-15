"use client"

import { LeadForm } from "@/components/forms/lead-form";
import { cn } from "@/lib/cn";
import { Modal } from "@/ui/atom/modal";
import { useState , forwardRef, type HTMLAttributes } from "react";

type ContactUsProps = HTMLAttributes<HTMLDivElement>;

const ContactUs = forwardRef<HTMLDivElement, ContactUsProps>(
  ({ className, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <div
          ref={ref}
          className={cn("mx-auto max-w-6xl px-4 py-12", className)}
          {...props}
        >
          <h1 className="text-3xl font-semibold text-foreground">צור קשר</h1>

          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onOpen={() => setIsOpen(true)}
            title="צור קשר"
          >
            <LeadForm />
          </Modal>
        </div>
      </div>
    );
  }
);

export { ContactUs, type ContactUsProps };