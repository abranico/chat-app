import Loading from "@/components/Loading";
import { User } from "@/models/user.model";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  auth: User | null;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuth();
  }, []);

  const fetchAuth = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://localhost:7151/api/Auth/me", {
        credentials: "include",
      });
      const data = await response.json();
      setAuth(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //   const login = () => {
  //     setIsAuthenticated(true);
  //   };

  const logout = () => {
    setAuth(null);
  };

  if (loading) return <Loading />;

  return (
    <AuthContext.Provider value={{ auth, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an Provider");
  }
  return context;
};
