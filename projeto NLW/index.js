let participantes = [
  {
    nome: "Detetive",
    email: "detetive@gmail.com",
    datainscricao: new Date(2024, 2, 23, 19, 20),
    datacheckin: new Date(2024, 2, 25, 22, 20) 
  },
    {
    nome: "Detetive Sherlock",
    email: "detetivesherlock@gmail.com",
    datainscricao: new Date(2024, 2, 22, 19, 20),
    datacheckin: null
  },
    {
    nome: "Detetive Dacunha",
    email: "detetivedacunha@gmail.com",
    datainscricao: new Date(2024, 2, 22, 19, 20),
    datacheckin: null 
  },
    {
    nome: "Detetive Jumpas",
    email: "detetivejumpas@gmail.com",
    datainscricao: new Date(2024, 2, 22, 19, 20),
    datacheckin: new Date(2024, 2, 25, 22, 00) 
  },
    {
    nome: "Detetive Tonles",
    email: "detetive@gmail.com",
    datainscricao: new Date(2024, 2, 22, 19, 20),
    datacheckin: new Date(2024, 2, 25, 22, 00) 
  },
    {
    nome: "Detetive Cacaio",
    email: "detetiveCacaio@gmail.com",
    datainscricao: new Date(2024, 2, 22, 19, 20),
    datacheckin: new Date(2024, 2, 25, 22, 00) 
  },
    {
    nome: "Detetive Cerch",
    email: "detetivecerch@gmail.com",
    datainscricao: new Date(2024, 2, 22, 19, 20),
    datacheckin: new Date(2024, 2, 25, 22, 00) 
  },
    {
    nome: "Detetive Vic",
    email: "detetivevic@gmail.com",
    datainscricao: new Date(2024, 2, 22, 19, 20),
    datacheckin: new Date(2024, 2, 25, 22, 00) 
  },
    {
    nome: "Detetive Mut",
    email: "detetivemut@gmail.com",
    datainscricao: new Date(2024, 2, 22, 19, 20),
    datacheckin: null
  },
    {
    nome: "Detetive Alan",
    email: "detetivealan@gmail.com",
    datainscricao: new Date(2024, 2, 22, 19, 20),
    datacheckin: null
  },
]

const criarNovoParticipante = (participante) => {
  const datainscricao = dayjs(Date.now())
  .to(participante.datainscricao)

  let datacheckin = dayjs(Date.now())
  .to(participante.datacheckin)

  //condicional 
  if(participante.datacheckin == null) {
    datacheckin = `
      <button
        data-email="${participante.email}"
        onclick="fazerChekin(event)"
      >
        Confirmar check-in
      </button>
    `
  }
  
  return `
  <tr>
    <td>
      <strong>
       ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${datainscricao}</td>
    <td>${datacheckin}</td>
  </tr>
  `
}

const AtualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes) {
   output = output + criarNovoParticipante(participante) 
  }
  
  document
  .querySelector('tbody')
  .innerHTML = output
}

AtualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    datainscricao: new Date(),
    datechekin: null
  }

  // verificar se o partipante ja existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Participante ja cadastrado!')
  }

  participantes = [participante, ...participantes]
  AtualizarLista(participantes)

  //limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerChekin = (event) => {
   //confirmar se realmente quer o check-in 
   const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
   if(confirm(mensagemConfirmacao) == false) {
    return
   }
   
  // encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  ) 
  // atualizar o check-in do participante
  participante.datacheckin = new Date()

  // atualizar a lista de participantes
  AtualizarLista(participantes)
}