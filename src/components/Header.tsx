import { Link } from "@tanstack/react-router";
import { Home, Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const openMenuButtonRef = useRef<HTMLButtonElement>(null);
	const closeMenuButtonRef = useRef<HTMLButtonElement>(null);
	const drawerRef = useRef<HTMLElement>(null);

	const closeMenu = useCallback(() => {
		setIsOpen(false);
		requestAnimationFrame(() => {
			openMenuButtonRef.current?.focus();
		});
	}, []);

	useEffect(() => {
		if (!isOpen) return;

		closeMenuButtonRef.current?.focus();

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				event.preventDefault();
				closeMenu();
				return;
			}

			if (event.key === "Tab") {
				const drawerElement = drawerRef.current;
				if (!drawerElement) return;

				const focusableElements = drawerElement.querySelectorAll<HTMLElement>(
					'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
				);

				if (focusableElements.length === 0) return;

				const firstElement = focusableElements[0];
				const lastElement = focusableElements[focusableElements.length - 1];
				const activeElementIsInDrawer = drawerElement.contains(
					document.activeElement,
				);

				if (!activeElementIsInDrawer) {
					event.preventDefault();
					(event.shiftKey ? lastElement : firstElement).focus();
					return;
				}

				if (event.shiftKey && document.activeElement === firstElement) {
					event.preventDefault();
					lastElement.focus();
				} else if (!event.shiftKey && document.activeElement === lastElement) {
					event.preventDefault();
					firstElement.focus();
				}
			}
		};

		window.addEventListener("keydown", onKeyDown);
		return () => {
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [isOpen, closeMenu]);

	return (
		<>
			<header className="p-4 flex items-center bg-gray-800 text-white shadow-lg">
				<button
					ref={openMenuButtonRef}
					type="button"
					onClick={() => setIsOpen(true)}
					className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
					aria-label="Open menu"
					aria-expanded={isOpen}
					aria-controls="primary-navigation-drawer"
				>
					<Menu size={24} />
				</button>
				<h1 className="ml-4 text-xl font-semibold">
					<Link to="/">
						<img
							src="/tanstack-word-logo-white.svg"
							alt="TanStack Logo"
							className="h-10"
						/>
					</Link>
				</h1>
			</header>

			{isOpen && (
				<aside
					id="primary-navigation-drawer"
					ref={drawerRef}
					aria-label="Primary navigation"
					className="fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col translate-x-0"
				>
					<div className="flex items-center justify-between p-4 border-b border-gray-700">
						<h2 className="text-xl font-bold">Navigation</h2>
						<button
							ref={closeMenuButtonRef}
							type="button"
							onClick={closeMenu}
							className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
							aria-label="Close menu"
						>
							<X size={24} />
						</button>
					</div>

					<nav className="flex-1 p-4 overflow-y-auto">
						<Link
							to="/"
							onClick={closeMenu}
							className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
							activeProps={{
								className:
									"flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
							}}
						>
							<Home size={20} />
							<span className="font-medium">Home</span>
						</Link>

						{/* Demo Links Start */}

						{/* Demo Links End */}
					</nav>
				</aside>
			)}
		</>
	);
}
