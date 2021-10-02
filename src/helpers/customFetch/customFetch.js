

export const customFetch = async function customFetch(url) {
    let result;
    try {
        result = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
        });
    } catch (err) {
        console.log(err);
        return {
            data: 'no data'
        };
    }

    return await result.json();
}