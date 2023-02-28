
export const api = 'https://norma.nomoreparties.space/api';

export const postOrderInfo = async (ingredientsIds) => {
    const orderData = {
        'ingredients': ingredientsIds
      }
    const res = await fetch(`${api}/orders`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(orderData)
    });
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
}

export const getIngredientsRequest = async () => {
    const res = await fetch(`${api}/ingredients`);
    const json = await res.json();
    return json;
  };
 

