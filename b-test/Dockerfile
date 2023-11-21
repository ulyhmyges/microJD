FROM node:alpine as build-ts

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./
RUN npm run build


FROM node:alpine

WORKDIR /app
COPY package.json /app
COPY --from=build-ts /app/dist /app/dist
ENV MONGO_USERNAME=esgi
ENV MONGO_PASSWORD=esgi
ENV MONGO_URI=mongodb://192.168.240.3:27017/database
ENV PORT=3001
RUN npm install --omit=dev

CMD ["npm", "start"]