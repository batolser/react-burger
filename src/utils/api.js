
const api = 'https://norma.nomoreparties.space/api';

export const sendOrder = async (orderData) => {
    const res = await fetch(`${api}/orders`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(orderData)
    });
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
}