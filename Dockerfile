# Stage 1: Build the React app
FROM node:20 AS build
WORKDIR /app
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY . ./
RUN npm run build

# Stage 2: Serve the React app using nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
