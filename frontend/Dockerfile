FROM node:18.12.1

WORKDIR /front

RUN echo $(ls)

COPY . .

RUN echo $(ls -l)

RUN npm install
RUN npm install @mui/x-data-grid
RUN npm install @mui/material @emotion/react @emotion/styled
RUN npm install


RUN echo $(ls -l)

EXPOSE 5173