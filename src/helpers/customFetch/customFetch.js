

export const customFetch = async function customFetch(url) {
    let result;
    try {
        result = await fetch(url);
    } catch (err) {
        console.log(err);
        return {
            data: 'no data'
        };
    }

    return await result.json();
}