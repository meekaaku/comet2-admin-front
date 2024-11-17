export async function load() {
	console.log(process.env.VITE_BUILD);
	return {
		build: process.env.VITE_BUILD
	};
}
