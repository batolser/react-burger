
import { getCookie, setCookie } from "./cookie";
import { checkResponse } from "./check-response";

export const API = 'https://norma.nomoreparties.space/api';



export const fetchWithRefresh = async (url: string, options: any) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === 'jwt expired') {
        // @ts-ignore
      const refreshData = await refreshTokenRequest(getCookie("refreshToken"));
      if (!refreshData.success) {
        Promise.reject(refreshData);
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    }else {
      return Promise.reject(err);
    }
  }
};

export const postOrderInfo = async (ingredientsIds: string[], accessToken: string | null) => {
    const orderData = {
        'ingredients': ingredientsIds
      }
    return fetchWithRefresh(`${API}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "authorization": 'Bearer ' + accessToken,
      },
      body: JSON.stringify(orderData)
    })
}


export const getIngredientsRequest = async () => {
    const res = await fetch(`${API}/ingredients`);
    const json = await res.json();
    return json;
  };
 

export const registerRequest = async (email: string, password: string, name: string) => {
  const res = await fetch(`${API}/auth/register`, {
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
return await checkResponse(res);
};


export const loginRequest = async (email: string, password: string) => {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email,
        password
      })
});
return await checkResponse(res);
};



export const forgotPasswordRequest = async (email: string) => {
  const res = await fetch(`${API}/password-reset`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email
      })
});
return await checkResponse(res);
};

export const resetPasswordRequest = async (password: string, code: string) => {
  return fetchWithRefresh(`${API}/password-reset/reset`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'  
    },
    body: JSON.stringify({
        password: password,
        token: code,
      })
});
};

export const refreshTokenRequest = async (refreshToken: string) => {
  return fetchWithRefresh(`${API}/auth/token`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'  
    },
    body: JSON.stringify({
        token: refreshToken,
      })
});
};


export const logoutRequest = async (refreshToken: string) => {
  return fetchWithRefresh(`${API}/auth/logout`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'  
    },
    body: JSON.stringify({
        token: refreshToken,
      })
});

};


export const getUsersDataRequest = async (accessToken: string) => {
  return fetchWithRefresh(`${API}/auth/user`, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    "authorization": 'Bearer ' + accessToken,
    }
});

};

export const patchUsersDataRequest = async (accessToken: string, name: string, email: string, password: string ) => {
  return fetchWithRefresh(`${API}/auth/user`, {
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
};

export const getOrderInfo = async (order_number: number) => {
  const res = await fetch(`${API}/orders/${order_number}`);
  return await checkResponse(res);
};