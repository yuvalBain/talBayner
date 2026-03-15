"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
	forwardRef,
	useEffect,
	useRef,
	type DialogHTMLAttributes,
	type MouseEvent,
	type MutableRefObject,
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

export interface ModalProps
	extends Omit<
			DialogHTMLAttributes<HTMLDialogElement>,
			"onClose" | "open"
		>,
		VariantProps<typeof modalVariants> {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	title?: string;
}

const Modal = forwardRef<HTMLDialogElement, ModalProps>(
	(
		{
			className,
			size,
			isOpen,
			onClose,
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

		useEffect(() => {
			const dialog = internalRef.current;
			if (!dialog) return;

			if (isOpen) {
				dialog.showModal();
				document.body.style.overflow = "hidden";
			} else {
				dialog.close();
				document.body.style.overflow = "";
			}
		}, [isOpen]);

		const handleBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
			if (e.target === internalRef.current) onClose();
		};

		const handleCloseClick = () => {
			onClose();
		};

		return (
			<dialog
				ref={setRef}
				onClose={onClose}
				onClick={handleBackdropClick}
				className={cn(modalVariants({ size, className }))}
				aria-modal="true"
				aria-labelledby={title ? "modal-title" : undefined}
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
		);
	},
);
Modal.displayName = "Modal";

export { Modal, modalVariants };
