class Price {
  id!: number;
  value!: number;
  provider_id!: number;
  date!: Date;
  status!: string;

  constructor(
    _id: number,
    _value: number,
    _provider_id: number,
    _date: Date,
    _status: string,
  ) {
    this.id = _id;
    this.value = _value;
    this.provider_id = _provider_id;
    this.date = _date;
    this.status = _status;
  }
}

export default Price;
