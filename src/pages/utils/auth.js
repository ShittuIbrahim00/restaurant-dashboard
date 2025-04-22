export const setAuthData = (user, token) => {
    localStorage.setItem("restaurant-user", JSON.stringify({ user, token }));
  };
  
  export const getAuthData = (role) => {
    const data = localStorage.getItem(`restaurant-${role}`);
    return data ? JSON.parse(data) : null;
  };
  
  export const getAuthToken = (role) => {
    const auth = getAuthData(role);
    return auth?.token || null;
  };
  
  export const logoutRole = (role) => {
    localStorage.removeItem(`restaurant-${role}`);
  };
  