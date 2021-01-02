package controllers

import (
	jwt "github.com/dgrijalva/jwt-go"
	"fmt"
)

func generateJWT() (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
}