
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
 

export const registerRequest = async (email, password, name) => {
  const res = await fetch(`${api}/auth/register`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email,
        password,
        name
      })
});
return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};


export const loginRequest = async (email, password) => {
  const res = await fetch(`${api}/auth/login`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email,
        password
      })
});
return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};



export const forgotPasswordRequest = async (email) => {
  const res = await fetch(`${api}/password-reset`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email
      })
});
return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};

export const resetPasswordRequest = async (password, code) => {
  const res = await fetch(`${api}/password-reset/reset`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'  
    },
    body: JSON.stringify({
        password: password,
        token: code,
      })
});
return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};

export const refreshTokenRequest = async (refreshToken) => {
  const res = await fetch(`${api}/auth/token`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'  
    },
    body: JSON.stringify({
        token: refreshToken,
      })
});
return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};


export const logoutRequest = async (refreshToken) => {
  const res = await fetch(`${api}/auth/logout`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'  
    },
    body: JSON.stringify({
        token: refreshToken,
      })
});
return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};


export const getUsersDataRequest = async (accessToken) => {
  const res = await fetch(`${api}/auth/user`, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    "authorization": 'Bearer ' + accessToken,
    }
});
return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};

export const patchUsersDataRequest = async (accessToken, name, email, password ) => {
  const res = await fetch(`${api}/auth/user`, {
    method: 'PATCH',
    headers: {
    'Content-Type': 'application/json',
    "authorization": 'Bearer ' + accessToken,
    },
    body: JSON.stringify({
      name, 
      email, 
      password
    })
});
return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};