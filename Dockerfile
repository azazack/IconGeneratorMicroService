FROM node:slim
WORKDIR /project
COPY  package.json /project
RUN npm install
RUN npm install -g ts-node
COPY . /project
EXPOSE 4000
CMD ["ts-node", "index.ts"]



