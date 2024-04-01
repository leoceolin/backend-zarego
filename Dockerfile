# syntax=docker/dockerfile:1

FROM node:20-alpine
# ENV NODE_ENV=production
WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
RUN npm install -g typescript

COPY . .
# RUN npm run prisma:migrate
# RUN npm run prisma:migrate:prd
RUN npx prisma generate
RUN npm run build
EXPOSE 3333
CMD ["node", "./dist/server.js"]
