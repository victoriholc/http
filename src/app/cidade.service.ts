import { Cidade } from './cidade';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  url = 'http://localhost:3000/cidades/';

  constructor(private http: HttpClient) { }

  consultar(): Observable<Cidade[]>{
    return this.http.get<Cidade[]>(this.url)
      .pipe( catchError ( err => {
        return throwError(() => {return [JSON.stringify(err), `"\n"Erro ao listar cidades!`]});
      }));
  }

  adicionar(cidade: Cidade): Observable<Cidade> {
    return this.http.post<Cidade>(this.url, cidade);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(this.url + id);
  }

  atualizar(cidade: Cidade): Observable<Cidade> {
    return this.http.put<Cidade>(this.url + cidade.id, cidade)
      .pipe( catchError ( err => {
        // catchError(this.handleError<Cidade>('atualizar'))
        return throwError(() => {return [JSON.stringify(err), `"\n"Cidade ${cidade.nome} atualizada sem sucesso!`]});

        // catchError(erro =>  {
        //   this.handleError<Cidade>('atualizar')

        //   return {} as ObservableInput<any>
        // })
      }));
  }

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {

  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead

  //     // TODO: better job of transforming error for user consumption
  //     console.log(`${operation} failed: ${error.message}`);

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }

}
