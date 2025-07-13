FROM node:20
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install --legacy-peer-deps
RUN npm install @angular/cli
EXPOSE 4200
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]

# op2
# FROM node:18-alpine as build

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .
# RUN npm run build --prod

# FROM nginx:alpine

# COPY --from=build /app/dist/hackaton-ui /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]


#op3
# FROM node:20 as build-stage

# WORKDIR /app
# COPY package*.json ./
# RUN npm install --legacy-peer-deps
# COPY . .
# RUN npm run build -- --configuration production

# FROM nginx:alpine

# COPY --from=build-stage /app/dist/hackaton-ui/browser /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY mime.types /etc/nginx/mime.types

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]