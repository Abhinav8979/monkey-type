import { ReactNode, useEffect, useState } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("playerName")
  );

  useEffect(() => {
    if (localStorage.getItem("playerName")) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return isAuthenticated ? (
    <div>{children}</div>
  ) : (
    <section className="w-full relative h-full overflow-hidden">
      <div className=" text-textPrimary font-extrabold  absolute top-1/2 left-1/2 whitespace-nowrap -translate-y-1/2 -translate-x-1/2 text-xl  md:text-5xl">
        Please login to use this mode.
      </div>
      <div className="blur-lg">{children}</div>
    </section>
  );
};

export default ProtectedRoute;
