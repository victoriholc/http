import { CidadeService } from './cidade.service';
import { Component, OnInit } from '@angular/core';
import { Cidade } from './cidade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  cidades: Cidade[] = [];
  done = false;

  constructor(private cidadeService: CidadeService){}

  ngOnInit(): void{
    this.getCidades();

    // if (!this.done){
    //   setTimeout(() => {
    //     this.done = true;
    //     console.log(JSON.stringify(this.cidades));
    //   }, 1000);
    // }
  }

  getCidades(): void{
    this.cidadeService.consultar()
      .subscribe({
        next: (cidades) => {
          this.cidades = cidades
        },
        error: (error) => {
          alert(error);
        }
      });

  }

  adicionar(nome: string) {
    // const lastId = this.cidades[this.cidades.length - 1].id;
    // this.cidadeService.adicionar({ id: lastId + 1, nome: nome })
    this.cidadeService.adicionar({ nome: nome } as Cidade)
      .subscribe(cidade => {
        alert(`Cidade "${cidade.nome}" adicionada com o código ${cidade.id}!`);
        this.getCidades();
      });
  }

  excluir(id: number) {
    this.cidadeService.excluir(id)
      .subscribe( () => {
        alert(`Cidade excluída com sucesso!`);
        this.getCidades();
      });
  }

  atualizar(cidade: Cidade) {

    // this.cidadeService.atualizar(cidade)
    // .pipe(catchError((): ObservableInput<any> => {
    //   console.log(cidade);

    //   alert('Error ao atualizar')

    //   return {} as ObservableInput<any>
    // }))
    // .subscribe( cidade => {
    //   alert(`Cidade ${cidade?.nome} atualizada com sucesso!`);
    //   this.getCidades();
    // }).add();

    this.cidadeService.atualizar(cidade)
      .subscribe({
        next: (cidade) => {
          alert(`Cidade ${cidade.nome} atualizada com sucesso!`);
          this.getCidades();
        },
        error: (error) => {
          alert(error);
        }
      });

    // this.cidadeService.atualizar(cidade).pipe()
    //   .subscribe({
    //     cidade: (cidade) => {
    //       alert(`Cidade ${cidade.nome} atualizada com sucesso!`);
    //       this.getCidades();
    //     },
    //     error: (e) => {alert(`Cidade ${cidade.nome} atualizada sem sucesso!`)}
    //   });
  }

}
