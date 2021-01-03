package main

type Korisnik struct {
	KorisnikId string `json:"korisnik_id"`
	Ime        string `json:"ime"`
	Prezime    string `json:"prezime"`
	Nadimak    string `json:"nadimak"`
	Email      string `json:"email"`
	SlikaUrl   string `json:"slika_url"`
	Kreirano   string `json:"kreirano"`
	Lozinka    string `json:"lozinka"`
}
