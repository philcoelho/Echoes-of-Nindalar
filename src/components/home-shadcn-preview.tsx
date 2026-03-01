import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function HomeShadcnPreview() {
	return (
		<Card className="mx-auto mt-8 w-full max-w-xl border-cyan-500/30 bg-slate-900/70">
			<CardHeader>
				<CardTitle className="text-white">
					Initialize shadcn/ui primitives
				</CardTitle>
				<CardDescription className="text-slate-300">
					Task 3 baseline complete with reusable `Button` and `Card`.
				</CardDescription>
			</CardHeader>
			<CardContent className="text-sm text-slate-300">
				This preview confirms the first shadcn/ui components are wired into the
				home route.
			</CardContent>
			<CardFooter>
				<Button className="bg-cyan-500 text-slate-950 hover:bg-cyan-400">
					Begin Adventure
				</Button>
			</CardFooter>
		</Card>
	);
}
