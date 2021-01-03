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

type Korisnici struct {
	Items []Korisnik
}

func (k *Korisnici) AddItem(item Korisnik) {
	k.Items = append(k.Items, item)
}

type Organizacija struct {
	OrganizacijaId string `json:"organizacija_id"`
	Naziv          string `json:"naziv"`
	SlikaUrl       string `json:"slika_url"`
	Kreirano       string `json:"kreirano"`
	KreatorId      string `json:"kreator_id"`
}

type Organizacije struct {
	Items []Organizacija
}

func (o *Organizacije) AddItem(item Organizacija) {
	o.Items = append(o.Items, item)
}
