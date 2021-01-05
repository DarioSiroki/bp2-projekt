export interface IOrganization {
  kreator_id: string;
  kreirano: string;
  naziv: string;
  organizacija_id: string;
  slika_url: string;
}

export interface IProject {
  projekt_id: string;
  naziv: string;
  opis: string;
  organizacija_id: string;
  kreator_id: string;
}

export interface ITask {
  zadatak_id: string;
  instrukcije: string;
  kreirano: string;
  azurirano: string;
  status_id: string;
  projekt_id: string;
  organizacija_id: string;
  kreator_id: string;
  prioritet_id: string;
}

export interface IStatus {
  status_id: string;
  naziv: string;
  opis: string;
}

export interface IPriority {
  prioritet_id: string;
  naziv: string;
}

export interface IUser {
  korisnik_id: string;
  ime: string;
  prezime: string;
  nadimak: string;
  email: string;
  slika_url: string;
  kreirano: string;
  lozinka: string;
}

export interface IPermission {
  privilegija_id: string;
  naziv: string;
  opis: string;
}

export interface IComment {
  komentar_id: string;
  tekst: string;
  kreiran: string;
  korisnik_id: string;
  zadatak_id: string;
}

export interface IStatus {
  status_id: string;
  naziv: string;
  opis: string;
}

export interface IPrioritet {
  prioritet_id: string;
  naziv: string;
}
