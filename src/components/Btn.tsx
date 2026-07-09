import type { ButtonHTMLAttributes } from "react";
import { playClick } from "../sound";

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Btn({ onClick, ...rest }: BtnProps) {
	return (
		<button
			{...rest}
			onClick={(e) => {
				playClick();
				onClick?.(e);
			}}
		/>
	);
}
