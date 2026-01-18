import React from "react";
import { Mode, Role, RoleCamp } from "../../../interface";
import BackToHome from "./BackToHome";
import PasswordLock from "./PasswordLock";
export type LockLinkType = "lock" | "wait for password" | "pass";
export const lockLinkInit: boolean = false;

export default function AllInOneLock({
  children,
  token,
  role,
  bypass,
  lock,
  mode,
  pushToHome,
  spacialBypass,
  link,
  alternativeChildren,
  inBaan,
  nongBypass,
}: {
  children: React.ReactNode;
  token?: string;
  role?: RoleCamp;
  bypass?: boolean;
  lock?: boolean;
  mode?: Mode;
  pushToHome?: boolean;
  spacialBypass?: {
    role: Role;
    bypass: boolean;
  };
  link?: [LockLinkType, React.Dispatch<React.SetStateAction<LockLinkType>>];
  alternativeChildren?: React.ReactNode;
  inBaan?: boolean;
  nongBypass?: boolean;
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
          if (nongBypass) {
            return (
              <PasswordLock token={token} bypass={false} link={link}>
                {children}
              </PasswordLock>
            );
          }
          if (pushToHome) {
            return <BackToHome />;
          } else {
            return null;
          }
        }
        case "pee": {
          if (nongBypass) {
            return (
              <PasswordLock token={token} bypass={false} link={link}>
                {children}
              </PasswordLock>
            );
          }
          if (mode) {
            switch (mode) {
              case "nong":
                return (
                  <PasswordLock token={token} bypass={false} link={link}>
                    {children}
                  </PasswordLock>
                );
              case "pee":
                return children;
            }
          } else {
            if (spacialBypass) {
              if (!spacialBypass.bypass) {
                return null;
              }
              if (spacialBypass.role == "nong") {
                return (
                  <PasswordLock token={token} bypass={false} link={link}>
                    {children}
                  </PasswordLock>
                );
              } else {
                return children;
              }
            } else {
              return children;
            }
          }
          break;
        }
        case "peto": {
          if (inBaan) {
            if (pushToHome) {
              return <BackToHome />;
            } else {
              return null;
            }
          }
          if (mode) {
            switch (mode) {
              case "nong":
                return (
                  <PasswordLock token={token} bypass={false} link={link}>
                    {children}
                  </PasswordLock>
                );
              case "pee":
                return children;
            }
          } else {
            if (spacialBypass) {
              if (spacialBypass.bypass && spacialBypass.role != "nong") {
                return children;
              } else {
                return (
                  <PasswordLock token={token} bypass={false} link={link}>
                    {children}
                  </PasswordLock>
                );
              }
            } else {
              return children;
            }
          }
        }
      }
    } else {
      if (mode) {
        switch (mode) {
          case "nong":
            return (
              <PasswordLock token={token} bypass={false} link={link}>
                {children}
              </PasswordLock>
            );
          case "pee":
            return children;
        }
      } else
        return (
          <PasswordLock token={token} bypass={false} link={link}>
            {children}
          </PasswordLock>
        );
    }
  } else {
    if (role) {
      switch (role) {
        case "nong": {
          if (nongBypass) {
            return children;
          }
          if (
            mode == "pee" &&
            spacialBypass &&
            spacialBypass.bypass &&
            spacialBypass.role != "nong"
          ) {
            return children;
          }
          if (pushToHome) {
            return <BackToHome />;
          } else {
            return null;
          }
        }
        case "pee": {
          if (nongBypass) {
            return children;
          }
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
          if (inBaan) {
            if (pushToHome) {
              return <BackToHome />;
            } else {
              return null;
            }
          }
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
      } else {
        if (link) {
          switch (link[0]) {
            case "lock":
              return null;
            case "wait for password":
              return alternativeChildren;
            case "pass":
              return children;
          }
        } else {
          return children;
        }
      }
    }
  }
}
export function checkValid({
  role,
  bypass,
  lock,
  mode,
  spacialBypass,
}: {
  role?: RoleCamp;
  bypass?: boolean;
  lock?: boolean;
  mode?: Mode;
  spacialBypass?: {
    role: Role;
    bypass: boolean;
  };
}) {
  if (bypass) {
    return true;
  }
  if (lock) {
    return false;
  }
  if (role) {
    switch (role) {
      case "nong": {
        return (
          mode == "pee" &&
          !!spacialBypass &&
          spacialBypass.bypass &&
          spacialBypass.role != "nong"
        );
      }
      case "pee": {
        if (mode) {
          switch (mode) {
            case "nong":
              return false;
            case "pee":
              return true;
          }
        } else {
          if (spacialBypass) {
            return spacialBypass.bypass && spacialBypass.role != "nong";
          } else {
            return true;
          }
        }
        break;
      }
      case "peto": {
        if (mode) {
          switch (mode) {
            case "nong":
              return false;
            case "pee":
              return true;
          }
        } else {
          return true;
        }
      }
    }
  } else {
    if (mode) {
      switch (mode) {
        case "nong":
          return false;
        case "pee":
          return true;
      }
    } else {
      return true;
    }
  }
}

