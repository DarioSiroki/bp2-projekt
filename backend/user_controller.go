package main

import (
	jwt "github.com/dgrijalva/jwt-go"
)

func generateJWT() *jwt.Token {
	token := jwt.New(jwt.SigningMethodHS256)
	return token
}
