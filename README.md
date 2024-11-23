This is a project accompanying Nginx Crash Course

Commands used in the tutorial

start nginx
nginx

get options
nginx -h

restart nginx
nginx -s reload

stop nginx
nginx -s stop

print logs
tail -f /usr/local/var/log/nginx/access.log

restart nginx
nginx -s reload

create folder for nginx certificates
mkdir ~/nginx-certs
cd ~/nginx-certs

create self-signed certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx-selfsigned.key -out nginx-selfsigned.crt

# nginx config need to be done in machine that need to install nginx and open the below file and make changes

# This is the file to put nginx configuration add the below codes into nginx.conf file

worker_processes 1;

events {
worker_connections 1024;
}

http {
include mime.types;

    upstream nodejs_cluster {
        least_conn;
        server 127.0.0.1:4002;
        server 127.0.0.1:4003;
        server 127.0.0.1:4004;
    }
    server {
        listen 443 ssl;
        server_name localhost;

        ssl_certificate /Users/sathishraja/ngnix-certs/nginx-selfsigned.crt;
        ssl_certificate_key /Users/sathishraja/ngnix-certs/nginx-selfsigned.key;

        location / {
            proxy_pass http://nodejs_cluster;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
    server {
        listen 80;
        server_name localhost;

        location / {
            return 301 https://$host$request_uri;
        }
    }

}
