/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = <F extends (...params: any[]) => void>(callback: F, wait: number): F => {
	let timeout: number = null;
	const debounced = (...args: any[]) => {
		clearTimeout(timeout);
		timeout = window.setTimeout(() => callback(...args), wait);
	}
	return debounced as F;
}