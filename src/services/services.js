
export function getData() {
    return fetch('https://0fqsl7f2zd.execute-api.eu-central-1.amazonaws.com/beta2/pizza2')
    .then((response) => {
        return response.json();
    })
}

export async function postUser(params) {
    return fetch('https://0fqsl7f2zd.execute-api.eu-central-1.amazonaws.com/beta3/users', {
        method: 'POST',
        body: JSON.stringify(params),
    })
    .then((response) => {
        return response.json();
    })
}

export async function postOrder(params) {
    if (params.token) {
        return fetch('https://0fqsl7f2zd.execute-api.eu-central-1.amazonaws.com/beta5/orders', {
            method: 'PUT',
            body: JSON.stringify(params),
        })
        .then((response) => {
            return response.json();
        })
    }
}

export async function getOrders(userToken) {
    let url = 'https://0fqsl7f2zd.execute-api.eu-central-1.amazonaws.com/beta4/orders'
    if (userToken) url =  url + '?token=' + userToken;
    return fetch(url)
    .then((response) => {
        return response.json();
    })
}

export async function getPrice() {
    let url = 'https://api.exchangeratesapi.io/latest'
    return fetch(url)
    .then((response) => {
        return response.json();
    })
}
