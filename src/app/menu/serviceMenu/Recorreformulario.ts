import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class recorrerformulario {
/*
 for (var i = 0, element; element = datos[i++];) {
      if (element.type === "text"){
        let valores1:any[]=[]
        valores1[i]=element.attributes
       console.log(valores1[i])

      }

  }
for (var i = 0, element; element = datos[i++];) {
      if (element.type === "text"){
   let valores:any[]=[element.name,element.id,element.value]
   let valores2:any[]=[]
   let valores3:any[]=[]
   valores[i]=element.value
   valores2[i]=element.id
   valores3[i]=element.name

console.log(valores[i])
console.log(valores2[i])
console.log(valores3[i])

      }


       for (let j =0; j < valores1.length; j++) {
    let datos:any[]=[{
      name:valores1[i].name.value,
    },
    {
      type:valores1[i].type.value,
    },
    {
      id:valores1[i].id.value,
    },
    {
      tag:valores1[i].tag.value,
    },

    ]



     console.log(datos[j])
       }


  }*/
dato:any={}
  armarinsert (datos:any):any {
    for (var i = 0, element; element = datos[i++];) {
      if (element.type === "text"){

        let atributos:any[]=[]
        atributos=[{
          name:element.attributes.name.value
         },
         {
          type:element.attributes.type.value
         },
         {
          id:element.attributes.id.value
         },
         {
          tag:element.attributes.tag.value
        },
        {
          value:element.value
        }
      ]


      //console.log(valores1[i])
      console.log(atributos[3])


      }

  }
  return
  }


  constructor() {
   }
}
