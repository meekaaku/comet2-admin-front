

export async function load()
{
    console.log (process.env.BUILD);
	return {
        build: process.env.BUILD
	};
}