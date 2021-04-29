class Provider {
  id!: number;
  description!: string;
  url!: string;
  logo!: string;
  status!: string;

  constructor (
    _id: number,
    _description: string,
    _url: string,
    _logo: string,
    _status: string,
  ) {
    this.id = _id;
    this.description = _description;
    this.url = _url;
    this.logo = _logo;
    this.status = _status;
  };
}

export default Provider;
