export class RepositoryResponse {
  status!: string;
  success!: boolean;
  data!: any;
  message!: string;

  constructor(
    _status: string,
    _success: boolean,
    _data: any,
    _message: string,
  ) {
    this.status = _status;
    this.success = _success;
    this.data = _data;
    this.message = _message;
  }
}
