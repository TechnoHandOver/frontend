export const createAd = (locDep, locArr, dateTimeArr, minPrice, comment, item) =>
    fetch('https://handover.space/api/ad', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            locDep,
            locArr,
            dateTimeArr,
            minPrice,
            comment,
            item,
        }),
    }).then((response) => {
        const {ok, status: statusCode} = response;
        return { ok, statusCode };
    }).catch((err) => {
        console.log(err);
    });
