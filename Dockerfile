FROM golang:1.14

WORKDIR /usr/app

COPY . .

RUN go mod download

RUN go get github.com/cosmtrek/air

CMD ["air"]