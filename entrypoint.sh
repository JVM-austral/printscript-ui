#!/bin/sh
cat <<EOF > /usr/share/nginx/html/env-config.js
window._env_ = {
  VITE_API_URL: "${VITE_API_URL}",
  VITE_FRONTEND_URL: "${VITE_FRONTEND_URL}",
  VITE_WS_URL: "${VITE_WS_URL}",
  VITE_AUTH0_DOMAIN: "${VITE_AUTH0_DOMAIN}",
  VITE_AUTH0_CLIENT_ID: "${VITE_AUTH0_CLIENT_ID}"
};
EOF
exec "$@"