export default class SuccessResponse<T> {
  private status: string = 'success';
  private message: string = 'Success';
  constructor(
    private data?: T,
    msg = 'Success',
  ) {
    this.message = msg;
  }
}
