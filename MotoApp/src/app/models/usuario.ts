export class Usuario {
  private idUsuario: number;
  private loginUsuario: string;
  private senhaUsuario: string;
  private isPilotoUsuario: boolean;

  public getIdUsuario() {
    return this.idUsuario;
  }
  public setIdUsuario(idUsuario: number) {
    this.idUsuario = idUsuario;
  }
  public getLoginUsuario() {
    return this.loginUsuario;
  }
  public setLoginUsuario(loginUsuario: string) {
    this.loginUsuario = loginUsuario;
  }
  public getSenhaUsuario() {
    return this.senhaUsuario;
  }
  public setSenhaUsuario(senhaUsuario: string) {
    this.senhaUsuario = senhaUsuario;
  }
  public getIsPilotoUsuario() {
    return this.isPilotoUsuario;
  }
  public setIsPilotoUsuario(isPilotoUsuario: boolean) {
    this.isPilotoUsuario = isPilotoUsuario;
  }
}
