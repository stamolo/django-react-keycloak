FROM node:18.12.1

WORKDIR /front

RUN echo $(ls)

COPY . .

RUN echo $(ls -l)

RUN npm install
RUN npm install @emotion/react@^11.13.3 @emotion/styled@^11.13.0



RUN echo $(ls -l)

EXPOSE 5173