#!/bin/sh

# Inject environment variables into env.js
cat <<EOF > /usr/share/nginx/html/assets/env.js
window['env'] = {
  API_URL: "${API_URL}",
  DEMO: "${DEMO}"
};
EOF

# Start Nginx
exec nginx -g 'daemon off;'
