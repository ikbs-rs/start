## Start React
// "start": "copy .\\src\\configs\\env.dev.local .\\src\\configs\\env.js && set PORT=8351 && react-scripts start",
"start": "set HTTPS=true&&set SSL_CRT_FILE=.\\src\\security\\ssl\\localhost.crt&&set SSL_KEY_FILE=.\\src\\security\\ssl\\localhost.key&&set PORT=8351&&react-app-rewired start --public-url /start/",