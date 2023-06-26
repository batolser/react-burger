export const checkResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(`Ошибка: ${err.status}`))
  }