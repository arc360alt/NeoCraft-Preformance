import { useEffect } from "react";
import { createPortal } from "react-dom";
import Btn from "./Btn";
import { playHide, playPop } from "../sound";

export default function Modal({
	title,
	children,
	confirmLabel,
	confirmColor = "red",
	onConfirm,
	onCancel,
	hideCancel = false,
	bannerSrc = "/oreui/res/error.png",
}: {
	title?: string;
	children: React.ReactNode;
	confirmLabel: string;
	confirmColor?: "red" | "green";
	onConfirm: () => void;
	onCancel: () => void;
	hideCancel?: boolean;
	bannerSrc?: string;
}) {
	useEffect(() => {
		playPop();
	}, []);

	const close = () => {
		playHide();
		onCancel();
	};

	// Rendered into document.body: the panels it would otherwise sit inside
	// use CSS `transform` for the slide transition, which creates a new
	// containing block for `position: fixed` descendants — without the
	// portal the mask only covers that panel instead of the whole viewport.
	return createPortal(
		<div className="modal-mask" onClick={close}>
			<div className="modal-box" onClick={(e) => e.stopPropagation()}>
				<img className="modal-banner" src={bannerSrc} alt="" />
				<div className="modal-content">
					{title && (
						<div className="modal-header">
							<h2 className="title">{title}</h2>
						</div>
					)}
					<div className="modal-body">{children}</div>
					<div className="modal-actions">
						{!hideCancel && (
							<Btn className="normal" onClick={close}>
								Cancel
							</Btn>
						)}
						<Btn className={`normal ${confirmColor}`} onClick={onConfirm}>
							{confirmLabel}
						</Btn>
					</div>
				</div>
			</div>
		</div>,
		document.body,
	);
}
