export async function getlocation() {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/location`, { cache: 'no-store' });

        if (!res.ok) {
            throw new Error('Failed to fetch data'); // Throw an error for non-2xx responses
        }

        return await res.json(); // Return parsed JSON data if the response is successful
    } catch (error) {
        console.error('Error fetching location:', error); // Log any errors
        throw error; // Re-throw the error for higher-level handling
    }
}
