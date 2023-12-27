FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY wait-for.sh /wait-for.sh
RUN chmod +x /wait-for.sh

COPY . .

RUN yarn prisma generate

RUN yarn build

EXPOSE 3001

CMD /wait-for.sh db:5432 -- node dist/main
