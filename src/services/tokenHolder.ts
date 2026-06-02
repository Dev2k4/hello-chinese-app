let _token: string | null = null;
let _onUnauthorized: (() => void) | null = null;

export function getToken(): string | null {
  return _token;
}

export function setToken(t: string | null) {
  _token = t;
}

export function getOnUnauthorized(): (() => void) | null {
  return _onUnauthorized;
}

export function setOnUnauthorized(fn: (() => void) | null) {
  _onUnauthorized = fn;
}
