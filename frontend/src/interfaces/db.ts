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
