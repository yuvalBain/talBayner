"use client";

import { Button, type ButtonProps } from "@/components/ui/atom/button";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
	cloneElement,
	forwardRef,
	isValidElement,
	useEffect,
	useRef,
	type DialogHTMLAttributes,
	type MouseEvent,
	type MutableRefObject,
	type ReactElement,
	type ReactNode,
} from "react";

const modalVariants = cva(
	"flex flex-col rounded-lg border border-base-default bg-base-primary p-0 shadow-lg backdrop:bg-black/50 backdrop:backdrop-blur-sm open:flex open:flex-col fixed inset-0 m-auto",
	{
		variants: {
			size: {
				default: "[&_[data-modal-content]]:w-[400px] [&_[data-modal-content]]:max-w-[90vw]",
				sm: "[&_[data-modal-content]]:w-[320px] [&_[data-modal-content]]:max-w-[90vw]",
				lg: "[&_[data-modal-content]]:w-[520px] [&_[data-modal-content]]:max-w-[90vw]",
			},
		},
		defaultVariants: {
			size: "default",
		},
	},
);

export type ModalTriggerElement = ReactElement<ButtonProps>;

export interface ModalProps
	extends Omit<
			DialogHTMLAttributes<HTMLDialogElement>,
			"onClose" | "open"
		>,
		VariantProps<typeof modalVariants> {
	isOpen: boolean;
	onClose: () => void;
	trigger?: ModalTriggerElement;
	onOpen?: () => void;
	children: ReactNode;
	title?: string;
}

const DEFAULT_TRIGGER = <Button>click me</Button>;

const Modal = forwardRef<HTMLDialogElement, ModalProps>(
	(
		{
			className,
			size,
			isOpen,
			onClose,
			trigger,
			onOpen,
			children,
			title,
			...props
		},
		ref,
	) => {
		const internalRef = useRef<HTMLDialogElement>(null);

		const setRef = (el: HTMLDialogElement | null) => {
			internalRef.current = el;
			if (typeof ref === "function") ref(el);
			else if (ref) (ref as MutableRefObject<HTMLDialogElement | null>).current = el;
		};

		// Lock body scroll when dialog is open; clear when closed (even if dialog unmounts)
		useEffect(() => {
			if (isOpen) document.body.style.overflow = "hidden";
			else document.body.style.overflow = "";
			return () => {
				document.body.style.overflow = "";
			};
		}, [isOpen]);

		// When dialog mounts (isOpen true), show it
		useEffect(() => {
			if (!isOpen) return;
			const dialog = internalRef.current;
			if (dialog) dialog.showModal();
		}, [isOpen]);

		const handleBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
			if (e.target === internalRef.current) onClose();
		};

		const handleCloseClick = () => {
			onClose();
		};

		const triggerElement =
			onOpen != null
				? (trigger ?? DEFAULT_TRIGGER)
				: null;
		const resolvedTrigger =
			triggerElement != null && isValidElement(triggerElement)
				? cloneElement(triggerElement as ReactElement<ButtonProps>, {
						onClick: (e: MouseEvent<HTMLButtonElement>) => {
							(triggerElement.props as ButtonProps).onClick?.(e);
							onOpen?.();
						},
					})
				: null;

		return (
			<>
				{resolvedTrigger}

				{isOpen && (
					<dialog
						ref={setRef}
						onClose={onClose}
						onClick={handleBackdropClick}
						className={cn(modalVariants({ size, className }))}
						aria-modal
						aria-labelledby={title ? `modal of ${title}` : undefined}
						{...props}
					>
						<div
							data-modal-content
							className="flex flex-col"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="flex items-center justify-between border-b border-base-subtle p-4">
								{title ? (
									<h2
										id="modal-title"
										className="text-lg font-semibold text-base-primary"
									>
										{title}
									</h2>
								) : (
									<span className="flex-1" aria-hidden />
								)}
								<button
									type="button"
									onClick={handleCloseClick}
									className="rounded-full p-1 text-base-secondary transition-colors hover:bg-base-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
									aria-label="סגור"
								>
									<span aria-hidden>×</span>
								</button>
							</div>

							<div className="p-4">{children}</div>

						</div>
					</dialog>
				)}
			</>
		);
	},
);

Modal.displayName = "Modal";

export { Modal, modalVariants };