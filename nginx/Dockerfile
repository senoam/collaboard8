FROM nginx:latest
COPY default.conf /etc/nginx/conf.d/default.conf
COPY /static/ /var/www/app/static/

# COPY --from=react-build ../client/build/ /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]