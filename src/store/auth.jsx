import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({

  });
  const storeTokenInLS = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };
  //JWT authetication - to get the currently logged in user

  const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      
      }
      if (!response.ok) {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    // if token is present in local storage, user is logged in

    console.log("Token found:", token);
   
    userAuthentication();
  
  }, [token]);

  let isLoggedIn = !!token;
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, storeTokenInLS, LogoutUser, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};
