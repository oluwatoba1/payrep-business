import { useState, useEffect } from "react";

/**
 * Custom hook to debounce a value.
 *
 * @param value The value you want to debounce.
 * @param delay The delay in milliseconds (default: 500ms).
 * @returns The debounced value.
 */
function useDebounce<T>(value: T, delay: number = 500): T {
	// 1. State to store the debounced value
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		// 2. Set a timeout to update the debounced value after the delay
		const timer = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		// 3. Cleanup: Clear the timeout if the value or delay changes
		// This prevents the state from updating if the user keeps typing
		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]); // Only re-run if value or delay changes

	return debouncedValue;
}

export default useDebounce;
