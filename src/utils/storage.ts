const storagePrefix = 'budget_react_'

// TODO: implement this feater with a store, maybe zustand ?
export const storage = {
  getToken: () => JSON.parse(window.localStorage.getItem(`${storagePrefix}token`) as string),
  setToken: (token: string) => window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token)),
  clearToken: () => window.localStorage.removeItem(`${storagePrefix}token`),
}
