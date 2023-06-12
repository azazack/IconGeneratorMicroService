FROM node:slim
WORKDIR /project
COPY  package.json /project
RUN npm install
COPY . /project
RUN npx tsc index.ts
EXPOSE 4000
CMD node index.js



