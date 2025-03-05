import React from "react";
import { Mode, RoleCamp } from "../../../interface";
import BackToHome from "./BackToHome";
import PasswordLock from "./PasswordLock";

export default function AllInOneLock({
  children,
  token,
  role,
  bypass,
  lock,
  mode,
  pushToHome,
}: {
  children: React.ReactNode;
  token?: string;
  role?: RoleCamp;
  bypass?: boolean;
  lock?: boolean;
  mode?: Mode;
  pushToHome?: boolean;
}) {
  if (bypass) {
    return children;
  }
  if (lock) {
    if (pushToHome) {
      return <BackToHome />;
    } else {
      return null;
    }
  }
  if (token) {
    if (role) {
      switch (role) {
        case "nong": {
          if (pushToHome) {
            return <BackToHome />;
          } else {
            return null;
          }
        }
        case "pee": {
          if (mode) {
            switch (mode) {
              case "nong":
                return (
                  <PasswordLock token={token} bypass={false}>
                    {children}
                  </PasswordLock>
                );
              case "pee":
                return children;
            }
          } else {
            return children;
          }
          break;
        }
        case "peto": {
          if (mode) {
            switch (mode) {
              case "nong":
                return (
                  <PasswordLock token={token} bypass={false}>
                    {children}
                  </PasswordLock>
                );
              case "pee":
                return children;
            }
          } else {
            return children;
          }
        }
      }
    } else {
      if (mode) {
        switch (mode) {
          case "nong":
            return (
              <PasswordLock token={token} bypass={false}>
                {children}
              </PasswordLock>
            );
          case "pee":
            return children;
        }
      } else
        return (
          <PasswordLock token={token} bypass={false}>
            {children}
          </PasswordLock>
        );
    }
  } else {
    if (role) {
      switch (role) {
        case "nong": {
          if (pushToHome) {
            return <BackToHome />;
          } else {
            return null;
          }
        }
        case "pee": {
          if (mode) {
            switch (mode) {
              case "nong":
                if (pushToHome) {
                  return <BackToHome />;
                } else {
                  return null;
                }
              case "pee":
                return children;
            }
          } else {
            return children;
          }
          break;
        }
        case "peto": {
          if (mode) {
            switch (mode) {
              case "nong":
                if (pushToHome) {
                  return <BackToHome />;
                } else {
                  return null;
                }
              case "pee":
                return children;
            }
          } else {
            return children;
          }
        }
      }
    } else {
      if (mode) {
        switch (mode) {
          case "nong":
            if (pushToHome) {
              return <BackToHome />;
            } else {
              return null;
            }
          case "pee":
            return children;
        }
      } else return children;
    }
  }
}