export function getDefaultLockInit({
  token,
  role,
  bypass,
  lock,
  mode,
  spacialBypass,
  inBaan,
  nongBypass,
}: {
  token?: string;
  role?: RoleCamp;
  bypass?: boolean;
  lock?: boolean;
  mode?: Mode;
  spacialBypass?: {
    role: Role;
    bypass: boolean;
  };
  inBaan?: boolean;
  nongBypass?: boolean;
}): LockLinkType {
  if (bypass) {
    return "pass";
  }
  if (lock) {
    return "lock";
  }
  if (token) {
    if (role) {
      switch (role) {
        case "nong": {
          if (nongBypass) {
            return "wait for password";
          }
          return "lock";
        }
        case "pee": {
          if (nongBypass) {
            return "wait for password";
          }
          if (mode) {
            switch (mode) {
              case "nong":
                return "wait for password";
              case "pee":
                return "pass";
            }
          } else {
            if (spacialBypass) {
              if (!spacialBypass.bypass) {
                return "lock";
              }
              if (spacialBypass.role == "nong") {
                return "wait for password";
              } else {
                return "pass";
              }
            } else {
              return "pass";
            }
          }
          break;
        }
        case "peto": {
          if (inBaan) {
            return "lock";
          }
          if (mode) {
            switch (mode) {
              case "nong":
                return "wait for password";
              case "pee":
                return "pass";
            }
          } else {
            if (spacialBypass) {
              if (spacialBypass.bypass && spacialBypass.role != "nong") {
                return "pass";
              } else {
                return "wait for password";
              }
            } else {
              return "pass";
            }
          }
        }
      }
    } else {
      if (mode) {
        switch (mode) {
          case "nong":
            return "wait for password";
          case "pee":
            return "pass";
        }
      } else return "wait for password";
    }
  } else {
    if (role) {
      switch (role) {
        case "nong": {
          if (nongBypass) {
            return "pass";
          }
          if (
            mode == "pee" &&
            spacialBypass &&
            spacialBypass.bypass &&
            spacialBypass.role != "nong"
          ) {
            return "pass";
          }
          return "lock";
        }
        case "pee": {
          if (nongBypass) {
            return "pass";
          }
          if (mode) {
            switch (mode) {
              case "nong":
                return "lock";
              case "pee":
                return "pass";
            }
          } else {
            return "pass";
          }
          break;
        }
        case "peto": {
          if (inBaan) {
            return "lock";
          }
          if (mode) {
            switch (mode) {
              case "nong":
                return "lock";
              case "pee":
                return "pass";
            }
          } else {
            return "pass";
          }
        }
      }
    } else {
      if (mode) {
        switch (mode) {
          case "nong":
            return "lock";
          case "pee":
            return "pass";
        }
      } else {
        return "pass";
      }
    }
  }
}
