FROM  node:alpine3.17
WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]