import type { ReactNode } from "react";

export default function Panel({
	className,
	innerClassName,
	children,
}: {
	className: string;
	innerClassName?: string;
	children: ReactNode;
}) {
	return (
		<div className={className}>
			<div className={`panel-inner${innerClassName ? ` ${innerClassName}` : ""}`}>{children}</div>
		</div>
	);
}
