async function postData(url = '', data = {}, method='POST') {
    const response = await fetch(url, {
        method: method,
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}
