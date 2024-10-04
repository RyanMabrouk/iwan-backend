FROM softyeducation-base-image AS builder

WORKDIR /app

COPY . .

RUN rm -rf /app/apps/client
RUN rm -rf /app/apps/client-e2e
RUN rm -rf /app/docker
RUN rm -rf /app/scripts

CMD ["npm", "run", "start:dev"]
