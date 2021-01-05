package main

type Korisnik struct {
	KorisnikId     string `json:"korisnik_id"`
	Ime            string `json:"ime"`
	Prezime        string `json:"prezime"`
	Nadimak        string `json:"nadimak"`
	Email          string `json:"email"`
	SlikaUrl       string `json:"slika_url"`
	Kreirano       string `json:"kreirano"`
	Lozinka        string `json:"lozinka"`
	OrganizacijaId string `json:"organizacija_id"`
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

type Projekt struct {
	ProjektId      string `json:"projekt_id"`
	Naziv          string `json:"naziv"`
	Opis           string `json:"opis"`
	OrganizacijaId string `json:"organizacija_id"`
	KreatorId      string `json:"kreator_id"`
}

type Projekti struct {
	Items []Projekt
}

func (p *Projekti) AddItem(item Projekt) {
	p.Items = append(p.Items, item)
}

type Zadatak struct {
	ZadatakId      string `json:"zadatak_id"`
	Instrukcije    string `json:"instrukcije"`
	Kreirano       string `json:"kreirano"`
	Azurirano      string `json:"azurirano"`
	StatusId       string `json:"status_id"`
	ProjektId      string `json:"projekt_id"`
	OrganizacijaId string `json:"organizacija_id"`
	KreatorId      string `json:"kreator_id"`
	PrioritetId    string `json:"prioritet_id"`
}

type Zadaci struct {
	Items []Zadatak
}

func (z *Zadaci) AddItem(item Zadatak) {
	z.Items = append(z.Items, item)
}

type Status struct {
	StatusId string `json:"status_id"`
	Naziv    string `json:"naziv"`
	Opis     string `json:"opis"`
}

type Statusi struct {
	Items []Status
}

func (s *Statusi) AddItem(item Status) {
	s.Items = append(s.Items, item)
}

type Prioritet struct {
	PrioritetId string `json:"prioritet_id"`
	Naziv       string `json:"naziv"`
}

type Prioriteti struct {
	Items []Prioritet
}

func (p *Prioriteti) AddItem(item Prioritet) {
	p.Items = append(p.Items, item)
}

type Privilegija struct {
	PrivilegijaId string `json:"privilegija_id"`
	Naziv         string `json:"naziv"`
	Opis          string `json:"opis"`
}

type Privilegije struct {
	Items []Privilegija
}

func (p *Privilegije) AddItem(item Privilegija) {
	p.Items = append(p.Items, item)
}

type Privitak struct {
	PrivitakId string `json:"privitak_id"`
	Naziv      string `json:"naziv"`
	Putanja    string `json:"putanja"`
	ZadatakId  string `json:"zadatak_id"`
}

type Privitci struct {
	Items []Privitak
}

func (p *Privitci) AddItem(item Privitak) {
	p.Items = append(p.Items, item)
}
